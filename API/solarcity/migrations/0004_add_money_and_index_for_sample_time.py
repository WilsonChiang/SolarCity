# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solarcity', '0003_energy'),
    ]

    operations = [
        migrations.CreateModel(
            name='Money',
            fields=[
            ],
            options={
                'proxy': True,
            },
            bases=('solarcity.reading',),
        ),
        migrations.AlterField(
            model_name='reading',
            name='sample_time',
            field=models.DateTimeField(db_index=True, null=True, db_column='SAMPLE_TIME', blank=True),
        ),
    ]
