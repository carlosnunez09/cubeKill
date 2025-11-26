#!/bin/bash
# Cube Hell - Quick Install Script

echo "🎮 Installing Cube Hell Multiplayer..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Clone repository
echo "📦 Cloning repository..."
git clone https://github.com/carlosnunez09/cubeKill.git
cd cubeKill

# Install dependencies
echo "⚙️  Installing dependencies..."
npm install

# Start server
echo "🚀 Starting server..."
echo ""
echo "✅ Cube Hell is running!"
echo "🌐 Open http://localhost:3000 in your browser"
echo ""
npm start
