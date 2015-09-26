# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Home',
            fields=[
                ('id', models.IntegerField(serialize=False, primary_key=True)),
                ('wel_address', models.CharField(max_length=255, null=True, db_column='WEL_Address', blank=True)),
                ('postal_code', models.CharField(max_length=255, null=True, db_column='Postal_Code', blank=True)),
                ('conventional_system', models.CharField(max_length=255, null=True, db_column='Conventional_System', blank=True)),
                ('solar_system', models.CharField(max_length=255, null=True, db_column='Solar_System', blank=True)),
                ('roof_pitch', models.CharField(max_length=255, null=True, db_column='Roof_Pitch', blank=True)),
                ('azimuth', models.CharField(max_length=255, null=True, db_column='Azimuth', blank=True)),
                ('installation_type', models.CharField(max_length=255, null=True, db_column='Installation_type', blank=True)),
                ('age_of_home', models.CharField(max_length=255, null=True, db_column='Age_Of_Home', blank=True)),
                ('size_of_home', models.CharField(max_length=255, null=True, db_column='Size_Of_Home', blank=True)),
                ('water_consumption', models.CharField(max_length=255, null=True, db_column='Water_Consumption', blank=True)),
                ('electricity_consumption', models.CharField(max_length=255, null=True, db_column='Electricity_Consumption', blank=True)),
                ('created_at', models.DateTimeField(null=True, db_column='createdAt', blank=True)),
                ('updated_at', models.DateTimeField(null=True, db_column='updatedAt', blank=True)),
            ],
            options={
                'db_table': 'home',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Reading',
            fields=[
                ('id', models.BigIntegerField(serialize=False, primary_key=True)),
                ('wel', models.CharField(max_length=20, null=True, db_column='WEL', blank=True)),
                ('sample_time', models.DateTimeField(null=True, db_column='SAMPLE_TIME', blank=True)),
                ('aux_heat_on', models.FloatField(null=True, db_column='AUX_HEAT_ON', blank=True)),
                ('flow_gly', models.FloatField(null=True, db_column='FLOW_GLY', blank=True)),
                ('flow_water', models.FloatField(null=True, db_column='FLOW_WATER', blank=True)),
                ('flow_water_d', models.FloatField(null=True, db_column='FLOW_WATER_D', blank=True)),
                ('heat_aux_d', models.FloatField(null=True, db_column='HEAT_AUX_D', blank=True)),
                ('pv_volts', models.FloatField(null=True, db_column='PV_VOLTS', blank=True)),
                ('pv_amps', models.FloatField(null=True, db_column='PV_AMPS', blank=True)),
                ('solar_power', models.FloatField(null=True, db_column='SOLAR_POWER', blank=True)),
                ('t_collector', models.FloatField(null=True, db_column='T_COLLECTOR', blank=True)),
                ('t_storage', models.FloatField(null=True, db_column='T_STORAGE', blank=True)),
                ('t_hx_gly_in', models.FloatField(null=True, db_column='T_HX_GLY_IN', blank=True)),
                ('t_hx_gly_out', models.FloatField(null=True, db_column='T_HX_GLY_OUT', blank=True)),
                ('t_hx_water_out', models.FloatField(null=True, db_column='T_HX_WATER_OUT', blank=True)),
                ('t_water_cold', models.FloatField(null=True, db_column='T_WATER_COLD', blank=True)),
                ('t_water_solar', models.FloatField(null=True, db_column='T_WATER_SOLAR', blank=True)),
                ('t_water_hot', models.FloatField(null=True, db_column='T_WATER_HOT', blank=True)),
                ('led_pump_on', models.FloatField(null=True, db_column='LED_PUMP_ON', blank=True)),
                ('led_t_coll_hi', models.FloatField(null=True, db_column='LED_T_COLL_HI', blank=True)),
                ('led_t_stor_hi', models.FloatField(null=True, db_column='LED_T_STOR_HI', blank=True)),
                ('led_delt_lo', models.FloatField(null=True, db_column='LED_DELT_LO', blank=True)),
                ('updated_at', models.DateTimeField(null=True, db_column='updatedAt', blank=True)),
                ('created_at', models.DateTimeField(null=True, db_column='createdAt', blank=True)),
                ('date', models.DateField(null=True, blank=True)),
                ('time', models.TimeField(null=True, blank=True)),
            ],
            options={
                'db_table': 'reading',
                'managed': False,
            },
        ),
    ]
