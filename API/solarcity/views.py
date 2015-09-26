import datetime
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from solarcity import serializers, models, filters


class MoneyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.MoneySerializer
    filter_class = filters.MoneyFilter
    queryset = models.Reading.objects.none()

    def retrieve(self, request, pk, min_time, max_time, step):
        if not pk:
            raise Http404

        home = models.Home.objects.filter(wel_address=pk).first()
        if not home:
            raise Http404
        qs = models.Money.objects.filter(wel=home.wel_address)

        if min_time and int(min_time):
            min_time = datetime.datetime.fromtimestamp(int(min_time))
            qs = qs.filter(sample_time__gte=min_time)

        if max_time and int(max_time):
            max_time = datetime.datetime.fromtimestamp(int(max_time))
            qs = qs.filter(sample_time__lte=max_time)

        serializer = serializers.MoneySerializer(money)
        return Response(serializer.data)


class HomesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HomeSerializer
    filter_class = filters.HomeFilter
    queryset = models.Home.objects.all()


class EnergyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EnergySerializer
    filter_class = filters.EnergyFilter
    queryset = models.Energy.objects.all()

