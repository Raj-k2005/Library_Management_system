import json

from django.contrib.auth.models import User
from django.test import TestCase, override_settings


class AdminRecoveryTests(TestCase):
    recovery_url = "/api/admin/recover/"
    recovery_token = "test-recovery-token-that-is-at-least-32-chars"
    new_password = "Giraffe-Quartz-483!Safe"

    def post_recovery(self, username, password, token=None):
        headers = {}
        if token is not None:
            headers["HTTP_AUTHORIZATION"] = f"Bearer {token}"
        return self.client.post(
            self.recovery_url,
            data=json.dumps({"username": username, "password": password}),
            content_type="application/json",
            **headers,
        )

    @override_settings(ADMIN_RECOVERY_TOKEN="")
    def test_recovery_is_disabled_without_configured_token(self):
        response = self.post_recovery("new_admin", self.new_password)

        self.assertEqual(response.status_code, 404)
        self.assertFalse(User.objects.exists())

    @override_settings(ADMIN_RECOVERY_TOKEN=recovery_token)
    def test_invalid_token_is_rejected(self):
        response = self.post_recovery(
            "new_admin",
            self.new_password,
            token="wrong-recovery-token-that-is-at-least-32-chars",
        )

        self.assertEqual(response.status_code, 403)
        self.assertFalse(User.objects.exists())

    @override_settings(ADMIN_RECOVERY_TOKEN=recovery_token)
    def test_recovery_creates_admin_and_allows_login(self):
        response = self.post_recovery(
            "new_admin",
            self.new_password,
            token=self.recovery_token,
        )

        self.assertEqual(response.status_code, 200)
        user = User.objects.get(username="new_admin")
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)
        self.assertTrue(user.check_password(self.new_password))

        login_response = self.client.post(
            "/api/admin/login/",
            data=json.dumps(
                {"username": "new_admin", "password": self.new_password}
            ),
            content_type="application/json",
        )
        self.assertEqual(login_response.status_code, 200)

    @override_settings(ADMIN_RECOVERY_TOKEN=recovery_token)
    def test_existing_staff_account_password_can_be_reset(self):
        user = User.objects.create_user(
            username="existing_admin",
            password="Previous-Password-384!Safe",
            is_staff=True,
        )

        response = self.post_recovery(
            "existing_admin",
            self.new_password,
            token=self.recovery_token,
        )

        self.assertEqual(response.status_code, 200)
        user.refresh_from_db()
        self.assertTrue(user.check_password(self.new_password))

    @override_settings(ADMIN_RECOVERY_TOKEN=recovery_token)
    def test_recovery_does_not_promote_a_non_staff_user(self):
        User.objects.create_user(username="regular_user", password="User-Password-912!Safe")

        response = self.post_recovery(
            "regular_user",
            self.new_password,
            token=self.recovery_token,
        )

        self.assertEqual(response.status_code, 409)
        self.assertFalse(User.objects.get(username="regular_user").is_staff)
