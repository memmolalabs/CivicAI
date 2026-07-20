# Security Policy

## Segnalare una vulnerabilità

Non pubblicare in una issue aperta dettagli che contengano dati personali, credenziali, exploit immediatamente utilizzabili o informazioni che possano mettere a rischio gli utenti.

Usare un canale privato indicato dal maintainer del repository per la prima segnalazione. La vulnerabilità potrà essere resa pubblica dopo la correzione e il coordinamento della divulgazione.

## Principi di sicurezza

CivicAI deve mantenere:

- assenza di chiavi, token e credenziali nel codice;
- assenza di telemetria non dichiarata;
- elaborazione locale del testo selezionato;
- nessun caricamento remoto del modello durante l’utilizzo;
- permessi Manifest V3 ridotti al minimo;
- rendering del testo non attendibile tramite `textContent`, `value` o metodi equivalenti, mai tramite HTML eseguibile;
- versioni delle dipendenze fissate e documentate;
- nessun `eval` o esecuzione dinamica di codice remoto;
- revisione di ogni modifica che introduca nuove origini di rete o nuovi permessi.

## Segreti e dati locali

Non includere nel repository:

- file `.env`;
- chiavi private, certificati o keystore;
- password, token o chiavi API;
- percorsi personali del computer;
- dump, log o file di debug contenenti dati dell’utente;
- asset locali generati o scaricati esclusi da `.gitignore`.

## Limiti

L’elaborazione locale riduce l’esposizione dei dati ma non elimina tutti i rischi. Gli utenti devono installare l’estensione e gli asset soltanto da fonti affidabili e controllare le modifiche al codice prima dell’esecuzione.
