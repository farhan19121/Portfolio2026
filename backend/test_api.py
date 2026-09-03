import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio_backend.settings')
django.setup()

from django.test import Client
from django.contrib.auth.models import User
from api.models import Project, ProjectBlock, ContactMessage
import json

def run_tests():
    client = Client()
    print("--- Starting Backend API E2E Verification ---")

    # 1. Test Project List
    response = client.get('/api/projects/')
    assert response.status_code == 200, f"Expected 200, got {response.status_code}"
    projects = response.json()
    print(f"[PASS] GET /api/projects/ returned {len(projects)} projects")
    assert len(projects) >= 3, "Expected at least 3 seeded projects"
    
    # Verify blocks are nested
    flipkart = next(p for p in projects if 'Flipkart' in p['title'])
    assert len(flipkart['blocks']) > 0, "Expected nested dynamic blocks in project"
    print(f"[PASS] Project '{flipkart['title']}' contains {len(flipkart['blocks'])} dynamic content blocks")

    # 2. Test Admin Login
    login_res = client.post('/api/auth/login/', json.dumps({
        'username': 'FarhanKhan7828',
        'password': 'SabaSaiyeda'
    }), content_type='application/json')
    assert login_res.status_code == 200, f"Expected 200 login, got {login_res.status_code}: {login_res.content}"
    login_data = login_res.json()
    token = login_data['token']
    print(f"[PASS] POST /api/auth/login/ succeeded with token: {token[:10]}...")

    # 3. Test Admin Auth Me
    me_res = client.get('/api/auth/me/', HTTP_AUTHORIZATION=f'Token {token}')
    assert me_res.status_code == 200, f"Expected 200 me, got {me_res.status_code}"
    print(f"[PASS] GET /api/auth/me/ returned user: {me_res.json()['user']['username']}")

    # 4. Test Dynamic Project Creation (Title -> Description -> Repeatable Blocks -> Submit)
    new_project_payload = {
        'title': 'Test Customer Churn & Lifetime Value Model',
        'subtitle': 'Machine learning & SQL cohort survival analysis on subscription data',
        'category': 'Product & Web Analytics',
        'summary': 'Investigated subscriber cancellation patterns and developed early-warning churn metrics.',
        'key_insight': 'Discovered that users with <3 feature interactions in week 1 churned at 4.2x higher rates.',
        'tools': ['Python', 'SQL', 'Pandas', 'Power BI'],
        'featured': True,
        'blocks': [
          {
            'block_type': 'heading',
            'heading': '1. Problem Statement',
            'order': 1
          },
          {
            'block_type': 'text',
            'content': 'Subscription businesses lose up to 30% of new signups in month 1 due to onboarding friction.',
            'order': 2
          },
          {
            'block_type': 'metric',
            'metric_value': '4.2x',
            'metric_label': 'Higher Churn Probability for Inactive Week-1 Users',
            'order': 3
          },
          {
            'block_type': 'heading',
            'heading': '2. Recommendations',
            'order': 4
          },
          {
            'block_type': 'text',
            'content': 'Implement automated in-app onboarding walkthroughs and trigger re-engagement emails at day 3.',
            'order': 5
          }
        ]
    }

    create_res = client.post('/api/projects/', json.dumps(new_project_payload), content_type='application/json', HTTP_AUTHORIZATION=f'Token {token}')
    assert create_res.status_code == 201, f"Expected 201 created, got {create_res.status_code}: {create_res.content}"
    created_proj = create_res.json()
    new_id = created_proj['id']
    print(f"[PASS] POST /api/projects/ created project ID {new_id} with {len(created_proj['blocks'])} dynamic blocks")

    # 5. Test Project Detail Retrieval
    detail_res = client.get(f'/api/projects/{new_id}/')
    assert detail_res.status_code == 200, f"Expected 200 detail, got {detail_res.status_code}"
    print(f"[PASS] GET /api/projects/{new_id}/ retrieved successfully")

    # 6. Test Project Deletion
    del_res = client.delete(f'/api/projects/{new_id}/', HTTP_AUTHORIZATION=f'Token {token}')
    assert del_res.status_code == 204, f"Expected 204 deleted, got {del_res.status_code}"
    print(f"[PASS] DELETE /api/projects/{new_id}/ removed test project cleanly")

    # 7. Test Contact Form Submission
    contact_res = client.post('/api/contact/', json.dumps({
        'name': 'Alex Recruiter',
        'email': 'alex@techcompany.com',
        'subject': 'Data Analyst Role Discussion',
        'message': 'Hi Farhan, we loved your Flipkart case study and would like to schedule an interview.'
    }), content_type='application/json')
    assert contact_res.status_code == 201, f"Expected 201 contact, got {contact_res.status_code}"
    print(f"[PASS] POST /api/contact/ received and logged contact message")

    print("\n--- ALL BACKEND API TESTS PASSED SUCCESSFULLY! ---")

if __name__ == '__main__':
    run_tests()
