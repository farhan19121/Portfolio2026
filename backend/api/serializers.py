from rest_framework import serializers
from .models import Project, ProjectBlock, ContactMessage
import json

class ProjectBlockSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = ProjectBlock
        fields = [
            'id',
            'block_type',
            'heading',
            'content',
            'image',
            'image_url',
            'image_caption',
            'metric_value',
            'metric_label',
            'order',
            'created_at',
        ]
        read_only_fields = ['created_at']


class ProjectSerializer(serializers.ModelSerializer):
    blocks = ProjectBlockSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'slug',
            'subtitle',
            'category',
            'summary',
            'key_insight',
            'tools',
            'cover_image',
            'cover_image_url',
            'featured',
            'order',
            'created_at',
            'updated_at',
            'blocks',
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at']

    def create(self, validated_data):
        blocks_data = validated_data.pop('blocks', [])
        
        # Parse tools if passed as string (e.g. from multipart form data)
        tools = validated_data.get('tools')
        if isinstance(tools, str):
            try:
                validated_data['tools'] = json.loads(tools)
            except Exception:
                validated_data['tools'] = [t.strip() for t in tools.split(',') if t.strip()]

        project = Project.objects.create(**validated_data)
        for i, block_data in enumerate(blocks_data):
            block_data.pop('id', None)
            if 'order' not in block_data or block_data['order'] is None:
                block_data['order'] = i
            ProjectBlock.objects.create(project=project, **block_data)
        return project

    def update(self, instance, validated_data):
        blocks_data = validated_data.pop('blocks', None)

        tools = validated_data.get('tools')
        if isinstance(tools, str):
            try:
                validated_data['tools'] = json.loads(tools)
            except Exception:
                validated_data['tools'] = [t.strip() for t in tools.split(',') if t.strip()]

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if blocks_data is not None:
            # Replace or update blocks
            instance.blocks.all().delete()
            for i, block_data in enumerate(blocks_data):
                block_data.pop('id', None)
                if 'order' not in block_data or block_data['order'] is None:
                    block_data['order'] = i
                ProjectBlock.objects.create(project=instance, **block_data)

        return instance


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']
