from django.contrib import admin
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'team', 'created_at']
    list_filter = ['team', 'created_at']
    search_fields = ['name', 'email']
    ordering = ['-created_at']


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name', 'description']
    ordering = ['-created_at']


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ['user_email', 'activity_type', 'duration', 'calories', 'date']
    list_filter = ['activity_type', 'date']
    search_fields = ['user_email', 'activity_type']
    ordering = ['-date']


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ['rank', 'user_name', 'team', 'total_calories', 'total_activities']
    list_filter = ['team']
    search_fields = ['user_name', 'user_email']
    ordering = ['rank']


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'difficulty', 'estimated_calories', 'duration']
    list_filter = ['category', 'difficulty']
    search_fields = ['name', 'description', 'category']
    ordering = ['name']
