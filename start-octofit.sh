#!/bin/bash
# Start script for OctoFit Tracker application

set -e

echo "🚀 Starting OctoFit Tracker..."
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "❌ MongoDB is not running!"
    echo "Start MongoDB first with: mongod --dbpath /data/db --fork --logpath /tmp/mongod.log"
    exit 1
fi
echo "✓ MongoDB is running"

# Check if ports are free
if lsof -ti:8000 > /dev/null 2>&1; then
    echo "❌ Port 8000 is already in use!"
    echo "Kill the process with: kill -9 \$(lsof -ti:8000)"
    exit 1
fi
echo "✓ Port 8000 is available"

if lsof -ti:3000 > /dev/null 2>&1; then
    echo "❌ Port 3000 is already in use!"
    echo "Kill the process with: kill -9 \$(lsof -ti:3000)"
    exit 1
fi
echo "✓ Port 3000 is available"

# Get workspace directory
WORKSPACE_DIR="/workspaces/flai-workshop-github-copilot-800"
BACKEND_DIR="$WORKSPACE_DIR/octofit-tracker/backend"
FRONTEND_DIR="$WORKSPACE_DIR/octofit-tracker/frontend"

echo ""
echo "📦 Starting Django backend on port 8000..."
cd "$BACKEND_DIR"
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000 > /tmp/django.log 2>&1 &
DJANGO_PID=$!
echo "✓ Django started (PID: $DJANGO_PID)"

# Wait a bit for Django to start
sleep 2

echo ""
echo "⚛️  Starting React frontend on port 3000..."
cd "$FRONTEND_DIR"
npm start > /tmp/react.log 2>&1 &
REACT_PID=$!
echo "✓ React started (PID: $REACT_PID)"

echo ""
echo "✅ OctoFit Tracker is running!"
echo ""
echo "📍 Backend API:  http://localhost:8000/api/"
echo "📍 Frontend App: http://localhost:3000/"
echo ""
echo "📝 Logs:"
echo "   Django:  tail -f /tmp/django.log"
echo "   React:   tail -f /tmp/react.log"
echo ""
echo "🛑 To stop:"
echo "   kill $DJANGO_PID $REACT_PID"
echo ""
