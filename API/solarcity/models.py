# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin sqlcustom [app_label]'
# into your database.
from __future__ import unicode_literals

from django.db import models


class Home(models.Model):
    id = models.IntegerField(primary_key=True)
    wel_address = models.CharField(db_column='WEL_Address', max_length=255, blank=True,
                                   null=True)  # Field name made lowercase.
    postal_code = models.CharField(db_column='Postal_Code', max_length=255, blank=True,
                                   null=True)  # Field name made lowercase.
    conventional_system = models.CharField(db_column='Conventional_System', max_length=255, blank=True,
                                           null=True)  # Field name made lowercase.
    solar_system = models.CharField(db_column='Solar_System', max_length=255, blank=True,
                                    null=True)  # Field name made lowercase.
    roof_pitch = models.CharField(db_column='Roof_Pitch', max_length=255, blank=True,
                                  null=True)  # Field name made lowercase.
    azimuth = models.CharField(db_column='Azimuth', max_length=255, blank=True, null=True)  # Field name made lowercase.
    installation_type = models.CharField(db_column='Installation_type', max_length=255, blank=True,
                                         null=True)  # Field name made lowercase.
    age_of_home = models.CharField(db_column='Age_Of_Home', max_length=255, blank=True,
                                   null=True)  # Field name made lowercase.
    size_of_home = models.CharField(db_column='Size_Of_Home', max_length=255, blank=True,
                                    null=True)  # Field name made lowercase.
    water_consumption = models.CharField(db_column='Water_Consumption', max_length=255, blank=True,
                                         null=True)  # Field name made lowercase.
    electricity_consumption = models.CharField(db_column='Electricity_Consumption', max_length=255, blank=True,
                                               null=True)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    updated_at = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'home'


class Reading(models.Model):
    id = models.BigIntegerField(primary_key=True)
    wel = models.CharField(db_column='WEL', max_length=20, blank=True, null=True)  # Field name made lowercase.
    sample_time = models.DateTimeField(db_column='SAMPLE_TIME', blank=True, null=True)  # Field name made lowercase.
    aux_heat_on = models.FloatField(db_column='AUX_HEAT_ON', blank=True, null=True)  # Field name made lowercase.
    flow_gly = models.FloatField(db_column='FLOW_GLY', blank=True, null=True)  # Field name made lowercase.
    flow_water = models.FloatField(db_column='FLOW_WATER', blank=True, null=True)  # Field name made lowercase.
    flow_water_d = models.FloatField(db_column='FLOW_WATER_D', blank=True, null=True)  # Field name made lowercase.
    heat_aux_d = models.FloatField(db_column='HEAT_AUX_D', blank=True, null=True)  # Field name made lowercase.
    pv_volts = models.FloatField(db_column='PV_VOLTS', blank=True, null=True)  # Field name made lowercase.
    pv_amps = models.FloatField(db_column='PV_AMPS', blank=True, null=True)  # Field name made lowercase.
    solar_power = models.FloatField(db_column='SOLAR_POWER', blank=True, null=True)  # Field name made lowercase.
    t_collector = models.FloatField(db_column='T_COLLECTOR', blank=True, null=True)  # Field name made lowercase.
    t_storage = models.FloatField(db_column='T_STORAGE', blank=True, null=True)  # Field name made lowercase.
    t_hx_gly_in = models.FloatField(db_column='T_HX_GLY_IN', blank=True, null=True)  # Field name made lowercase.
    t_hx_gly_out = models.FloatField(db_column='T_HX_GLY_OUT', blank=True, null=True)  # Field name made lowercase.
    t_hx_water_out = models.FloatField(db_column='T_HX_WATER_OUT', blank=True, null=True)  # Field name made lowercase.
    t_water_cold = models.FloatField(db_column='T_WATER_COLD', blank=True, null=True)  # Field name made lowercase.
    t_water_solar = models.FloatField(db_column='T_WATER_SOLAR', blank=True, null=True)  # Field name made lowercase.
    t_water_hot = models.FloatField(db_column='T_WATER_HOT', blank=True, null=True)  # Field name made lowercase.
    led_pump_on = models.FloatField(db_column='LED_PUMP_ON', blank=True, null=True)  # Field name made lowercase.
    led_t_coll_hi = models.FloatField(db_column='LED_T_COLL_HI', blank=True, null=True)  # Field name made lowercase.
    led_t_stor_hi = models.FloatField(db_column='LED_T_STOR_HI', blank=True, null=True)  # Field name made lowercase.
    led_delt_lo = models.FloatField(db_column='LED_DELT_LO', blank=True, null=True)  # Field name made lowercase.
    updated_at = models.DateTimeField(db_column='updatedAt', blank=True, null=True)  # Field name made lowercase.
    created_at = models.DateTimeField(db_column='createdAt', blank=True, null=True)  # Field name made lowercase.
    date = models.DateField(blank=True, null=True)
    time = models.TimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reading'
