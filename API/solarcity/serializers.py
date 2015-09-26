from rest_framework import serializers
from solarcity import models


class MoneySerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Reading


class HomeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Home