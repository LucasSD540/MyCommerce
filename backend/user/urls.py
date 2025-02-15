from django.urls import path
from .views import UserCreateView, UserListView, UserDetailView, UserUpdateView, UserDeleteView

urlpatterns = [
    path('create/', UserCreateView.as_view(), name="create-account"),
    path('list/', UserListView.as_view(), name="list-account"),
    path('me/', UserDetailView.as_view(), name="detail-account"),
    path('update/<int:pk>/', UserUpdateView.as_view(), name="update-account"),
    path('delete/<int:pk>/', UserDeleteView.as_view(), name="delete-account"),
]
