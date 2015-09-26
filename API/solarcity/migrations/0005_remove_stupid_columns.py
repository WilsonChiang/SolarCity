# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solarcity', '0004_energy'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='home',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='home',
            name='updated_at',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='created_at',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='date',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='time',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='updated_at',
        ),
        migrations.AlterField(
            model_name='reading',
            name='sample_time',
            field=models.DateTimeField(db_index=True, null=True, db_column='SAMPLE_TIME', blank=True),
        ),
    ]
