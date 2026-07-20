# CivicAI

CivicAI è un'estensione open source per Chrome ed Edge che trasforma un testo selezionato sul web in una bozza di segnalazione civica strutturata, modificabile e controllata dall'utente.

## Stato

Versione iniziale `0.1.0`: MVP locale.

- menu contestuale sul testo selezionato;
- pannello laterale;
- classificazione e bozza modificabile;
- modalità demo senza API;
- modalità OpenAI opzionale attraverso un server locale;
- nessuna pubblicazione o trasmissione automatica verso enti o social network.

## Avvio rapido

### 1. Avviare il server

Richiede Node.js 20 o successivo, ma non richiede `npm install`.

```powershell
cd server
Copy-Item .env.example .env
node server.js
```

La modalità iniziale `DEMO_MODE=true` non usa una chiave API e non effettua richieste esterne.

### 2. Caricare l'estensione

1. Aprire `chrome://extensions` oppure `edge://extensions`.
2. Attivare **Modalità sviluppatore**.
3. Scegliere **Carica estensione non pacchettizzata**.
4. Selezionare la cartella `extension`.
5. Selezionare un testo in una pagina.
6. Clic destro → **Analizza con CivicAI**.

### Modalità OpenAI

Nel file `server/.env`:

```env
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
DEMO_MODE=false
```

La chiave resta nel server locale e non viene inserita nell'estensione.

## Principi

- controllo umano prima di ogni utilizzo;
- minimizzazione dei dati;
- nessun database nel MVP;
- nessuna raccolta di account, nomi, immagini o cronologia;
- nessuna scansione automatica delle pagine;
- codice aperto e verificabile.

## Limiti

CivicAI genera una bozza e non verifica la veridicità dei contenuti. Non sostituisce i canali di emergenza, le autorità competenti o una consulenza legale.

## Licenza

MIT.

## Localizzazione automatica

La versione 0.2.0 rileva la lingua dell'interfaccia del browser tramite `chrome.i18n`.

Lingue incluse:

- English, fallback predefinito
- Italiano
- Español
- Français
- Deutsch

L'interfaccia, il menu contestuale, gli esempi e i risultati della modalità demo seguono automaticamente la lingua del browser. In modalità OpenAI, la lingua e il locale vengono inviati al server insieme al testo selezionato.


## Versione 0.3.0 – Local AI

Questa versione elimina il server locale e non usa API, chiavi o npm.

Prima di caricare l'estensione, eseguire una sola volta:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\download-local-assets.ps1
```

Lo script scarica file con versioni fissate e crea `SHA256SUMS.local.txt`.
Durante l'utilizzo, il caricamento remoto dei modelli è disattivato.

Il modello locale confronta il testo selezionato con esempi multilingue di categorie civiche. La bozza finale resta deterministica e modificabile.
