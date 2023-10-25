from rest_framework import viewsets, status
from rest_framework.response import Response

from server.apps.trolleybuses.models import Trolleybus
from server.apps.trolleybuses.serializers import TrolleybusSerializer


class TrolleybusViewSet(viewsets.ModelViewSet):
    queryset = Trolleybus.objects.all()
    serializer_class = TrolleybusSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        helicopters = self.queryset.all()
        queryset_serializer = self.get_serializer(helicopters, many=True)

        return Response(queryset_serializer.data, status=status.HTTP_201_CREATED)