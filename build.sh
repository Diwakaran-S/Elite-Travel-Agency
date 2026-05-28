#!/bin/bash
# Render build script — runs from repo root
set -e  # Exit immediately on any error

echo "========================================"
echo " Elite Travel Agency — Render Build"
echo "========================================"

echo ""
echo "--- [1/3] Installing server dependencies ---"
npm install --prefix server
echo "✓ Server dependencies installed"

echo ""
echo "--- [2/3] Installing React dependencies ---"
cd "Elite Travel Agency"
npm install
echo "✓ React dependencies installed"

echo ""
echo "--- [3/3] Building React app ---"
npm run build
echo "✓ React app built"

cd ..

echo ""
echo "--- Build verification ---"
if [ -d "Elite Travel Agency/dist" ]; then
  echo "✓ dist/ folder exists"
  ls -la "Elite Travel Agency/dist/"
else
  echo "✗ ERROR: dist/ folder was NOT created. Build failed."
  exit 1
fi

echo ""
echo "========================================"
echo " Build complete ✓"
echo "========================================"
