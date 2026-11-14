import sqlite3
from pathlib import Path

db_path = Path(__file__).resolve().parent.parent / 'library' / 'backend' / 'db.sqlite3'
print('DB path:', db_path)
conn = sqlite3.connect(str(db_path))
cur = conn.cursor()
try:
    cur.execute("SELECT id, username, is_superuser, is_staff FROM auth_user")
    rows = cur.fetchall()
    if not rows:
        print('No users found')
    else:
        for row in rows:
            print('id=%s username=%s is_superuser=%s is_staff=%s' % row)
except Exception as e:
    print('Error querying auth_user:', e)
finally:
    conn.close()
