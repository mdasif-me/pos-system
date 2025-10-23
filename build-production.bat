@echo off
REM Production Build Script for POS System (Windows)
REM This script builds the application for all platforms

echo 🚀 Starting POS System Production Build...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if pnpm is installed
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pnpm is not installed. Please install pnpm first.
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
pnpm install

REM Build React app
echo ⚛️  Building React application...
pnpm run build

if %errorlevel% neq 0 (
    echo ❌ React build failed!
    exit /b 1
)

REM Build Electron apps
echo 🖥️  Building Electron applications...

REM Build for current platform
echo Building for current platform...
pnpm run build-electron

REM Uncomment the following lines to build for all platforms
REM echo Building for macOS...
REM pnpm run build-mac

REM echo Building for Windows...
REM pnpm run build-win

REM echo Building for Linux...
REM pnpm run build-linux

echo ✅ Build completed successfully!
echo 📁 Built applications can be found in the 'dist' directory.
pause