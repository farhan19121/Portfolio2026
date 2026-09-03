# Farhan Khan — Data Analytics Portfolio

A modern, high-performance personal portfolio website and content management platform showcasing Farhan Khan's data analytics case studies, technical skills, business thinking, and verified professional experience.

Built with **React + Vite + Tailwind CSS** on the frontend and **Python Django 5 + Django REST Framework** on the backend.

---

## 🌟 Key Features

### 1. Frontend Experience (React + Vite + Modern UI)
- **Executive Hero Landing**: Communicates core value proposition (*"Turning complex data into actionable business decisions"*) with 4 high-impact verified metrics.
- **Smooth-Scroll Navigation Bar**: Fixed top header with active section tracking, smooth animated scroll triggers to sections (`#hero`, `#about`, `#experience`, `#skills`, `#projects`, `#contact`), and quick access to Resume and Admin Portal.
- **About Me Section**: Engineering background from Madhav Institute of Technology & Science (MITS), Gwalior, career transition story, and the 4-Pillar Analytical Lifecycle framework.
- **Verified Professional Experience**: Timeline layout detailing roles at **Ostwal Group of Industries** (validated 8,000+ records) and **ISTE MITS Gwalior** (managed 450+ member database, +28% web session duration).
- **Categorized Skills**: Grouped technical and analytical competencies (SQL & Databases, Python & Analysis, Business Intelligence & Dashboards, Business & Commercial Analytics).
- **Featured Case Studies**: Filterable project grid with category tabs and rich interactive case study drawer/modal rendering dynamic repeatable content blocks.
- **Contact & Channels**: Functional contact form integrated with the Django backend, plus direct channels (LinkedIn, GitHub, Email, PDF Resume).
- **Interactive Resume Modal**: Built-in verified profile and print/download view.

### 2. Django Backend & Admin Dynamic Project Builder
- **Django REST Framework API**:
  - `GET /api/projects/` & `GET /api/projects/<id>/` (Public listing and detail with nested dynamic content blocks).
  - `POST /api/auth/login/` & `GET /api/auth/me/` (Token authentication for admin).
  - `POST /api/projects/`, `PUT /api/projects/<id>/`, `DELETE /api/projects/<id>/` (Admin CRUD).
  - `POST /api/upload/` (Media and chart image file upload).
  - `POST /api/contact/` (Message submission and logging).
- **Dynamic Repeatable Content Block Builder**:
  - Step 1: Project Title, Subtitle, Category, Description / Business Problem, Key Insight, Tools Used, Cover Image.
  - Step 2: Repeatable Content Block Builder with `+ Add Block` options:
    - **Section Heading**
    - **Subheading**
    - **Text Field / Analytical Narrative**
    - **Image & Chart Upload with Caption**
    - **KPI / Metric Callout ($ Value + Metric Label + Insight Context)**
  - Re-ordering (Move Up / Down), Deletion, and Real-time Live Preview.
  - Step 3: Instant Submit to Django database with feedback.
- **Automatic Data Seeding**:
  - Pre-seeded with admin account (`admin` / `admin123`) and 3 verified analytical case studies:
    1. *Flipkart Sales & Customer Analysis* (Customer segmentation, $15.36 margin gap discovery, 494 organic high-value customer profile).
    2. *Industrial Production & Inventory Analysis* (Ostwal Group of Industries 8,000+ records audit).
    3. *Member Analytics & Digital Growth Platform* (ISTE MITS Gwalior +28% session duration).

---

## 🚀 Getting Started

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & **npm**

### Quick Start (Run Both Servers Simultaneously)
Run the launcher script from the root directory:
```bash
python start_servers.py
```
This automatically starts:
- **Frontend App**: [http://localhost:5173](http://localhost:5173)
- **Django API**: [http://127.0.0.1:8000/api/projects/](http://127.0.0.1:8000/api/projects/)
- **Django Admin**: [http://127.0.0.1:8000/django-admin/](http://127.0.0.1:8000/django-admin/)

---

### Running Servers Individually

#### 1. Django Backend
```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py seed_data
python manage.py runserver 127.0.0.1:8000
```

#### 2. React Vite Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Admin Portal Credentials

- **Username**: `admin`
- **Password**: `admin123`

You can click **"Admin Login"** in the top navigation bar or navigate directly in the UI to sign in, create new case studies with dynamic repeatable blocks, or edit existing ones.

---

## 📁 Codebase Architecture

```
farhan_data_analytics_portfolio/
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── test_api.py            # Automated E2E verification test suite
│   ├── portfolio_backend/     # Django settings, URLs, WSGI
│   └── api/
│       ├── models.py          # Project, ProjectBlock, ContactMessage
│       ├── serializers.py     # Nested DRF serializers with block handling
│       ├── views.py           # REST views, Auth views, Uploads
│       ├── urls.py            # API routing
│       └── management/commands/seed_data.py # Seed verified portfolio data
│
├── frontend/
│   ├── package.json
│   ├── vite.config.js         # Tailwind v4 plugin + Django API proxy
│   ├── index.html
│   └── src/
│       ├── App.jsx            # Main app router & layout switcher
│       ├── context/AuthContext.jsx # Admin JWT/Token authentication state
│       ├── services/api.js    # API service client with fallback handling
│       ├── components/
│       │   ├── layout/        # Navbar, Footer, ResumeModal
│       │   ├── sections/      # Hero, About, Experience, Skills, Projects, CaseStudyModal, Contact
│       │   ├── admin/         # AdminLogin, AdminDashboard, ProjectBuilder (Repeatable block builder)
│       │   └── ui/            # Reusable SVG Icons and components
│       └── data/fallbackProjects.js # Offline fallback dataset
│
└── docs/                      # Verified source of truth documentation
```
