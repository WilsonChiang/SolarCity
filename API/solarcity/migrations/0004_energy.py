# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solarcity', '0003_add_indexes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Energy',
            fields=[
            ],
            options={
                'proxy': True,
            },
            bases=('solarcity.reading',),
        ),
    ]