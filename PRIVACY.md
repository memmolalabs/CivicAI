# Privacy

CivicAI è progettato secondo un approccio local-first.

## Dati elaborati

CivicAI elabora soltanto il testo che l’utente seleziona volontariamente e decide manualmente di analizzare.

Durante l’utilizzo:

- il testo selezionato viene elaborato localmente nel browser;
- il testo non viene inviato ad API, server o servizi esterni;
- non viene utilizzato alcun backend;
- non vengono creati account o profili;
- non vengono salvati database o cronologie remote;
- non viene eseguita alcuna pubblicazione automatica;
- non è presente telemetria.

La selezione può essere conservata temporaneamente tramite lo storage locale dell’estensione per trasferirla al pannello laterale. Questa informazione resta nel browser dell’utente.

## Download iniziale degli asset

Lo script `tools/download-local-assets.ps1` usa la connessione Internet soltanto per scaricare i file runtime e il modello ONNX necessari all’esecuzione locale.

Dopo il download, l’analisi può funzionare senza inviare il testo selezionato a servizi remoti. Il caricamento remoto dei modelli è disattivato nel codice dell’estensione.

## Permessi dell’estensione

- `contextMenus`: aggiunge il comando al menu contestuale del testo selezionato;
- `storage`: trasferisce temporaneamente la selezione al pannello laterale;
- `sidePanel`: mostra l’interfaccia di CivicAI.

CivicAI non richiede permessi host generali e non scansiona automaticamente il contenuto delle pagine.

## Responsabilità dell’utente

Prima di utilizzare o inviare una bozza, l’utente deve controllarne il contenuto e rimuovere eventuali dati personali o sensibili non necessari.
