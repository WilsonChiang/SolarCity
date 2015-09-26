import django_filters
from solarcity import models
from rest_framework import filters
from rest_framework import generics


class MoneyFilter(django_filters.FilterSet):
    time = django_filters.MethodFilter(help_text='filter by household id', action='filter_time')
    home = django_filters.MethodFilter(help_text='filter by time frame', action='filter_home')

    class Meta:
        model = models.Reading

    def filter_home(self, qs, value):
        return qs.filter(wel=value)[:100]

    def filter_time(self, qs, value):
        return qs



