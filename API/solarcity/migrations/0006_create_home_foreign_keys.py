# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


def set_home_foreign_key(apps, schema_editor):
    Reading = apps.get_model('solarcity', 'Reading')
    Home = apps.get_model('solarcity', 'Home')
    readings = Reading.objects.all()

    for reading in readings:
        wel = reading.wel
        reading.home = Home.objects.get(wel_address=wel)
        reading.save()


class Migration(migrations.Migration):
    dependencies = [
        ('solarcity', '0005_remove_stupid_columns'),
    ]

    operations = [
        migrations.AddField(
            model_name='reading',
            name='home',
            field=models.ForeignKey(default=0, to='solarcity.Home'),
            preserve_default=False),
        migrations.RunPython(set_home_foreign_key),
    ]