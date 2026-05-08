# Library Management System

A sophisticated full-stack library management application that revolutionizes traditional book borrowing paradigms through a seamless Django REST backend and an intuitive React + Vite frontend.

## Revolutionizing Library Operations

This avant-garde system transcends the antiquated manual book borrowing process, where patrons endured interminable queues, labyrinthine paperwork, and cumbersome form-filling rituals. Instead, it orchestrates an elegant digital symphony where erudite seekers can procure literary treasures with a mere click, instantaneously assigning books without bureaucratic impediments. Timely returns are facilitated with unparalleled precision, while comprehensive historical chronicles of borrowed and restituted volumes empower users with insightful analytics. The administrative bastion, a veritable citadel of oversight, meticulously archives student dossiers and bibliographic inventories, quantifying borrowing proclivities and enabling the seamless augmentation of collections. Administrators wield omnipotent capabilities to issue tomes to scholars, all within an interface of sublime ergonomics and operational efficacy.

## Project structure

- `library/backend/` - Django backend project
  - `manage.py` - Django management script
  - `backend/` - Django settings and URL configuration
  - `libraryapp/` - library application models, serializers, views, URLs, and migrations
  - `db.sqlite3` - SQLite database file used for development

- `library/frontend/` - React frontend application
  - `src/` - React source files, pages, components, and routing
  - `package.json` - frontend dependencies and scripts
  - `vite.config.js` - Vite build configuration

## Tech stack

- Backend: Django 6.x, Django REST framework, SQLite
- Frontend: React 19, Vite, React Router DOM, Axios, React Toastify, Recharts

## Prerequisites

- Node.js 18+ with npm
- Python 3.11+ (or compatible Python version for Django 6)

## Backend setup

1. Open a terminal in `library/backend`
2. Create and activate a Python virtual environment:

```powershell
python -m venv venv
venv\Scripts\Activate
```

3. Install backend dependencies:

```powershell
pip install django djangorestframework
```

4. Apply migrations:

```powershell
python manage.py migrate
```

5. Start the backend server:

```powershell
python manage.py runserver
```

6. The backend will be available at `http://127.0.0.1:8000/`.

## Frontend setup

1. Open a terminal in `library/frontend`
2. Install npm packages:

```powershell
npm install
```

3. Start the frontend development server:

```powershell
npm run dev
```

4. The frontend will be available at `http://localhost:5173/` by default.

## How it works

- The React app uses client-side routing in `library/frontend/src/App.jsx`.
- The backend exposes API endpoints under `http://127.0.0.1:8000/api/`.
- Frontend pages send requests to the Django API using Axios.

## Important notes

- The React app currently expects the backend API to run at `http://127.0.0.1:8000`.
- The SQLite file `library/backend/db.sqlite3` stores development data; keep it if you want to preserve test data.
- If the app opens to a blank page, the route for `/` must render a valid landing component in `frontend/src/App.jsx`.

## Common commands

Backend:

```powershell
cd library/backend
venv\Scripts\Activate
python manage.py runserver
```

Frontend:

```powershell
cd library/frontend
npm run dev
```

Build frontend for production:

```powershell
cd library/frontend
npm run build
```

## What you can do in the app

- Admin login and dashboard
- Category, author, and book management
- Student signup, login, and profile management
- Book issue and issued-book details
- Student history and issued books

## Additional improvements

- Add a root landing page component at `/`
- Create a `requirements.txt` for backend dependencies
- Configure a frontend environment variable for the API base URL

## Project structure

- `library/backend/` - Django backend project
  - `manage.py` - Django management script
  - `backend/` - Django settings and URL configuration
  - `libraryapp/` - library application models, serializers, views, URLs, and migrations
  - `db.sqlite3` - SQLite database file used for development

- `library/frontend/` - React frontend application
  - `src/` - React source files, pages, components, and routing
  - `package.json` - frontend dependencies and scripts
  - `vite.config.js` - Vite build configuration

## Tech stack

- Backend: Django 6.x, Django REST framework, SQLite
- Frontend: React 19, Vite, React Router DOM, Axios, React Toastify, Recharts

## Prerequisites

- Node.js 18+ with npm
- Python 3.11+ (or compatible Python version for Django 6)

## Backend setup

1. Open a terminal in `library/backend`
2. Create and activate a Python virtual environment:

```powershell
python -m venv venv
venv\Scripts\Activate
```

3. Install backend dependencies:

```powershell
pip install django djangorestframework
```

4. Apply migrations:

```powershell
python manage.py migrate
```

5. Start the backend server:

```powershell
python manage.py runserver
```

6. The backend will be available at `http://127.0.0.1:8000/`.

## Frontend setup

1. Open a terminal in `library/frontend`
2. Install npm packages:

```powershell
npm install
```

3. Start the frontend development server:

```powershell
npm run dev
```

4. The frontend will be available at `http://localhost:5173/` by default.

## How it works

- The React app uses client-side routing in `library/frontend/src/App.jsx`.
- The backend exposes API endpoints under `http://127.0.0.1:8000/api/`.
- Frontend pages send requests to the Django API using Axios.

## Important notes

- The React app currently expects the backend API to run at `http://127.0.0.1:8000`.
- The SQLite file `library/backend/db.sqlite3` stores development data; keep it if you want to preserve test data.
- If the app opens to a blank page, the route for `/` must render a valid landing component in `frontend/src/App.jsx`.

## Common commands

Backend:

```powershell
cd library/backend
venv\Scripts\Activate
python manage.py runserver
```

Frontend:

```powershell
cd library/frontend
npm run dev
```

Build frontend for production:

```powershell
cd library/frontend
npm run build
```

## What you can do in the app

- Admin login and dashboard
- Category, author, and book management
- Student signup, login, and profile management
- Book issue and issued-book details
- Student history and issued books

## Additional improvements

- Add a root landing page component at `/`
- Create a `requirements.txt` for backend dependencies
- Configure a frontend environment variable for the API base URL
