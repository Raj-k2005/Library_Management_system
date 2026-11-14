import getpass
import json
import os
import urllib.request

url='http://127.0.0.1:8000/api/admin/login/'
username = os.environ.get('ADMIN_USERNAME') or input('Admin username: ')
password = os.environ.get('ADMIN_PASSWORD') or getpass.getpass('Admin password: ')
cred={'username': username, 'password': password}
data=json.dumps(cred).encode('utf-8')
req=urllib.request.Request(url,data,headers={'Content-Type':'application/json'})
try:
    with urllib.request.urlopen(req, timeout=5) as r:
        print('status', r.getcode())
        print(r.read().decode())
except Exception as e:
    print('error', repr(e))
