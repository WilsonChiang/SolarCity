from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from solarcity import serializers, models, filters


class MoneyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.MoneySerializer
    filter_class = filters.MoneyFilter
    queryset = models.Reading.objects.all()

    def retrieve(self, request, pk=None):
        if not pk:
            raise Http404
        qs = models.Reading.objects.filter(wel=pk)
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class HomesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HomeSerializer
    filter_class = filters.HomeFilter
    queryset = models.Home.objects.all()


class EnergyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EnergySerializer
    filter_class = filters.EnergyFilter
    queryset = models.Energy.objects.all()

