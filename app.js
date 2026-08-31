const inputArea       = document.getElementById('inputArea');
const outputArea      = document.getElementById('outputArea');
const validateBtn     = document.getElementById('validateBtn');
const validateOnlyBtn = document.getElementById('validateOnlyBtn');
const minifyBtn       = document.getElementById('minifyBtn');
const uploadBtn       = document.getElementById('uploadBtn');
const fileInput       = document.getElementById('fileInput');
const downloadBtn     = document.getElementById('downloadBtn');
const statusDot       = document.getElementById('statusDot');
const statusText      = document.getElementById('statusText');
const outputDot       = document.getElementById('outputDot');
const charCount       = document.getElementById('charCount');

inputArea.addEventListener('input', () => {
    charCount.textContent = inputArea.value.length.toLocaleString() + ' chars';
});

function validate() {
    const raw = inputArea.value;

    if (!raw.trim()) {
        setOutput(false, 'Nothing to validate — paste some JSON first.');
        return;
    }

    try {
        const parsed = JSON.parse(raw);
        const pretty = JSON.stringify(parsed, null, 2);
        setOutput(true, pretty);
        setStatus('ok', 'Valid JSON');
    } catch (e) {
        setOutput(false, e.message);
        setStatus('err', 'Invalid JSON');
    }
}

function setOutput(success, text) {
    outputArea.className = 'output ' + (success ? 'success' : 'error');
    outputArea.textContent = text;
    outputDot.style.background = success ? '#4ade80' : '#f87171';
    downloadBtn.disabled = !success;
}

function setStatus(state, text) {
    statusDot.className = 'status-dot' + (state === 'ok' ? ' ok' : state === 'err' ? ' err' : '');
    statusText.textContent = text;
}

// Validate only — show valid/invalid result without formatting
validateOnlyBtn.addEventListener('click', () => {
    const raw = inputArea.value;
    if (!raw.trim()) {
        setOutput(false, 'Input is empty.');
        setStatus('err', 'Nothing to validate');
        return;
    }
    try {
        JSON.parse(raw);
        setOutput(true, '✓ Valid JSON');
        setStatus('ok', 'Valid JSON');
    } catch (e) {
        setOutput(false, e.message);
        setStatus('err', 'Invalid JSON');
    }
});

validateBtn.addEventListener('click', () => validate());

// Minify / Compact
minifyBtn.addEventListener('click', () => {
    const raw = inputArea.value;
    if (!raw.trim()) {
        setOutput(false, 'Input is empty.');
        setStatus('err', 'Nothing to minify');
        return;
    }
    try {
        const parsed = JSON.parse(raw);
        const minified = JSON.stringify(parsed);
        setOutput(true, minified);
        setStatus('ok', 'Minified');
    } catch (e) {
        setOutput(false, e.message);
        setStatus('err', 'Invalid JSON');
    }
});

// Ctrl+Enter shortcut
inputArea.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        validate();
    }
});

// Upload
uploadBtn.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        inputArea.value = e.target.result;
        charCount.textContent = inputArea.value.length.toLocaleString() + ' chars';
        checkValidity();
        setStatus('neutral', 'File loaded');
    };
    reader.readAsText(file);
    fileInput.value = '';
});

// Download
downloadBtn.addEventListener('click', () => {
    const content = outputArea.textContent;
    if (!content || outputArea.classList.contains('idle') || outputArea.classList.contains('error')) return;
    const blob = new Blob([content], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'formatted.json';
    a.click();
    URL.revokeObjectURL(url);
});
