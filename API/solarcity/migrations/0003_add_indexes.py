# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('solarcity', '0002_remove_managed_meta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reading',
            name='wel',
            field=models.CharField(db_index=True, max_length=20, null=True, db_column='WEL', blank=True),
        ),
    ]
