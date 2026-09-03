import os
import sys
from pathlib import Path

# Add backend directory to sys.path so django apps can be resolved on Vercel
BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.append(str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')

from django.core.wsgi import get_wsgi_application

application = get_wsgi_application()
app = application
