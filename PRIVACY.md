# Privacy

CivicAI v0.3.1 is designed with a local-first approach and no backend.

## Processed Data

CivicAI receives the text the user voluntarily selects via the context menu. The background temporarily saves only:

- the selected text;
- the domain name of the page, without path, query string, fragment, or title.

Each selection uses a unique temporary key in `chrome.storage.local`. The key includes a technical timestamp to correctly sort competing selections; it does not contain URLs or titles. Before saving a new selection, the background deletes any older pending selections. The panel removes the key after consuming its contents, and Reset removes any residuals. If the panel fails to open or is stopped before consumption, the last selection may remain in local storage until the next selection, consumption, Reset, or the extension's data is cleared.

Visible text and edited drafts in the panel are not added to an application history.

## Transmissions and Network

During analysis:

- text, embeddings, and results remain in the browser;
- no data is sent to APIs, AI servers, or external services;
- there are no backends, accounts, telemetry, analytics, or automatic publishing;
- the manifest does not require host permissions;
- remote model uploading is disabled.

The `tools/download-local-assets.ps1` script uses the Internet only during explicit asset preparation and does not receive selected text or usage data.

## Permissions

- `contextMenus`: receives the selection only after explicit user action;
- `storage`: temporarily transfers selection and domain to the panel;
- `sidePanel`: displays the interface.

## User Responsibilities

Before using or submitting a draft, the user must review it and remove any unnecessary personal or sensitive data.

