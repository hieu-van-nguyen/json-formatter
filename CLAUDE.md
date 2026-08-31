# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Summary

PHP web app that validates and beautifies JSON text. PHP serves the HTML page; all validation and formatting runs client-side via native browser `JSON.parse` / `JSON.stringify` — no Composer dependencies, no AJAX calls, no build step.

## Running Locally

```bash
php -S localhost:8080 -t /path/to/json-formatter
```

Requires PHP 8.1+. Open `http://localhost:8080` in a browser.

## Architecture

Three files, each with a single responsibility:

| File | Role |
|------|------|
| `index.php` | HTML structure only — no PHP logic beyond serving the page |
| `style.css` | All styles (CSS Grid layout, dark theme, status indicators) |
| `app.js` | All client-side logic — validation, output rendering, keyboard shortcut |

### Layout

Three-column CSS Grid: left textarea (input) → center validate button → right output panel.

### JS Logic (`app.js`)

- `validate()` — runs `JSON.parse` on the textarea content
  - Success: calls `JSON.stringify(parsed, null, 2)` and renders green in the right panel
  - Failure: renders the native parse error message in red
- Triggered by button click or `Ctrl+Enter` / `Cmd+Enter`

## Key Design Decisions

- **No server round-trip for validation** — avoids PHP output contamination issues with JSON responses.
- **No external dependencies** — no Composer, no npm, no build step.
- If server-side validation is added in the future (e.g., JSON Schema via `justinrainbow/json-schema`), use `ob_end_clean()` and `ini_set('display_errors', 0)` before emitting any JSON response to prevent stray PHP output corrupting the payload.
