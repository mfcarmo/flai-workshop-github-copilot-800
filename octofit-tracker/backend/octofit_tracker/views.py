from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from octofit_tracker.serializers import (
    UserSerializer, 
    TeamSerializer, 
    ActivitySerializer, 
    LeaderboardSerializer, 
    WorkoutSerializer
)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing users.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=False, methods=['get'])
    def by_team(self, request):
        """Get users filtered by team."""
        team = request.query_params.get('team', None)
        if team:
            users = User.objects.filter(team=team)
            serializer = self.get_serializer(users, many=True)
            return Response(serializer.data)
        return Response({'error': 'Team parameter required'}, status=400)


class TeamViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing teams.
    """
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing activities.
    """
    queryset = Activity.objects.all().order_by('-date')
    serializer_class = ActivitySerializer
    
    @action(detail=False, methods=['get'])
    def by_user(self, request):
        """Get activities for a specific user."""
        email = request.query_params.get('email', None)
        if email:
            activities = Activity.objects.filter(user_email=email).order_by('-date')
            serializer = self.get_serializer(activities, many=True)
            return Response(serializer.data)
        return Response({'error': 'Email parameter required'}, status=400)


class LeaderboardViewSet(viewsets.ModelViewSet):
    """
    API endpoint for viewing leaderboard.
    """
    queryset = Leaderboard.objects.all().order_by('rank')
    serializer_class = LeaderboardSerializer
    
    @action(detail=False, methods=['get'])
    def by_team(self, request):
        """Get leaderboard filtered by team."""
        team = request.query_params.get('team', None)
        if team:
            leaderboard = Leaderboard.objects.filter(team=team).order_by('rank')
            serializer = self.get_serializer(leaderboard, many=True)
            return Response(serializer.data)
        return Response({'error': 'Team parameter required'}, status=400)


class WorkoutViewSet(viewsets.ModelViewSet):
    """
    API endpoint for managing workouts.
    """
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
    
    @action(detail=False, methods=['get'])
    def by_difficulty(self, request):
        """Get workouts filtered by difficulty."""
        difficulty = request.query_params.get('difficulty', None)
        if difficulty:
            workouts = Workout.objects.filter(difficulty=difficulty)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({'error': 'Difficulty parameter required'}, status=400)
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        """Get workouts filtered by category."""
        category = request.query_params.get('category', None)
        if category:
            workouts = Workout.objects.filter(category=category)
            serializer = self.get_serializer(workouts, many=True)
            return Response(serializer.data)
        return Response({'error': 'Category parameter required'}, status=400)
