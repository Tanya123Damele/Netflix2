from django.urls import path
from .views import Index,ProfileList,ProfileCreate,ContactView,Home,Popular,Random,Tv_show,Video

app_name='netflixapp'

urlpatterns=[
    path('',Index.as_view(),name='Index'),
    path('profiles/',ProfileList.as_view(), name="profile-list"),
    path('profiles/create/', ProfileCreate.as_view(), name="profile-create"),
    path('contact/',ContactView.as_view(), name="contact"),
    path('home/',Home.as_view(), name="Home"),
    path('popular/',Popular.as_view(), name="popular"),
    path('random/',Random.as_view(), name="random"),
    path('tv_show/',Tv_show.as_view(), name="tv_show"),
    path('video/',Video.as_view(), name="video"),
]