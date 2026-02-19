from rest_framework import serializers
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['_id', 'name', 'email', 'team', 'created_at']
        read_only_fields = ['_id', 'created_at']


class TeamSerializer(serializers.ModelSerializer):
    member_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ['_id', 'name', 'description', 'created_at', 'member_count']
        read_only_fields = ['_id', 'created_at']
    
    def get_member_count(self, obj):
        """Calculate the number of members in this team."""
        return User.objects.filter(team=obj.name).count()


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['_id', 'user_email', 'activity_type', 'duration', 'calories', 'date']
        read_only_fields = ['_id']


class LeaderboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leaderboard
        fields = ['_id', 'user_email', 'user_name', 'team', 'total_calories', 'total_activities', 'rank']
        read_only_fields = ['_id']


class WorkoutSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workout
        fields = ['_id', 'name', 'description', 'category', 'difficulty', 'estimated_calories', 'duration']
        read_only_fields = ['_id']
