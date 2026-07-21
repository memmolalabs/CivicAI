# CivicAI

CivicAI is an open-source browser extension for Google Chrome and Microsoft Edge that turns selected web text into a structured, editable civic report draft while keeping the user in control.

## Status

Current version: **`0.3.1` — Local AI consolidation**

CivicAI currently provides:

- Context-menu analysis of selected webpage text.
- A dedicated browser side panel.
- An interface available in:
  - English
  - Italian
  - Spanish
  - French
  - German
- Multilingual semantic classification performed locally in the browser.
- No API keys.
- No telemetry or analytics.
- No backend or remote database.
- No user account.
- No automatic submission or publication of reports.

## Installation

CivicAI offers two installation paths:

1. A complete ready-to-run release.
2. A reproducible installation from the source repository.

### Option 1 — Ready-to-run release

The easiest way to install CivicAI is to download the complete package from the official GitHub Release:

[Download CivicAI v0.3.1 ready-to-run](https://github.com/memmolalabs/CivicAI/releases/tag/v0.3.1)

1. Open the release page.
2. Expand the **Assets** section.
3. Download:

```text
CivicAI-v0.3.1-ready-to-run.zip
```

4. Extract the archive.
5. Open the browser extensions page:

For Google Chrome:

```text
chrome://extensions
```

For Microsoft Edge:

```text
edge://extensions
```

6. Enable **Developer mode**.
7. Select **Load unpacked**.
8. Choose the included:

```text
CivicAI-v0.3.1/extension
```

The ready-to-run archive already includes:

- **Transformers.js**
- **ONNX Runtime Web**
- The required single-threaded SIMD WASM runtime
- The quantized multilingual ONNX model

No PowerShell command, `npm install`, backend, API key, or additional model download is required.

> **Important:** GitHub’s automatically generated **Source code (zip)** and **Source code (tar.gz)** archives do not contain the local AI runtime and model assets. For immediate installation, download **`CivicAI-v0.3.1-ready-to-run.zip`** from the Release assets.

### Option 2 — Install from the source repository

Use this option to reproduce CivicAI from the public source code.

#### Requirements

- Google Chrome 116 or later.
- Microsoft Edge based on Chromium with support for `chrome.sidePanel.open()`.
- Windows PowerShell.
- An Internet connection during the initial asset preparation.

CivicAI does not require and does not execute:

```text
npm install
```

#### Source setup

1. Clone or download the source repository:

[github.com/memmolalabs/CivicAI](https://github.com/memmolalabs/CivicAI)

2. Open PowerShell in the project root.
3. Run:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\download-local-assets.ps1
```

4. Wait until the script confirms that all assets match the pinned SHA-256 values.
5. Open the browser extensions page:

```text
chrome://extensions
```

or:

```text
edge://extensions
```

6. Enable **Developer mode**.
7. Select **Load unpacked**.
8. Choose:

```text
extension
```

#### Asset verification

The setup script downloads only the assets documented in **`DEPENDENCIES.md`**.

Each asset is:

- Downloaded to a temporary file.
- Checked against its expected file size.
- Verified using a pinned SHA-256 hash.
- Moved into its final location only after successful verification.

Partial, empty, unexpected, corrupted, or mismatched files are rejected and removed.

The script generates:

```text
extension/lib/transformers.min.js
extension/lib/ort-wasm-simd.wasm
extension/models/paraphrase-multilingual-MiniLM-L12-v2/onnx/model_quantized.onnx
SHA256SUMS.local.txt
```

These generated JavaScript bundles, WASM files, ONNX models, and local checksum files are intentionally excluded from the main source repository.

## Usage

1. Select civic-related text on any webpage.
2. Right-click the selected text.
3. Choose **Analyze with CivicAI**.
4. Review the selected text in the side panel.
5. Press **Analyze**.
6. Review and edit the generated report before using it.

CivicAI can produce:

- An issue category.
- A semantic similarity score.
- An urgency estimate.
- A suggested public recipient.
- A list of potentially missing details.
- An editable civic report draft.

The selected input must contain:

- At least **10 characters**.
- No more than **5,000 characters**.

The first analysis may take longer because the local model and civic-category prototypes must be initialized.

## Local processing and privacy

During normal use:

- Selected text remains inside the browser extension’s private origin.
- The model and ONNX Runtime are loaded from local extension files.
- ONNX Runtime uses single-threaded SIMD WASM.
- CivicAI does not rely on `SharedArrayBuffer`.
- CivicAI does not rely on Blob workers.
- CivicAI does not require cross-origin isolation.
- Remote model loading is disabled through `env.allowRemoteModels`.
- The extension has no `host_permissions`.
- No external AI service is called.
- No telemetry, analytics, tracking, or user account is used.
- The selected text and normalized source hostname are stored locally only until the side panel consumes them.

If the side panel is never opened, the latest pending selection may remain in the extension’s local storage until it is:

- Replaced by another selection.
- Removed through Reset.
- Deleted with the extension’s local data.

See **`PRIVACY.md`** for the complete privacy documentation.

## Understanding the result

CivicAI compares the semantic embedding of the selected text with predefined examples of civic-issue categories.

The value displayed as a percentage is a **semantic similarity score**.

It is not:

- A calibrated probability.
- A factual verification.
- An official confidence rating.
- A legal assessment.
- A guarantee that the suggested authority is correct.

For long inputs, the tokenizer may truncate the text to the model’s maximum token limit for semantic classification.

The editable report draft still preserves the full text entered by the user.

## Limitations

CivicAI may misclassify text that is:

- Very short.
- Ambiguous.
- Negated.
- Sarcastic.
- Missing important context.
- Outside the supported civic categories.

CivicAI does not verify:

- Whether an event actually occurred.
- Who is responsible.
- The real level of urgency.
- Whether the suggested authority is legally competent.
- Whether a report complies with local procedures.

CivicAI does not replace:

- Emergency services.
- Official reporting channels.
- Legal advice.
- Professional advice.
- Human review.

Do not include unnecessary personal or sensitive information in the final report.

## Browser validation

CivicAI **v0.3.1** has been manually tested as an unpacked extension on:

- Google Chrome.
- Microsoft Edge.

The tested workflow included:

```text
Select webpage text
→ Open the context menu
→ Choose “Analyze with CivicAI”
→ Open the side panel
→ Run the local analysis
→ Review the generated result
```

The extension worked without requiring the webpage to be refreshed or the browser to be restarted.

## Use of AI systems during development

CivicAI was primarily designed and developed in ChatGPT with **GPT-5.6 Sol**.

GPT-5.6 Sol supported:

- Product architecture.
- Manifest V3 implementation.
- Local AI integration.
- Debugging.
- Privacy design.
- Browser testing.
- Documentation.
- Submission preparation.

**Codex** then performed an independent engineering audit and implemented the CivicAI **v0.3.1 technical consolidation**.

The Codex work included:

- Manifest V3 and ONNX Runtime compatibility improvements.
- Single-threaded local WASM configuration.
- Verified and reproducible asset provisioning.
- Immutable model revision and SHA-256 validation.
- Local-data retention minimization.
- Stale-result and race-condition protection.
- Model-loading retry handling.
- Input validation.
- Documentation alignment.
- Dependency and licensing review.
- Microsoft Edge functional validation.

This section documents the actual development process. It does not replace human review, browser testing, or independent source-code verification.

## Project structure

```text
CivicAI/
├── .gitignore
├── CONTRIBUTING.md
├── DEPENDENCIES.md
├── LICENSE
├── MODEL_CARD.md
├── PRIVACY.md
├── README.md
├── SECURITY.md
├── THIRD_PARTY_NOTICES.md
│
├── docs/
│   └── MVP.md
│
├── extension/
│   ├── background.js
│   ├── categories.js
│   ├── local-ai.js
│   ├── manifest.json
│   ├── sidepanel.css
│   ├── sidepanel.html
│   ├── sidepanel.js
│   │
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon32.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   │
│   ├── lib/
│   │   └── README.txt
│   │
│   ├── models/
│   │   └── paraphrase-multilingual-MiniLM-L12-v2/
│   │       ├── README.txt
│   │       ├── config.json
│   │       ├── special_tokens_map.json
│   │       ├── tokenizer.json
│   │       ├── tokenizer_config.json
│   │       └── unigram.json
│   │
│   └── _locales/
│       ├── de/
│       │   └── messages.json
│       ├── en/
│       │   └── messages.json
│       ├── es/
│       │   └── messages.json
│       ├── fr/
│       │   └── messages.json
│       └── it/
│           └── messages.json
│
├── THIRD_PARTY_LICENSES/
│   ├── MODEL_LICENSE.txt
│   ├── ONNXRUNTIME_LICENSE.txt
│   ├── ONNXRUNTIME_THIRD_PARTY_NOTICES.txt
│   └── TRANSFORMERS_JS_LICENSE.txt
│
└── tools/
    └── download-local-assets.ps1
```

The **`extension`** directory contains the unpacked Manifest V3 extension.

The **`tools`** directory contains the verified local-asset setup script.

Large runtime and model files are not stored in the main source branch.

## Security

CivicAI uses only the following browser permissions:

```text
contextMenus
storage
sidePanel
```

It does not request:

```text
tabs
activeTab
scripting
cookies
history
webRequest
host_permissions
```

Untrusted webpage text is rendered through safe text properties such as:

```text
value
textContent
```

The CivicAI application code does not intentionally use:

- `innerHTML`
- `eval`
- `new Function`
- Remote scripts
- Dynamic remote code
- External API calls

See **`SECURITY.md`** for more information.

## Dependencies

The project uses pinned versions of:

- **Transformers.js `2.17.2`**
- **ONNX Runtime Web `1.14.0`**
- **`Xenova/paraphrase-multilingual-MiniLM-L12-v2`**
- A quantized multilingual ONNX model from an immutable model revision

Exact asset revisions, sizes, and SHA-256 hashes are documented in:

- **`DEPENDENCIES.md`**
- **`MODEL_CARD.md`**
- **`THIRD_PARTY_NOTICES.md`**

## Licenses

The original CivicAI source code is released under the **MIT License**.

Third-party components and the multilingual model retain their respective licenses.

Complete license and notice information is available in:

```text
THIRD_PARTY_NOTICES.md
THIRD_PARTY_LICENSES/
```

## Links

### Source repository

[github.com/memmolalabs/CivicAI](https://github.com/memmolalabs/CivicAI)

### Ready-to-run release

[github.com/memmolalabs/CivicAI/releases/tag/v0.3.1](https://github.com/memmolalabs/CivicAI/releases/tag/v0.3.1)
