from solarcity.constants import Collectors


def energy(power, time):
    """
    :param power: power in kW
    :param time:  time in hours
    :return: kWh
    """
    power = power or 0.0
    time = time or 0.0
    return power * time


def heat_sun(solar_power, collector_type):
    """
    :param solar_power: Solar flux (w/m^2)
    :param collector_type: Collectors Enum (SB32, SB64)
    :return: Power from sun (kW)

    Note: collector_area is the surface area in metres of the solar collector. It is 3 for SB32s (1-solar panel) and 6
     for SB64s (2-solar panels).
    """

    if collector_type == Collectors.SB32:
        collector_area = 3
    elif collector_type == Collectors.SB32:
        collector_area = 6
    else:
        raise Exception('Invalid collector_type provided')

    solar_power = solar_power or 0.0
    return (collector_area * solar_power) / 1000


def power_to_solar_tank(flow_gly, t_hx_gly_in, t_hx_gly_out):
    """
    :param flow_gly: Flow of glycol in solar loop (LPM)
    :param t_hx_gly_in: Temperature of the glycol entering the heat exchanger. (C)
    :param t_hx_gly_out: Temperature of the glycol exiting the heat exchanger. (C)
    :return: Power to solar tank from heat exchanger (kW)
    """
    flow_gly = flow_gly or 0.0
    t_hx_gly_in = t_hx_gly_in or 0.0
    t_hx_gly_out = t_hx_gly_out or 0.0
    return flow_gly * ((t_hx_gly_in - t_hx_gly_out) * (64.2/60000))


def power_to_aux_tank(flow_water, t_water_solar, t_water_cold):
    """
    :param flow_water: Flow of domestic hot water from main water supply (LPM)
    :param t_water_solar: Temperature of the water exiting the solar tank, going into the auxiliary heater. (C)
    :param t_water_cold: Temperature of the water entering the solar tank. (C)
    :return: Power to auxiliary heater from solar tank (kW)
    """
    flow_water = flow_water or 0.0
    t_water_solar = t_water_solar or 0.0
    t_water_cold = t_water_cold or 0.0
    return flow_water * ((t_water_solar - t_water_cold) * (69.8/60000))


def power_to_heat_water_total(flow_water, t_water_hot, t_water_cold):
    """
    :param flow_water: Flow of domestic hot water from main water supply (LPM)
    :param t_water_hot: Temperature of the water exiting the auxiliary heater. (C)
    :param t_water_cold: Temperature of the water entering the solar tank. (C)
    :return: Total power to heat domestic hot water (kW)
    """
    flow_water = flow_water or 0.0
    t_water_hot = t_water_hot or 0.0
    t_water_cold = t_water_cold or 0.0
    return flow_water * ((t_water_hot-t_water_cold) * (69.8/60000))


def cost_of_energy(energy, fuel_cost):
    """
    :param energy: kWh
    :param fuel_cost: $/kWh
    :return: Cost of energy ($)
    """
    energy = energy or 0.0
    fuel_cost = fuel_cost or 0.0
    return energy * fuel_cost


def co2_emissions(energy, co2):
    """
    :param energy: kWh
    :param co2: emissions in kg/kWh
    :return: kg
    """
    energy = energy or 0.0
    co2 = co2 or 0.0
    return energy * co2
