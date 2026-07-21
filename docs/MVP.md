# CivicAI v0.3.1 — Local AI consolidation

## Verifiable flow

1. Voluntary text selection.
2. Context menu **Analyze with CivicAI**.
3. Temporary transfer of text and domain only via local storage.
4. Consumption and removal of pending selection in the side panel.
5. Local analysis with Transformers.js, ONNX Web Runtime, and single-threaded WASM SIMD.
6. Indicative classification and editable deterministic draft.
7. Manual copy after user review.

## Architectural guarantees

- no backend, accounts, tokens, telemetry, or cloud inference;
- no host permission or automatic page crawling;
- no `SharedArrayBuffer`, cross-origin isolation, or worker Blobs;
- assets fixed and verified before installation;
- asynchronous results discarded when the source text changes.

## Out of scope

- scraping, feed monitoring, or invisible geolocation;
- automatic sending to agencies, certified emails, or social networks;
- factual, legal, or urgency verification;
- automatic image acquisition;
- profiling or remote history.
