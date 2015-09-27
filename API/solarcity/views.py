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
            min_time = int(min_time)
            min_datetime = datetime.datetime.fromtimestamp(min_time)
            qs = qs.filter(sample_time__gte=min_datetime)
        else:
            raise ValueError

        if max_time and int(max_time):
            max_time = int(max_time)
            max_datetime = datetime.datetime.fromtimestamp(max_time)
            qs = qs.filter(sample_time__lte=max_datetime)
        else:
            raise ValueError

        energies = list(qs)
        base_costs = []
        solar_savings = []
        new_costs = []
        for i in range((max_time - min_time) / (self._get_factor_based_on_step(step))):
            my_energies = energies[i * self._get_other_step(step):(i + 1) * self._get_other_step(step)]
            if len(my_energies) == 0:
                continue
            base_energy_cost = utils.cost_of_energy(sum([energy.power_to_heat_total for energy in my_energies]),
                                                    home.fuel_cost)
            solar_energy_cost = utils.cost_of_energy(sum([energy.power_to_solar_tank for energy in my_energies]),
                                                     home.fuel_cost)
            new_cost = base_energy_cost - solar_energy_cost
            base_costs.append(base_energy_cost)
            solar_savings.append(solar_energy_cost)
            new_costs.append(new_cost)

        average_base = sum(base_costs)/len(base_costs)*1.0
        average_solar = sum(solar_savings)/len(solar_savings)*1.0
        average_new = sum(new_costs)/len(new_costs)*1.0
        foo = {
            'home':{
                'average_old': average_base,
                'average_solar': average_solar,
                'average_new': average_new,
                'count': len(new_costs),
                'new_costs': new_costs,
                'solar_savings': solar_savings,
                'base_costs': base_costs,
            }
        }
        # json.loads(foo)

        return Response(foo)

    def _get_factor_based_on_step(self, step):
        step_size = 60 * 60
        if step == 'daily':
            return step_size
        step_size *= 24
        if step == 'weekly':
            return step_size
        # 'monthly'
        return step_size * 7

    def _get_other_step(self, step):
        step_size = 60
        if step == 'daily':
            return step_size
        step_size *= 24
        if step == 'weekly':
            return step_size
        # weekly
        return step_size * 7

    def _get_other_other_step(self, step):
        step_size = 1
        if step == 'daily':
            return step_size
        step_size *= 24
        if step == 'weekly':
            return step_size
        # weekly
        return step_size * 7


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
