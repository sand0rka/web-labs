from rest_framework import serializers

from server.apps.trolleybuses.models import Trolleybus


class TrolleybusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trolleybus
        fields = ("id", "route_number", "trolleybus_number", "capacity", "max_speed")
