# CivicAI

CivicAI è un’estensione open source per Chrome ed Edge che trasforma un testo selezionato sul web in una bozza di segnalazione civica strutturata, modificabile e controllata dall’utente.

## Stato

Versione `0.3.0` — Local AI.

- menu contestuale sul testo selezionato;
- pannello laterale;
- interfaccia localizzata automaticamente;
- classificazione civica multilingue eseguita localmente;
- bozza deterministica, modificabile e sempre sottoposta al controllo dell’utente;
- nessuna API, chiave, telemetria, backend o database;
- nessuna pubblicazione o trasmissione automatica verso enti, social network o servizi esterni.

## Requisiti

- Chrome o Microsoft Edge con supporto a Manifest V3 e Side Panel;
- Windows PowerShell per lo script di preparazione degli asset locali;
- connessione a Internet necessaria soltanto durante il download iniziale degli asset.

Non è richiesto `npm install`.

## Installazione

1. Scaricare o clonare il repository.
2. Dalla cartella principale eseguire:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\tools\download-local-assets.ps1
```

3. Aprire `chrome://extensions` oppure `edge://extensions`.
4. Attivare **Modalità sviluppatore**.
5. Selezionare **Carica estensione non pacchettizzata**.
6. Scegliere la cartella `extension`.

Lo script scarica gli asset runtime e il modello ONNX richiesti dall’estensione, quindi crea `SHA256SUMS.local.txt` con gli hash dei file locali.

I file binari scaricati non vengono inclusi nel repository Git.

## Utilizzo

1. Selezionare un testo in una pagina web.
2. Fare clic con il tasto destro.
3. Scegliere **Analizza con CivicAI**.
4. Controllare il testo nel pannello laterale.
5. Premere **Analizza**.
6. Verificare e modificare la bozza prima di usarla.

La prima analisi può richiedere più tempo perché il modello viene inizializzato nel browser. Le analisi successive sono normalmente più rapide.

## Elaborazione locale

Durante l’utilizzo:

- il testo selezionato resta nel browser;
- il modello viene caricato dai file locali dell’estensione;
- il caricamento remoto dei modelli è disattivato;
- non vengono effettuate richieste a servizi di intelligenza artificiale esterni;
- non vengono creati account, profili o cronologie remote.

CivicAI usa similarità semantica multilingue per confrontare il testo con esempi appartenenti a categorie civiche. Il risultato è indicativo e deve essere verificato dall’utente.

## Lingue dell’interfaccia

CivicAI rileva la lingua del browser tramite `chrome.i18n`.

Lingue incluse:

- English, lingua di fallback;
- Italiano;
- Español;
- Français;
- Deutsch.


## Come sono stati utilizzati Codex e GPT-5.6

CivicAI è stata progettata e sviluppata in collaborazione con Codex e GPT-5.6 durante la OpenAI Build Week.

Il Codex è stato utilizzato per:

- progettare l'architettura di estensione Manifest V3;
- implementare il flusso di lavoro contestuale e laterale;
- risoluzione del modulo del browser di debug e problemi di runtime ONNX;
- integrare il modello locale multilingue;
- migliorare la compatibilità con Chrome e Microsoft Edge;
- esaminare le questioni relative alla privacy e alla sicurezza;
- affinare lo script di installazione e la documentazione del progetto.

GPT-5.6 è stato usato per:

- ragione attraverso le decisioni di prodotto e privacy;
- valutare le architetture alternative locali-AI;
- diagnosticare i problemi di integrazione;
- programmare categorie civiche multilingue e struttura della relazione;
- guida alla verifica, preparazione dei repository e materiale di presentazione.

Le decisioni chiave prese durante lo sviluppo comprendono:

- mantenere tutte le inferenze sul dispositivo;
- evitare chiavi API, backend remoti, telemetria e installazione npm;
- utilizzando un modello ONNX multilingue quantizzato;
- separazione delle grandi attività generate dal repertorio pubblico delle fonti;
- fornendo uno script di configurazione riproducibile e stampato in versione.

## Principi

- controllo umano prima di ogni utilizzo;
- minimizzazione dei dati;
- elaborazione locale;
- nessuna scansione automatica delle pagine;
- nessuna raccolta di account, nomi, immagini o cronologia di navigazione;
- codice aperto e verificabile;
- permessi dell’estensione ridotti al minimo necessario.

## Limiti

CivicAI genera una bozza e non verifica la veridicità dei contenuti. La classificazione può essere imprecisa o incompleta.

CivicAI non sostituisce:

- i servizi di emergenza;
- le autorità competenti;
- i canali ufficiali di segnalazione;
- una consulenza legale o professionale.

Non inserire dati personali o sensibili non necessari nella segnalazione finale.

## Licenza

Il codice originale di CivicAI è distribuito con licenza MIT. Modello e componenti di terze parti conservano le rispettive licenze, indicate in `THIRD_PARTY_NOTICES.md` e `MODEL_CARD.md`.
