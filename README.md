# CivicAI

CivicAI è un’estensione open source per Chrome ed Edge che trasforma testo selezionato sul web in una bozza di segnalazione civica strutturata, modificabile e controllata dall’utente.

## Stato

Versione `0.3.1` — Local AI consolidation.

- menu contestuale sul testo selezionato;
- pannello laterale;
- interfaccia in English, Italiano, Español, Français e Deutsch;
- classificazione semantica multilingue eseguita nel browser;
- nessuna API, chiave, telemetria, backend, account o database remoto;
- nessun invio o pubblicazione automatica.

## Requisiti

- Google Chrome 116 o successivo;
- Microsoft Edge basato su Chromium con supporto a `chrome.sidePanel.open()`;
- Windows PowerShell per lo script di preparazione degli asset;
- connessione Internet soltanto durante la preparazione iniziale degli asset.

Non è richiesto e non viene eseguito `npm install`.

## Installazione

1. Scaricare o clonare il repository con la struttura documentata.
2. Dalla cartella principale eseguire:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\download-local-assets.ps1
```

3. Aprire `chrome://extensions` oppure `edge://extensions`.
4. Attivare **Modalità sviluppatore**.
5. Selezionare **Carica estensione non pacchettizzata**.
6. Scegliere la cartella `extension`.

Lo script scarica esclusivamente gli asset elencati in `DEPENDENCIES.md`, li scrive prima in file temporanei, verifica dimensione e SHA-256 e solo dopo li installa. Asset parziali, vuoti, inattesi o corrotti vengono rifiutati. `SHA256SUMS.local.txt` registra gli hash verificati locali.

I bundle JavaScript, i file WASM, i modelli ONNX e `SHA256SUMS.local.txt` sono asset generati locali e non devono essere committati.

## Utilizzo

1. Selezionare un testo in una pagina web.
2. Fare clic con il tasto destro e scegliere **Analizza con CivicAI**.
3. Controllare il testo nel pannello laterale.
4. Premere **Analizza**.
5. Verificare e modificare la bozza prima di usarla.

Il testo deve contenere almeno 10 e non più di 5.000 caratteri. La prima analisi può richiedere più tempo per l’inizializzazione del modello e dei prototipi locali.

## Elaborazione locale e privacy

Durante l’utilizzo:

- il testo selezionato resta nell’origine privata dell’estensione;
- il modello e ONNX Runtime vengono caricati dai file locali dell’estensione;
- ONNX Runtime usa WASM SIMD a thread singolo, senza `SharedArrayBuffer`, worker Blob o cross-origin isolation;
- `env.allowRemoteModels` è disattivato;
- non esistono host permissions o chiamate a servizi AI esterni;
- dominio sorgente e selezione vengono conservati nello storage locale soltanto fino al consumo da parte del pannello.

Dettagli completi in `PRIVACY.md`.

## Interpretazione del risultato

CivicAI confronta l’embedding del testo con esempi di categorie civiche. Il valore mostrato come percentuale è una **similarità semantica**, non una probabilità calibrata, una verifica dei fatti o una misura ufficiale di affidabilità. Testi lunghi possono essere troncati dal tokenizer al limite del modello per il solo confronto semantico; la bozza conserva il testo inserito.

## Limiti

CivicAI può classificare male testi brevi, ambigui, negati o fuori dalle categorie disponibili. Non verifica fatti, responsabilità, urgenza reale o autorità competente e non sostituisce servizi di emergenza, canali ufficiali o consulenza professionale.

Non inserire dati personali o sensibili non necessari nella bozza finale.

## Uso di sistemi AI nello sviluppo

GPT-5.6 Sol è stato usato per l’architettura primaria, l’implementazione, il debugging, la progettazione privacy, i test e la preparazione alla submission.

Codex ha svolto l’audit finale indipendente e ha implementato la consolidazione tecnica v0.3.1, comprendente compatibilità Manifest V3/ONNX Runtime, setup verificato degli asset, minimizzazione della retention, protezioni da race condition e allineamento documentale.

Questa descrizione documenta il processo di sviluppo; non sostituisce revisione umana, test browser o verifica indipendente del codice.

## Licenze

Il codice originale CivicAI è MIT. Modello e componenti di terze parti conservano le proprie licenze, riportate in `THIRD_PARTY_NOTICES.md` e `THIRD_PARTY_LICENSES/`.
