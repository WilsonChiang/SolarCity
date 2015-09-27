from solarcity import models
"""
Make badges and stuff for people. This is horrible but it's for the demo so wutevs.
"""

homes = models.Home.objects.all()

for home in homes:
    # Placeholder
    if home.electricity_consumption == 'something':
        models.Badges.objects.create(name='Super Energy Saver 2000',
                                     description='Man, you saved some energy.',
                                     image='Placeholder',
                                     home=home.wel_address,
                                     )
