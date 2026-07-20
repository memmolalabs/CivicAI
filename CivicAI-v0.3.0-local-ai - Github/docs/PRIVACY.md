# Privacy

CivicAI elabora soltanto il testo che l'utente seleziona volontariamente e invia manualmente all'analisi.

## Modalità demo

La modalità demo opera localmente nel server Node.js e non invia il testo a provider esterni.

## Modalità OpenAI

Quando `DEMO_MODE=false`, il server locale invia il testo selezionato direttamente all'API OpenAI per generare il risultato. Il server MVP:

- non usa un database;
- non salva il testo o il risultato;
- non crea profili;
- non pubblica contenuti;
- imposta `store: false` nella richiesta.

L'utente deve comunque consultare le condizioni e i controlli sui dati applicabili al provider API.

## Permessi dell'estensione

- `contextMenus`: aggiunge il comando sul testo selezionato;
- `storage`: trasferisce temporaneamente la selezione al pannello;
- `sidePanel`: mostra l'interfaccia laterale;
- accesso a `127.0.0.1:8787`: comunica con il server locale.
