/**
 * build.js — Cross-platform build script for Render
 * Uses Node.js child_process to handle spaces in paths safely.
 * Works on both Windows and Linux without CRLF issues.
 */
const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

const ROOT     = __dirname;
const SERVER   = path.join(ROOT, 'server');
const REACT    = path.join(ROOT, 'Elite Travel Agency');
const DIST     = path.join(REACT, 'dist');

function run(cmd, cwd) {
    console.log(`\n> ${cmd}  (in: ${cwd})`);
    execSync(cmd, { cwd, stdio: 'inherit' });
}

console.log('\n========================================');
console.log(' Elite Travel Agency — Build Script');
console.log('========================================');

// 1. Install server dependencies
console.log('\n[1/3] Installing server dependencies...');
run('npm install', SERVER);

// 2. Install React dependencies
console.log('\n[2/3] Installing React dependencies...');
run('npm install', REACT);

// 3. Build React app
console.log('\n[3/3] Building React app...');
run('npm run build', REACT);

// 4. Verify output
if (!fs.existsSync(DIST)) {
    console.error('\n✗ BUILD FAILED — dist/ was not created.');
    process.exit(1);
}

const files = fs.readdirSync(DIST);
console.log('\n✓ dist/ created with files:', files);
console.log('\n========================================');
console.log(' Build complete ✓');
console.log('========================================\n');
