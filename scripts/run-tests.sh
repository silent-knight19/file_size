#!/bin/bash
set -e

# Navigate to project root
cd "$(dirname "$0")/.."

echo "========================================="
echo " Running Automated Vitest Test Suite"
echo "========================================="
echo ""

npx vitest run

