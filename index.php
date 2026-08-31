<?php /* JSON Formatter — validation handled client-side */ ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Formatter</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header>
    <h1>JSON Formatter</h1>
    <span>— validate &amp; beautify</span>
</header>

<div class="workspace">
    <!-- Left Panel -->
    <div class="panel">
        <div class="panel-header">
            <div class="dot"></div>
            Input
            <button class="panel-btn" id="uploadBtn" title="Upload JSON file">
                &#8593; Upload
            </button>
            <input type="file" id="fileInput" accept=".json,application/json" style="display:none">
        </div>
        <textarea id="inputArea" placeholder="Paste your JSON here…" spellcheck="false"></textarea>
    </div>

    <!-- Middle Action Column -->
    <div class="action-col">
        <div class="action-col-inner">
            <button class="secondary-btn" id="validateOnlyBtn" title="Validate JSON only">
                Validate
            </button>
            <button class="validate-btn" id="validateBtn" title="Format / Beautify JSON (Ctrl+Enter)">
                Format / Beautify
            </button>
            <button class="minify-btn" id="minifyBtn" title="Minify / Compact JSON">
                Minify / Compact
            </button>
        </div>
    </div>

    <!-- Right Panel -->
    <div class="panel">
        <div class="panel-header">
            <div class="dot" id="outputDot"></div>
            Output
            <button class="panel-btn" id="downloadBtn" title="Download formatted JSON" disabled>
                &#8595; Download
            </button>
        </div>
        <div class="output idle" id="outputArea">Result will appear here after validation.</div>
    </div>
</div>

<div class="statusbar">
    <div class="status-item">
        <div class="status-dot" id="statusDot"></div>
        <span id="statusText">Ready</span>
    </div>
    <div class="status-item">
        <span id="charCount">0 chars</span>
    </div>
</div>

<script src="app.js"></script>

</body>
</html>
