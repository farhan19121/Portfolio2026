from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    AdminLoginView,
    AdminMeView,
    AdminLogoutView,
    FileUploadView,
    ContactCreateView,
    ContactListView
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path('auth/login/', AdminLoginView.as_view(), name='admin-login'),
    path('auth/me/', AdminMeView.as_view(), name='admin-me'),
    path('auth/logout/', AdminLogoutView.as_view(), name='admin-logout'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('admin/messages/', ContactListView.as_view(), name='admin-messages'),
    path('', include(router.urls)),
]
