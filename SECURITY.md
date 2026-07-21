# Security Policy

## Segnalare una vulnerabilità

Non pubblicare in issue aperte credenziali, dati personali o dettagli di exploit immediatamente utilizzabili. Usare inizialmente un canale privato indicato dal maintainer e coordinare la divulgazione.

## Proprietà di sicurezza v0.3.1

- nessuna chiave, token o credenziale nel codice;
- nessuna telemetria o chiamata AI remota;
- nessun host permission o content script;
- testo non attendibile reso tramite `textContent` o `value`, mai come HTML;
- nessun `innerHTML`, `eval`, `new Function` o codice remoto nel codice applicativo CivicAI;
- CSP MV3 limitata a script locali e `wasm-unsafe-eval` necessario a WebAssembly;
- ONNX Runtime configurato con `numThreads = 1`, SIMD abilitato e proxy disabilitato;
- nessuna dipendenza da `SharedArrayBuffer`, cross-origin isolation o worker Blob;
- asset scaricati in file temporanei e accettati solo dopo controllo di dimensione e SHA-256;
- selezioni rimosse dallo storage locale dopo il consumo del pannello.

Il bundle di terze parti Transformers.js incorpora codice di compatibilità generico, incluso codice non usato nel percorso CivicAI. La CSP MV3 rimane l’autorità di esecuzione; qualsiasi aggiornamento del bundle deve essere riesaminato e mantenere gli hash fissati.

## Dati e asset da non committare

- `.env`, chiavi, certificati, password e token;
- dump, log o percorsi personali;
- modelli ONNX, bundle runtime, file WASM e `SHA256SUMS.local.txt` generati dallo script.

## Limiti

L’elaborazione locale riduce l’esposizione dei dati ma non protegge da un dispositivo compromesso, da estensioni/browser non affidabili o da asset installati al di fuori dello script verificato.
