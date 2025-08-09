#!/bin/bash

# Kill processes running on development ports
# Usage: ./kill-ports.sh

echo "🔍 Checking for processes on development ports..."

# Check port 3000 (React frontend)
PID_3000=$(lsof -ti:3000)
if [ ! -z "$PID_3000" ]; then
    echo "❌ Killing process on port 3000: $PID_3000"
    kill -9 $PID_3000
    echo "✅ Port 3000 freed"
else
    echo "✅ Port 3000 is already free"
fi

# Check port 4000 (Backend server)
PID_4000=$(lsof -ti:4000)
if [ ! -z "$PID_4000" ]; then
    echo "❌ Killing process on port 4000: $PID_4000"
    kill -9 $PID_4000
    echo "✅ Port 4000 freed"
else
    echo "✅ Port 4000 is already free"
fi

echo ""
echo "🎉 All development ports are now free!"
echo "You can now run: npm run dev"
