from rest_framework import serializers
from solarcity import models


class MoneySerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Money
        fields = ['average', 'values']


class HomeSerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Home


class EnergySerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Energy


class StatusSerializer(serializers.HyperlinkedModelSerializer):

    class Meta(object):
        model = models.Status


class BadgesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta(object):
        model = models.Badges

