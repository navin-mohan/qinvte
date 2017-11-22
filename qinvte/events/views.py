from events.models import Event,EventResponse
from rest_framework import generics
from django.shortcuts import get_object_or_404

from events.serializers import EventSerializer,ResponseListSerializer,UserResponseSerializer,CreateEventSerializer


from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer


    lookup_field = 'hash_id'

    permission_classes = []

    def get_queryset(self):
        return Event.objects.all().filter(hash_id=self.kwargs['hash_id'])



class CreateEvent(generics.CreateAPIView):
    serializer_class = CreateEventSerializer


class ResponseList(generics.ListCreateAPIView):
    serializer_class = ResponseListSerializer

    lookup_field = 'event'

    def get_queryset(self):
        return EventResponse.objects.all()


class UserResponse(generics.CreateAPIView):

    permission_classes = []

    serializer_class = UserResponseSerializer

    # permission_classes = []

    # def get_queryset(self):
    #     return EventResponse.objects.all()