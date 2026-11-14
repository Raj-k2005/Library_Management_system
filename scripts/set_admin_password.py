import os, sys
from pathlib import Path
import getpass
project_backend_dir = Path(__file__).resolve().parent.parent / 'library' / 'backend'
if str(project_backend_dir) not in sys.path:
    sys.path.insert(0, str(project_backend_dir))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()
from django.contrib.auth.models import User

username = input('Username: ')
new_password = getpass.getpass('New password: ')
try:
    u = User.objects.get(username=username)
    u.set_password(new_password)
    u.save()
    print('OK', username)
except User.DoesNotExist:
    print('NO_USER', username)
