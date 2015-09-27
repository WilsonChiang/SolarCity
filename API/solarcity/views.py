import datetime
from django.http import Http404
from rest_framework import viewsets
from rest_framework.response import Response
from solarcity import serializers, models, filters, utils


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
        qs = models.Energy.objects.filter(wel=home.wel_address)

        if min_time and int(min_time):
            min_time = datetime.datetime.fromtimestamp(int(min_time))
            qs = qs.filter(sample_time__gte=min_time)

        if max_time and int(max_time):
            max_time = datetime.datetime.fromtimestamp(int(max_time))
            qs = qs.filter(sample_time__lte=max_time)

        base_energy_cost = utils.cost_of_energy(utils.energy(sum([energy.power_to_heat_total for energy in qs[:60]]), 1),
                                                 home.fuel_cost)
        solar_energy_cost = utils.cost_of_energy(utils.energy(sum([energy.power_to_solar_tank for energy in qs[:60]]), 1),
                                           home.fuel_cost)
        new_cost = base_energy_cost - solar_energy_cost

        energies = list(qs)

        for i in range((max_time-min_time)/60):
            if i % 60 == 0:
                # do the things
                pass
            energy_accumulator += energy.power_to_solar_tank
            pass

        return Response(new_cost)


class HomesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HomeSerializer
    filter_class = filters.HomeFilter
    queryset = models.Home.objects.all()


class EnergyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EnergySerializer
    filter_class = filters.EnergyFilter
    queryset = models.Energy.objects.all()


class BadgesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.BadgesSerializer
    filter_class = filters.BadgeFilter
    queryset = models.Badges.objects.all()
