from django.urls import path, include
from .views import TaskListCreateAPIView, TaskDetailAPIview

urlpatterns = [
  path('tasks/', TaskListCreateAPIView.as_view(), name='tasks-list-create'),
  path('tasks/<int:pk>/', TaskDetailAPIview.as_view(), name='task-detail'),
]
