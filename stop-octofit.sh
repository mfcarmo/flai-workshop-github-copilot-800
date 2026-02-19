#!/bin/bash
# Stop script for OctoFit Tracker application

echo "🛑 Stopping OctoFit Tracker..."
echo ""

# Stop Django (port 8000)
if lsof -ti:8000 > /dev/null 2>&1; then
    echo "Stopping Django backend..."
    kill -9 $(lsof -ti:8000) 2>/dev/null
    echo "✓ Django stopped"
else
    echo "Django not running on port 8000"
fi

# Stop React (port 3000)
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "Stopping React frontend..."
    kill -9 $(lsof -ti:3000) 2>/dev/null
    echo "✓ React stopped"
else
    echo "React not running on port 3000"
fi

echo ""
echo "✅ OctoFit Tracker stopped!"
