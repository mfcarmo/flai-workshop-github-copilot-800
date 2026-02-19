from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime


class UserModelTestCase(TestCase):
    """Test cases for User model"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Test Hero',
            email='test@hero.com',
            team='Team Test'
        )
    
    def test_user_creation(self):
        """Test that a user can be created successfully"""
        self.assertEqual(self.user.name, 'Test Hero')
        self.assertEqual(self.user.email, 'test@hero.com')
        self.assertEqual(self.user.team, 'Team Test')
    
    def test_user_str(self):
        """Test the string representation of user"""
        self.assertEqual(str(self.user), 'Test Hero')


class TeamModelTestCase(TestCase):
    """Test cases for Team model"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='Test Team',
            description='A test team'
        )
    
    def test_team_creation(self):
        """Test that a team can be created successfully"""
        self.assertEqual(self.team.name, 'Test Team')
        self.assertEqual(self.team.description, 'A test team')
    
    def test_team_str(self):
        """Test the string representation of team"""
        self.assertEqual(str(self.team), 'Test Team')


class ActivityModelTestCase(TestCase):
    """Test cases for Activity model"""
    
    def setUp(self):
        self.activity = Activity.objects.create(
            user_email='test@hero.com',
            activity_type='Running',
            duration=30,
            calories=300,
            date=datetime.now()
        )
    
    def test_activity_creation(self):
        """Test that an activity can be created successfully"""
        self.assertEqual(self.activity.user_email, 'test@hero.com')
        self.assertEqual(self.activity.activity_type, 'Running')
        self.assertEqual(self.activity.duration, 30)
        self.assertEqual(self.activity.calories, 300)


class UserAPITestCase(APITestCase):
    """Test cases for User API endpoints"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='API Test Hero',
            email='api@hero.com',
            team='Team API'
        )
    
    def test_get_users_list(self):
        """Test retrieving list of users"""
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_user(self):
        """Test creating a new user via API"""
        url = reverse('user-list')
        data = {
            'name': 'New Hero',
            'email': 'new@hero.com',
            'team': 'Team New'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)


class TeamAPITestCase(APITestCase):
    """Test cases for Team API endpoints"""
    
    def setUp(self):
        self.team = Team.objects.create(
            name='API Test Team',
            description='A test team for API'
        )
    
    def test_get_teams_list(self):
        """Test retrieving list of teams"""
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_team(self):
        """Test creating a new team via API"""
        url = reverse('team-list')
        data = {
            'name': 'New Team',
            'description': 'A new test team'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Team.objects.count(), 2)


class ActivityAPITestCase(APITestCase):
    """Test cases for Activity API endpoints"""
    
    def setUp(self):
        self.user = User.objects.create(
            name='Activity Hero',
            email='activity@hero.com',
            team='Team Activity'
        )
        self.activity = Activity.objects.create(
            user_email='activity@hero.com',
            activity_type='Running',
            duration=45,
            calories=450,
            date=datetime.now()
        )
    
    def test_get_activities_list(self):
        """Test retrieving list of activities"""
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_activity(self):
        """Test creating a new activity via API"""
        url = reverse('activity-list')
        data = {
            'user_email': 'activity@hero.com',
            'activity_type': 'Cycling',
            'duration': 60,
            'calories': 600,
            'date': datetime.now().isoformat()
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Activity.objects.count(), 2)


class WorkoutAPITestCase(APITestCase):
    """Test cases for Workout API endpoints"""
    
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Test Workout',
            description='A test workout',
            category='Strength',
            difficulty='Beginner',
            estimated_calories=300,
            duration=30
        )
    
    def test_get_workouts_list(self):
        """Test retrieving list of workouts"""
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
    
    def test_create_workout(self):
        """Test creating a new workout via API"""
        url = reverse('workout-list')
        data = {
            'name': 'New Workout',
            'description': 'A new test workout',
            'category': 'Cardio',
            'difficulty': 'Intermediate',
            'estimated_calories': 500,
            'duration': 45
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workout.objects.count(), 2)


class LeaderboardAPITestCase(APITestCase):
    """Test cases for Leaderboard API endpoints"""
    
    def setUp(self):
        self.leaderboard_entry = Leaderboard.objects.create(
            user_email='leader@hero.com',
            user_name='Leader Hero',
            team='Team Leader',
            total_calories=5000,
            total_activities=50,
            rank=1
        )
    
    def test_get_leaderboard_list(self):
        """Test retrieving leaderboard"""
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['rank'], 1)
