from django.shortcuts import render
from rest_framework import viewsets
from solarcity import serializers, models, filters


class MoneyViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.MoneySerializer
    filter_class = filters.MoneyFilter
    queryset = models.Reading.objects.all()
