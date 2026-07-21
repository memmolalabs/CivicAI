# CivicAI v0.3.1 — Local AI consolidation

## Flusso verificabile

1. Selezione volontaria di un testo.
2. Menu contestuale **Analizza con CivicAI**.
3. Trasferimento temporaneo di testo e solo dominio tramite storage locale.
4. Consumo e rimozione della selezione pendente nel pannello laterale.
5. Analisi locale con Transformers.js, ONNX Runtime Web e WASM SIMD single-threaded.
6. Classificazione indicativa e bozza deterministica modificabile.
7. Copia manuale dopo revisione dell’utente.

## Garanzie architetturali

- nessun backend, account, token, telemetria o cloud inference;
- nessun host permission o scansione automatica delle pagine;
- nessun `SharedArrayBuffer`, cross-origin isolation o worker Blob;
- asset fissati e verificati prima dell’installazione;
- risultati asincroni scartati quando cambia il testo sorgente.

## Fuori ambito

- scraping, feed monitoring o geolocalizzazione invisibile;
- invio automatico a enti, PEC o social network;
- verifica fattuale, legale o dell’urgenza;
- acquisizione automatica di immagini;
- profilazione o cronologia remota.
