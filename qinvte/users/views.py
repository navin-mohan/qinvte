from users.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.reverse import reverse
 
from users.serializers import UserSerializer
 
 
 
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    

    def get_queryset(self):
        return User.objects.all()#.filter(username=self.request.user)

class UserCreate(generics.CreateAPIView):
    permission_classes = []
    serializer_class = UserSerializer

    def get_queryset(self):
            return User.objects.all()
