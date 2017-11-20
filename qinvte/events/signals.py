from django.db.models.signals import post_save
from events.models import Event


def add_hash(sender,instance, **kwargs):
	sha = hashlib.sha256()
    sha.update("{}-{}".format(instance.title,instance.pk).encode('utf-8'))
    sha = sha.hexdigest()
	instance.__setattr__('hash_id',sha)
	print("post save called")
	instance.profile.save()

post_save.connect(add_hash,sender=Event) 