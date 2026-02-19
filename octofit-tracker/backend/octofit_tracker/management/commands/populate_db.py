from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        
        self.stdout.write(self.style.SUCCESS('Existing data cleared!'))
        self.stdout.write('Populating database with superhero test data...')
        
        # Create teams
        teams_data = [
            {
                'name': 'Team Marvel',
                'description': 'The mightiest heroes of Earth, assembled to protect the world from threats too large for any one hero to handle.'
            },
            {
                'name': 'Team DC',
                'description': 'The legendary heroes of justice, united to defend truth, justice, and peace across the universe.'
            }
        ]
        
        teams = []
        for team_data in teams_data:
            team = Team.objects.create(**team_data)
            teams.append(team)
            self.stdout.write(f'Created team: {team.name}')
        
        # Create users (superheroes)
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
        ]
        
        dc_heroes = [
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'The Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
        ]
        
        users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            users.append(user)
            self.stdout.write(f'Created user: {user.name} ({user.team})')
        
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            users.append(user)
            self.stdout.write(f'Created user: {user.name} ({user.team})')
        
        # Create workouts
        workouts_data = [
            {
                'name': 'Asgardian Hammer Lift',
                'description': 'Channel your inner Thor with heavy weightlifting exercises.',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'estimated_calories': 450,
                'duration': 60
            },
            {
                'name': 'Super Speed Sprint',
                'description': 'Run like The Flash with high-intensity interval sprints.',
                'category': 'Cardio',
                'difficulty': 'Intermediate',
                'estimated_calories': 600,
                'duration': 45
            },
            {
                'name': 'Web-Slinger Core',
                'description': 'Build abs of steel like Spider-Man with core exercises.',
                'category': 'Core',
                'difficulty': 'Beginner',
                'estimated_calories': 300,
                'duration': 30
            },
            {
                'name': 'Amazon Warrior Training',
                'description': 'Fight like Wonder Woman with combat-inspired movements.',
                'category': 'Mixed',
                'difficulty': 'Advanced',
                'estimated_calories': 550,
                'duration': 75
            },
            {
                'name': 'Bat-Signal Circuit',
                'description': 'Train like the Dark Knight with a full-body circuit.',
                'category': 'Circuit',
                'difficulty': 'Intermediate',
                'estimated_calories': 500,
                'duration': 50
            },
            {
                'name': 'Gamma Ray Smash',
                'description': 'Unleash your inner Hulk with explosive power training.',
                'category': 'Strength',
                'difficulty': 'Advanced',
                'estimated_calories': 650,
                'duration': 60
            }
        ]
        
        workouts = []
        for workout_data in workouts_data:
            workout = Workout.objects.create(**workout_data)
            workouts.append(workout)
            self.stdout.write(f'Created workout: {workout.name}')
        
        # Create activities
        activity_types = ['Running', 'Cycling', 'Swimming', 'Weightlifting', 'Yoga', 'Boxing', 'Martial Arts', 'HIIT']
        
        activities = []
        for user in users:
            # Create 5-10 random activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity = Activity.objects.create(
                    user_email=user.email,
                    activity_type=random.choice(activity_types),
                    duration=random.randint(20, 120),
                    calories=random.randint(200, 800),
                    date=datetime.now() - timedelta(days=random.randint(1, 30))
                )
                activities.append(activity)
            self.stdout.write(f'Created {num_activities} activities for {user.name}')
        
        # Create leaderboard entries
        leaderboard_data = {}
        for activity in activities:
            email = activity.user_email
            if email not in leaderboard_data:
                user = User.objects.get(email=email)
                leaderboard_data[email] = {
                    'user_email': email,
                    'user_name': user.name,
                    'team': user.team,
                    'total_calories': 0,
                    'total_activities': 0
                }
            leaderboard_data[email]['total_calories'] += activity.calories
            leaderboard_data[email]['total_activities'] += 1
        
        # Sort by total calories and create leaderboard entries
        sorted_data = sorted(leaderboard_data.values(), key=lambda x: x['total_calories'], reverse=True)
        
        for rank, data in enumerate(sorted_data, start=1):
            Leaderboard.objects.create(
                user_email=data['user_email'],
                user_name=data['user_name'],
                team=data['team'],
                total_calories=data['total_calories'],
                total_activities=data['total_activities'],
                rank=rank
            )
            self.stdout.write(f'Rank {rank}: {data["user_name"]} - {data["total_calories"]} calories')
        
        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(teams)} teams'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))
        self.stdout.write(self.style.SUCCESS(f'Created {len(sorted_data)} leaderboard entries'))
