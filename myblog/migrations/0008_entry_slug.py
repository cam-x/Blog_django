# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myblog', '0007_auto_20140922_1725'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='slug',
            field=models.SlugField(default='hi', max_length=200),
            preserve_default=True,
        ),
    ]
