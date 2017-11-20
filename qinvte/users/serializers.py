from rest_framework import serializers
 
from users.models import User
from events.serializers import EventListSerializer
 
class UserSerializer(serializers.HyperlinkedModelSerializer):
    events = EventListSerializer(
        many=True,
        read_only=True
    )
    password = serializers.CharField(write_only=True)
 
    def create(self, validated_data):
        instance  = User(
                username=validated_data.get('username',None)
            )
        for field in validated_data:
            if field == 'password':
                instance.set_password(validated_data.get(field))
            elif field == 'username':
                continue
            else:
                instance.__setattr__(field, validated_data.get(field))
        instance.save()
        return instance
 
    class Meta:
        model = User
        fields = ('url', 'id', 'username',
                  'password', 'first_name', 'last_name',
                  'email','events'
                  )
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            }
        }
