# json-formatter

A lightweight PHP web application to validate and beautify JSON text.

## Features

- Paste raw JSON into the left panel
- Click **Validate** (or press `Ctrl+Enter` / `Cmd+Enter`) to instantly validate
- Valid JSON → pretty-printed output in the right panel
- Invalid JSON → error message with parse details
- Char count shown in the status bar

## How It Works

Validation and beautification run entirely in the browser via the native `JSON.parse` / `JSON.stringify` APIs — no server round-trip required. PHP serves the page only.

## Running Locally

Requires PHP 8.1+.

```bash
php -S localhost:8080 -t /path/to/json-formatter
```

Then open [http://localhost:8080](http://localhost:8080).

## Project Structure

```
json-formatter/
├── index.php   # HTML structure
├── style.css   # All styles
└── app.js      # Validation and UI logic
```
