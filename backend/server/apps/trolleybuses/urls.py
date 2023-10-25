from django.urls import include, path
from rest_framework import routers

from server.apps.trolleybuses.views import TrolleybusViewSet

router = routers.DefaultRouter()
router.register(r"trolleybuses", TrolleybusViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
