#!/bin/bash

# Production Build Script for POS System
# This script builds the application for all platforms

echo "🚀 Starting POS System Production Build..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build React app
echo "⚛️  Building React application..."
pnpm run build

if [ $? -ne 0 ]; then
    echo "❌ React build failed!"
    exit 1
fi

# Build Electron apps for all platforms
echo "🖥️  Building Electron applications..."

# Build for current platform
echo "Building for current platform..."
pnpm run build-electron

# Uncomment the following lines to build for all platforms
# echo "Building for macOS..."
# pnpm run build-mac

# echo "Building for Windows..."
# pnpm run build-win

# echo "Building for Linux..."
# pnpm run build-linux

echo "✅ Build completed successfully!"
echo "📁 Built applications can be found in the 'dist' directory."