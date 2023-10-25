from django.db import models


class Trolleybus(models.Model):
    route_number = models.PositiveIntegerField()
    trolleybus_number = models.PositiveIntegerField(unique=True)
    capacity = models.PositiveIntegerField()
    max_speed = models.PositiveIntegerField()
