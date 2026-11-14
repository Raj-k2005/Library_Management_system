import os, sys
from pathlib import Path
import secrets
import string

# Ensure project path is importable
script_path = Path(__file__).resolve()
project_backend_dir = script_path.parent.parent / 'library' / 'backend'
if str(project_backend_dir) not in sys.path:
    sys.path.insert(0, str(project_backend_dir))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()

from django.contrib.auth.models import User
import json, urllib.request, time

# Choose username/password
username = 'dev_admin_001'
alphabet = string.ascii_letters + string.digits + '!@#$%^&*()'
password = ''.join(secrets.choice(alphabet) for _ in range(20))

user, created = User.objects.get_or_create(username=username)
user.is_staff = True
user.is_superuser = True
user.set_password(password)
user.save()

print('CREATED_ADMIN:', created)
print('USERNAME:', username)
print('PASSWORD:', password)

# Verify login via API
time.sleep(0.5)
url = 'http://127.0.0.1:8000/api/admin/login/'
cred = {'username': username, 'password': password}
req = urllib.request.Request(url, data=json.dumps(cred).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req, timeout=5) as r:
        print('API_STATUS', r.getcode())
        print('API_RESPONSE:', r.read().decode())
except Exception as e:
    print('API_ERROR:', repr(e))
