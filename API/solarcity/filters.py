import django_filters
from solarcity import models


class MoneyFilter(django_filters.FilterSet):
    time = django_filters.MethodFilter(help_text='filter by time frame', action='filter_time')
    home = django_filters.MethodFilter(help_text='filter by household id', action='filter_home')

    class Meta:
        model = models.Reading

    def filter_home(self, qs, value):
        qs = qs.filter(wel=value)[:1000]
        return qs

    def filter_time(self, qs, value):
        return qs


class HomeFilter(django_filters.FilterSet):

    class Meta:
        model = models.Home


class EnergyFilter(django_filters.FilterSet):
    time = django_filters.MethodFilter(help_text='filter by time frame', action='filter_time')
    home = django_filters.MethodFilter(help_text='filter by household id', action='filter_home')

    class Meta:
        model = models.Reading

    def filter_home(self, qs, value):
        qs = qs.filter(wel=value)[:1000]
        return qs

    def filter_time(self, qs, value):
        return qs


class StatusFilter(django_filters.FilterSet):
    home = django_filters.MethodFilter(help_text='filter by household id', action='filter_home')

    class Meta:
        model = models.Reading

    def filter_home(self, qs, value):
        qs = qs.filter(wel=value).order_by('-sample_time')[:1]
        return qs


class BadgeFilter(django_filters.FilterSet):
    home = django_filters.MethodFilter(help_text='filter by household id', action='filter_home')

    class Meta:
        model = models.Badges

    def filter_home(self, qs, value):
        qs = qs.filter(home=value)[:1000]
        return qs
