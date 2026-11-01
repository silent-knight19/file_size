#!/bin/bash
set -e

# Navigate to project root
cd "$(dirname "$0")/.."

echo "========================================="
echo " Starting File Manager Application"
echo " Local URL: http://localhost:5173"
echo "========================================="
echo ""

# Start Vite dev server without auto-opening a browser
npx vite --no-open
