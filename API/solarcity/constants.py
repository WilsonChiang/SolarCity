from enum import Enum


class Costs(Enum):
    # $
    oil_per_litre = 1.20  # $1.20 per litre of oil
    oil_per_kwh = 0.20  # $0.20 per kWh of oil
    electricity_per_kwh = 0.17  # $0.17 per kWh of electricity


class Emissions(Enum):
    # kg
    litre_of_oil = 2.6  # 2.6 kg per litre of oil
    kwh_of_oil = 0.42  # 0.42 kg per kWh of oil
    kwh_of_electricity = 1.2  # 1.2 kg per kWh of electricity
