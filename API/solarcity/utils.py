from API.solarcity.constants import Collectors


cost_oil_kwh = 0.20 #$
cost_electricity_kwh = 0.17 #$
emissions_oil_kwh = 0.42 #kg
emissions_electricty_kwh = 1.2 #kg


def energy(power, time):
    """
    :param power: power in kW
    :param time:  time in hours
    :return: kWh
    """
    return power * time


def heat_sun(solar_power, collector_type):
    """
    :param solar_power: Solar flux (w/m^2)
    :param collector_type: Collectors Enum (SB32, SB64)
    :return: Power from sun (kWh)

    Note: collector_area is the surface area in metres of the solar collector. It is 3 for SB32s (1-solar panel) and 6
     for SB64s (2-solar panels).
    """

    if collector_type == Collectors.SB32:
        collector_area = 3
    elif collector_type == Collectors.SB32:
        collector_area = 6
    else:
        raise Exception('Invalid collector_type provided')

    return collector_area * solar_power


def heat_hx(flow_gly, t_hx_gly_in, t_hx_gly_out):
    """
    :param flow_gly: Flow of glycol in solar loop (LPM)
    :param t_hx_gly_in: Temperature of the glycol entering the heat exchanger. (C)
    :param t_hx_gly_out: Temperature of the glycol exiting the heat exchanger. (C)
    :return: Power to solar tank from heat exchanger (kW)
    """

    return flow_gly * ((t_hx_gly_in - t_hx_gly_out) * (64.2/60000))


def heat_water_solar(flow_water, t_water_solar, t_water_cold):
    """
    :param flow_water: Flow of domestic hot water from main water supply (LPM)
    :param t_water_solar: Temperature of the water exiting the solar tank, going into the auxiliary heater. (C)
    :param t_water_cold: Temperature of the water entering the solar tank. (C)
    :return: Power to auxiliary heater from dolar tank (kW)
    """

    return flow_water * ((t_water_solar - t_water_cold) * (69.8/60000))


def heat_water_tota(flow_water, t_water_hot, t_water_cold):
    """
    :param flow_water: Flow of domestic hot water from main water supply (LPM)
    :param t_water_hot: Temperature of the water exiting the auxiliary heater. (C)
    :param t_water_cold: Temperature of the water entering the solar tank. (C)
    :return: Total power to heat domestic hot water (kW)
    """

    return flow_water * ((t_water_hot-t_water_cold) * (69.8/60000))


def cost_of_energy(energy, fuel_cost):
    """
    :param energy: kWh
    :param fuel_cost: $/kWh
    :return: Cost of energy ($)
    """
    return energy * fuel_cost


def co2_reductions(energy, co2):
    """
    :param energy: kWh
    :param co2: emissions in kg/kWh
    :return: kg
    """
    return energy * co2
