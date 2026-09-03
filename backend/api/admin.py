from django.contrib import admin
from .models import Project, ProjectBlock, ContactMessage

class ProjectBlockInline(admin.StackedInline):
    model = ProjectBlock
    extra = 1
    fields = ('block_type', 'heading', 'content', 'image', 'image_url', 'image_caption', 'metric_value', 'metric_label', 'order')

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'featured', 'order', 'created_at')
    list_filter = ('category', 'featured')
    search_fields = ('title', 'summary', 'key_insight')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectBlockInline]

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_read')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
