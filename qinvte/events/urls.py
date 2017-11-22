from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from events import views
# from rest_framework.authtoken import views as auth

urlpatterns = [
    url(
        r'^events/(?P<hash_id>[0-9a-f]+)/$',
        views.EventDetail.as_view(),
        name='event-detail'
    ),
    url(
        r'^events/$',
        views.CreateEvent.as_view()
    ),
    # url(
    #     r'^event'
    # ),
    url(
        r'^response/$',
        views.UserResponse.as_view(),
        name='userresponse-detail'
    ),
    url(
        r'^auth/$',
        views.CustomObtainAuthToken.as_view()
    ),
    url(
        r'^response/(?P<event>[0-9]+)/$',
        views.ResponseList.as_view()
    )
]



