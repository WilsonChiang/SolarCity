# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solarcity', '0005_create_home_foreign_keys'),
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
    ]
