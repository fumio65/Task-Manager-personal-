from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
  class Meta:
    model = Task
    fields = '__all__'

  def validate_title(self, value):
    if len(value) < 5:
      raise serializers.ValidationError("Title must be at leas 5 characters long.")
    if len(value) > 100:
      raise serializers.ValidationError("Title is too long (max 100 characters).")
    return value
    
  def validate_description(self, value):
    if value and len(value) > 300:
      raise serializers.ValidationError("Description is too long (max 300 characters).")
    return value