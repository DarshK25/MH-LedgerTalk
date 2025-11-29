#!/bin/bash

echo "🚀 LedgerTalk Setup Script"
echo "=========================="
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from .env.local.example..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo ""
    echo "⚠️  IMPORTANT: You need to update .env.local with your actual Clerk API keys"
    echo "   1. Go to https://clerk.com and create an account"
    echo "   2. Create a new application"
    echo "   3. Copy your API keys from the Clerk Dashboard"
    echo "   4. Update the keys in .env.local"
    echo ""
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ Dependencies already installed"
else
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Clerk API keys (see CLERK_SETUP.md)"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Visit http://localhost:3000"
echo ""
