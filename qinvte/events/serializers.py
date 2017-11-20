from rest_framework import serializers
# from guardian.shortcuts import assign_perm
from events.models import Event,EventResponse


class ResponseListSerializer(serializers.ModelSerializer):

    # event = serializers.ReadOnlyField(source='event.id')

    class Meta:
        model = EventResponse

        fields = '__all__'

        extra_kwargs = {
            'url':{
                'view_name':'events:event-responselist',
                'lookup_field':'event'
            }
        }

class UserResponseSerializer(serializers.ModelSerializer):


    class Meta:
        model = EventResponse
        fields = (
            'event',
            'first_name',
            'last_name',
            'email'
        )



        


class EventListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event

        fields = (
            'id',
            'hash_id',
            'title',
            'date',
            'event_desc',
            'location'
        )



# class EventDetailSerializer(serializers.ModelSerializer):


#     class Meta:
#         model = Event

#         fields = (
#                 'title',
#                 'date',
#                 'event_desc',
#                 'location',
#                 'creator'
#             )



class CreateEventSerializer(serializers.ModelSerializer):


    def create(self,validated_data):
        instance = Event()# .objects.create(**validated_data)
        for field in validated_data:
            if field != 'creator':
                instance.__setattr__(field,validated_data[field])
        
        user = self.context['request'].user
        
        instance.creator = user
        instance.save()
        return instance

    class Meta:
        model = Event

        fields = (
                'title',
                'date',
                'event_desc',
                'location',
                'creator',
                'hash_id'
            )

class EventSerializer(serializers.HyperlinkedModelSerializer):

    creator = serializers.ReadOnlyField(source='creator.id')
    # creator_firstname = serializers.ReadOnlyField(source='creator.first_name')
    # creator_lastname = serializers.ReadOnlyField(source='creator.last_name')

    responses = ResponseListSerializer(many=True,read_only=True)



    class Meta:
        model = Event
        fields = '__all__'

        read_only_fields = (
            'created',
            'hash_id',
            'title',
            'id'
        )

        extra_kwargs = {
            'url':{
                'view_name':'events:event-detail',
                'lookup_field':'hash_id'
            }
        }


