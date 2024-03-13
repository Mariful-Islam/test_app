from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', SignUp.as_view()),
    path('get-user/<str:username>/', GetUser.as_view()),
    path('get_user/<str:username>/', get_user),
    path('users/', Users.as_view()),
    path('update/<int:pk>/', UpdateUser.as_view()),
    path('edit/<int:id>/', update_user),
    path('contacts/', RetrieveContact.as_view()),
    path('create_contact/', CreateContact.as_view()),
    path('up_dlt_contact/<int:pk>/', UpdateDeleteContact.as_view()),
]