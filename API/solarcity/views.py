import datetime
from django.http import Http404, JsonResponse
from django.views.decorators.cache import cache_page, never_cache
from rest_framework import viewsets
from rest_framework.response import Response
from solarcity import serializers, models, filters, utils


class MoneyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.MoneySerializer
    filter_class = filters.MoneyFilter
    queryset = models.Reading.objects.none()

    def _get_data(self, qs, min_time, max_time, step, home):
        energies = list(qs)
        base_costs = []
        solar_savings = []
        new_costs = []

        base_energies = []
        solar_energies = []
        new_energies = []

        base_emissions = []
        solar_emissions = []
        new_emissions = []

        for i in range((max_time - min_time) / (self._get_factor_based_on_step(step))):
            my_energies = energies[i * self._get_other_step(step):(i + 1) * self._get_other_step(step)]
            if len(my_energies) == 0:
                continue
            base_energy = sum([energy.power_to_heat_total for energy in my_energies])
            solar_energy = sum([energy.power_to_solar_tank for energy in my_energies])

            base_energy_cost = utils.cost_of_energy(base_energy, home.fuel_cost)
            solar_energy_cost = utils.cost_of_energy(solar_energy, home.fuel_cost)

            new_cost = base_energy_cost - solar_energy_cost
            new_energy = base_energy - solar_energy

            base_costs.append(base_energy_cost)
            solar_savings.append(solar_energy_cost)
            new_costs.append(new_cost)

            base_energies.append(base_energy)
            solar_energies.append(solar_energy)
            new_energies.append(new_energy)
            base_energy_emissions = utils.co2_emissions(base_energy, home.emissions_amount_kg)
            solar_energy_emissions = utils.co2_emissions(solar_energy, home.emissions_amount_kg)
            new_energy_emissions = base_energy_emissions - solar_energy_emissions

            base_emissions.append(base_energy_emissions)
            solar_emissions.append(solar_energy_emissions)
            new_emissions.append(new_energy_emissions)
            
        if len(new_costs) == 0:
            return None

        average_base = sum(base_costs)/len(base_costs)*1.0
        average_solar = sum(solar_savings)/len(solar_savings)*1.0
        average_new = sum(new_costs)/len(new_costs)*1.0
        foo = {
            'home': {
                'count': len(new_costs),
                'averages': {
                    'average_base': average_base,
                    'average_solar': average_solar,
                    'average_new': average_new,
                },
                'costs': {
                    'new_costs': new_costs,
                    'solar_savings': solar_savings,
                    'base_costs': base_costs,
                },
                'energy': {
                    'old_energy_use': base_energies,
                    'solar_energy_use': solar_energies,
                    'new_energy_use': new_energies
                },
                'emissions': {
                    'old_energy_emissions': base_emissions,
                    'solar_energy_use': solar_emissions,
                    'new_emissions': new_emissions

                }
            }
        }
        return foo

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
        if min_time >= max_time:
            raise ValueError
        data = self._get_data(qs, min_time, max_time, step, home)
        if not data:
            raise ValueError
        return Response(data)

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
        # monthly
        return step_size * 7

    def _get_other_other_step(self, step):
        step_size = 1
        if step == 'daily':
            return step_size
        step_size *= 24
        if step == 'weekly':
            return step_size
        # monthly
        return step_size * 7


class AverageViewSet(MoneyViewSet):

    def retrieve(self, request, min_time, max_time, step):
        qs = models.Energy.objects.all()
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
        if min_time >= max_time:
            raise ValueError

        homes = list(models.Home.objects.all())
        data = []
        for home in homes:
            my_qs = qs.filter(wel=home.wel_address)

            house_data = self._get_data(my_qs, min_time, max_time, step, home)
            data.append({'{}'.format(home.wel_address): house_data})

        return Response(data)


class HomesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.HomeSerializer
    filter_class = filters.HomeFilter
    queryset = models.Home.objects.all()


class EnergyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.EnergySerializer
    filter_class = filters.EnergyFilter
    queryset = models.Energy.objects.all()


class StatusViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.StatusSerializer
    filter_class = filters.StatusFilter
    # The data is in the database by sample time, so we can do .last() for performance
    queryset = models.Status.objects.all()


class BadgesViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = serializers.BadgesSerializer
    filter_class = filters.BadgeFilter
    queryset = models.Badges.objects.all()

@never_cache
def SMSView(request):
    from twilio.rest import TwilioRestClient
    ACCOUNT_SID = "AC95419b4b89bf3d42e42c41f7a6bf8185"
    AUTH_TOKEN = "8447326b72c83584e36c058f1165426f"

    client = TwilioRestClient(ACCOUNT_SID, AUTH_TOKEN)

    # Hard coded for now because time.
    client.messages.create(
        to="19022232344",
        from_="1 415-599-2671",
        body="Some energy notification",
    )
    response = {'success': 'Successfully sent message.'}
    return JsonResponse(response)
