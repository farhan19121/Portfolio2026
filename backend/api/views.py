from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from django.shortcuts import get_object_or_404
from .models import Project, ProjectBlock, ContactMessage
from .serializers import ProjectSerializer, ProjectBlockSerializer, ContactMessageSerializer
import json


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated and request.user.is_staff


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().prefetch_related('blocks')
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
    lookup_field = 'id'

    def get_queryset(self):
        queryset = Project.objects.all().prefetch_related('blocks')
        category = self.request.query_params.get('category')
        if category and category.lower() != 'all':
            queryset = queryset.filter(category__iexact=category)
        return queryset

    def retrieve(self, request, *args, **kwargs):
        # Support lookup by either ID or slug
        lookup_value = self.kwargs.get(self.lookup_field)
        if lookup_value.isdigit():
            instance = get_object_or_404(Project, id=int(lookup_value))
        else:
            instance = get_object_or_404(Project, slug=lookup_value)
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class AdminLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'detail': 'Please provide both username and password.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response(
                {'detail': 'Invalid credentials. Please verify your admin username and password.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if not user.is_staff and not user.is_superuser:
            return Response(
                {'detail': 'Access denied. Only authorized portfolio administrators can log in.'},
                status=status.HTTP_403_FORBIDDEN
            )

        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser
            }
        })


class AdminMeView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser
            }
        })


class AdminLogoutView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            request.user.auth_token.delete()
        except Exception:
            pass
        return Response({'detail': 'Successfully logged out.'})


class FileUploadView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def post(self, request):
        file_obj = request.FILES.get('file') or request.FILES.get('image')
        if not file_obj:
            return Response({'detail': 'No file was provided.'}, status=status.HTTP_400_BAD_REQUEST)

        file_name = default_storage.save(f"uploads/{file_obj.name}", file_obj)
        file_url = request.build_absolute_uri(default_storage.url(file_name))

        return Response({
            'file_name': file_name,
            'url': file_url
        }, status=status.HTTP_201_CREATED)


class ContactCreateView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'Thank you! Your message has been received.',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactListView(views.APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        messages = ContactMessage.objects.all()
        serializer = ContactMessageSerializer(messages, many=True)
        return Response(serializer.data)
