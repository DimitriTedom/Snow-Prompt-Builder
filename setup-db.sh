#!/bin/bash

echo "🔄 Setting up database with Prisma..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "📋 Please copy .env.template to .env.local and fill in your values:"
    echo "   cp .env.template .env.local"
    exit 1
fi

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "📤 Pushing schema to database..."
npx prisma db push

echo "✅ Database setup complete!"
echo "🚀 You can now run: npm run dev"
echo "📊 To view your data: npm run db:studio"