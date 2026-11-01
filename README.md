# File Size Format Fix

A lightweight React file management application demonstrating file listing and human-readable file size formatting.

## Overview

The application displays a clean file manager interface with a sidebar and a table listing files along with their names, types, modification dates, and formatted file sizes.

Sample files are located in the `sample-files/` directory with exact byte sizes:
- `Meeting Notes.docx` (512 bytes)
- `Project Report.pdf` (1,024 bytes)
- `Design Assets.zip` (1,048,576 bytes)
- `Backup Archive.tar` (1,572,864 bytes)

## Known Bug

The file size formatting utility in [`src/utils/formatFileSize.js`](src/utils/formatFileSize.js) currently uses decimal base division (`1000`) instead of binary base division (`1024`), while keeping binary thresholds.

As a result:
- `1,024 bytes` displays as `1.02 KB` instead of `1.00 KB`
- `1,048,576 bytes` displays as `1.05 MB` instead of `1.00 MB`
- `1,572,864 bytes` displays as `1.57 MB` instead of `1.50 MB`

### Bug Location & Fix

In [`src/utils/formatFileSize.js`](src/utils/formatFileSize.js), locate the divisor definition:

```javascript
const divisor = 1000;
```

Change `1000` to `1024`:

```javascript
const divisor = 1024;
```

## Helper Scripts

Executable helper scripts are provided in the `scripts/` directory:

### 1. Start Application
```bash
./scripts/start-app.sh
```
Starts the Vite development server at [http://localhost:5173](http://localhost:5173) without auto-opening a browser.

### 2. Run Tests
```bash
./scripts/run-tests.sh
```
Executes the Vitest test suite and displays clear test results.

## Setup & Manual Commands

Dependencies are already installed. If needed:
```bash
npm install
npm test
npm run dev
```

