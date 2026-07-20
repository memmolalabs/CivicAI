# Dependency policy

CivicAI non richiede `npm install` e non esegue script di installazione di pacchetti npm.

## Componenti locali

Lo script `tools/download-local-assets.ps1` scarica versioni fissate dei componenti necessari all’esecuzione nel browser:

- `@xenova/transformers` 2.17.2, bundle browser;
- ONNX Runtime Web incluso nel runtime e relativo file WASM;
- conversione ONNX quantizzata di `paraphrase-multilingual-MiniLM-L12-v2`.

I file binari vengono conservati localmente e sono esclusi dal repository tramite `.gitignore`.

## Regole per nuove dipendenze

Ogni nuova dipendenza deve:

1. essere strettamente necessaria;
2. avere una licenza compatibile con il progetto;
3. usare una versione esatta e documentata;
4. provenire da una fonte ufficiale o verificabile;
5. essere valutata per vulnerabilità e script di installazione;
6. non introdurre telemetria o raccolta dati senza una discussione pubblica;
7. essere aggiunta a `THIRD_PARTY_NOTICES.md` quando richiesto.

Quando disponibili hash ufficiali o valori fidati mantenuti dal progetto, lo script di download dovrebbe verificarli prima di accettare gli asset.
