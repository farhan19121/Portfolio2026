"""
Unified Server Launcher for Farhan Khan Data Analytics Portfolio
Launches both Python Django REST Backend (port 8000) and React Vite Frontend (port 5173).
"""

import subprocess
import sys
import os
import time

def run_servers():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    backend_dir = os.path.join(base_dir, 'backend')
    frontend_dir = os.path.join(base_dir, 'frontend')

    print("=" * 60)
    print("🚀 Launching Farhan Khan Data Analytics Portfolio")
    print("=" * 60)
    print("1. Django Backend API  -> http://127.0.0.1:8000/api/projects/")
    print("2. Django Admin Panel  -> http://127.0.0.1:8000/django-admin/")
    print("3. React Vite Frontend -> http://localhost:5173/")
    print("=" * 60)
    print("Default Admin Credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("=" * 60)

    # Start Django Backend
    backend_cmd = [sys.executable, 'manage.py', 'runserver', '127.0.0.1:8000']
    backend_proc = subprocess.Popen(backend_cmd, cwd=backend_dir)
    print("✓ Django Backend process started on port 8000.")

    time.sleep(1)

    # Start Vite Frontend
    npm_cmd = 'npm.cmd' if os.name == 'nt' else 'npm'
    frontend_proc = subprocess.Popen([npm_cmd, 'run', 'dev'], cwd=frontend_dir)
    print("✓ Vite Frontend process started on port 5173.")
    print("\nPress Ctrl+C to stop both servers.")

    try:
        backend_proc.wait()
        frontend_proc.wait()
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        backend_proc.terminate()
        frontend_proc.terminate()
        print("Done.")

if __name__ == '__main__':
    run_servers()
