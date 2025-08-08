#!/bin/bash

# Pedia-Dose PWA Deployment Script for Vercel

echo "🚀 Starting Pedia-Dose PWA Deployment..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building the project..."
npm run build

# Run linting
echo "🔍 Running code quality checks..."
npm run lint

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📱 Your PWA is now live and ready for installation!"