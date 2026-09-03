from django.db import models
from django.utils.text import slugify

class Project(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    subtitle = models.CharField(max_length=300, blank=True, default='')
    category = models.CharField(max_length=100, default='Data Analytics')
    summary = models.TextField(help_text="Business problem and project overview")
    key_insight = models.TextField(blank=True, default='', help_text="Primary analytical insight or business impact")
    tools = models.JSONField(default=list, blank=True, help_text="List of tools used, e.g. ['SQL', 'Python']")
    cover_image = models.ImageField(upload_to='projects/', blank=True, null=True)
    cover_image_url = models.CharField(max_length=1000, blank=True, default='')
    featured = models.BooleanField(default=True)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title) or 'project'
            slug = base_slug
            counter = 1
            while Project.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class ProjectBlock(models.Model):
    BLOCK_TYPES = (
        ('heading', 'Section Heading'),
        ('subheading', 'Subheading'),
        ('text', 'Text / Description'),
        ('image', 'Image & Chart'),
        ('metric', 'KPI / Metric Callout'),
        ('quote', 'Key Takeaway / Quote'),
    )

    project = models.ForeignKey(Project, related_name='blocks', on_delete=models.CASCADE)
    block_type = models.CharField(max_length=20, choices=BLOCK_TYPES, default='text')
    heading = models.CharField(max_length=255, blank=True, default='')
    content = models.TextField(blank=True, default='')
    image = models.ImageField(upload_to='project_blocks/', blank=True, null=True)
    image_url = models.CharField(max_length=1000, blank=True, default='')
    image_caption = models.CharField(max_length=255, blank=True, default='')
    metric_value = models.CharField(max_length=100, blank=True, default='')
    metric_label = models.CharField(max_length=200, blank=True, default='')
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f"[{self.project.title}] {self.block_type} (#{self.order})"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=255, blank=True, default='')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.email} ({self.created_at.strftime('%Y-%m-%d')})"
