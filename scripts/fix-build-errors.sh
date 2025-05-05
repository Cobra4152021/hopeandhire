#!/bin/bash

echo "Applying fixes to bypass TypeScript errors..."

# Run the script to replace sidebar imports
node scripts/replace-sidebar-imports.js

echo "Done applying fixes."
echo "Now try building the project again with:"
echo "pnpm build"
