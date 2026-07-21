# Privacy

CivicAI v0.3.1 è progettato con un approccio local-first e senza backend.

## Dati elaborati

CivicAI riceve il testo che l’utente seleziona volontariamente tramite il menu contestuale. Il background salva temporaneamente soltanto:

- il testo selezionato;
- il nome di dominio della pagina, senza percorso, query string, frammento o titolo.

Ogni selezione usa una chiave temporanea univoca in `chrome.storage.local`. La chiave include un timestamp tecnico per ordinare correttamente selezioni concorrenti; non contiene URL o titolo. Prima di salvare una nuova selezione il background elimina eventuali selezioni pendenti più vecchie. Il pannello rimuove la chiave dopo averne consumato il contenuto e Reset rimuove eventuali residui. Se il pannello non riesce ad aprirsi o si interrompe prima del consumo, l’ultima selezione può restare nello storage locale fino alla selezione successiva, al consumo, al Reset o alla rimozione dei dati dell’estensione.

Il testo visibile e le bozze modificate nel pannello non vengono aggiunti a una cronologia applicativa.

## Trasmissioni e rete

Durante l’analisi:

- testo, embedding e risultati restano nel browser;
- non vengono inviati dati ad API, server AI o servizi esterni;
- non sono presenti backend, account, telemetria, analytics o pubblicazione automatica;
- il manifest non richiede host permissions;
- il caricamento remoto dei modelli è disattivato.

Lo script `tools/download-local-assets.ps1` usa Internet soltanto durante la preparazione esplicita degli asset e non riceve testo selezionato o dati d’uso.

## Permessi

- `contextMenus`: riceve la selezione soltanto dopo l’azione esplicita dell’utente;
- `storage`: trasferisce temporaneamente selezione e dominio al pannello;
- `sidePanel`: mostra l’interfaccia.

## Responsabilità dell’utente

Prima di usare o inviare una bozza, l’utente deve verificarla e rimuovere dati personali o sensibili non necessari.
