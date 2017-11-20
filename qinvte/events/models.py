from django.db import models
from users.models import User
import hashlib
from django.db.models.signals import pre_save


class Event(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(
        'users.User',
        related_name='events',
        on_delete=models.CASCADE,
        null=False
    )

    title = models.CharField(max_length=200,null=False)
    date  = models.DateTimeField(null=False)
    event_desc = models.TextField(null=True) 

    hash_id = models.CharField(max_length=64,null=True)

    location = models.CharField(max_length=200,null=False)

    # def save(self,force_update=False,force_insert=False, *args, **kwargs):
    #     sha = hashlib.sha256()
    #     sha.update("{}-{}".format(self.title,self.pk).encode('utf-8'))
    #     self.hash_id = sha.hexdigest()
    #     super(Event,self).save(force_update,force_insert,*args,*kwargs)

    class Meta:
        ordering = ('created',)

    def __str__(self):
        return str(self.title)


class EventResponse(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    event  = models.ForeignKey(
        'events.Event',
        related_name='responses',
        on_delete=models.CASCADE,
        null=False
    )

    first_name = models.CharField(max_length=150,null=False)
    last_name = models.CharField(max_length=150,null=False)

    email = models.EmailField(null=False)


    class Meta:
        ordering = ('created',)


def add_hash(sender,instance,*args, **kwargs):
    sha = hashlib.sha256()
    sha.update("{}-{}".format(instance.title,instance.pk).encode('utf-8'))
    sha = sha.hexdigest()
    instance.hash_id = sha 

pre_save.connect(add_hash,sender=Event)