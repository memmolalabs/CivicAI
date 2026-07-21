# Dependency and asset policy

CivicAI v0.3.1 non esegue `npm install` e non usa un package manager durante la preparazione.

## Asset runtime fissati

| Componente | Versione/revisione | File | SHA-256 |
| --- | --- | --- | --- |
| `@xenova/transformers` | `2.17.2` | `transformers.min.js` | `bcf7cf304e51f470ed59409622b9d6ffbad80dfcf5baf6a40c919e4b9c4ff812` |
| ONNX Runtime Web, incluso nel bundle | `1.14.0` | `ort-wasm-simd.wasm` | `9bd07bababc65f53d061f457233eeae501be7ceb8a2adb9eef52d87fe776d865` |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | commit `7e3d5398ff67a776281d0a27b2d47a964d5bfffb` | `onnx/model_quantized.onnx` | `66fc00f5f29afcaff34092e1bdd20008ca3918265a82fb9695a551e510cc4ebc` |

Lo script verifica anche le dimensioni attese: rispettivamente 897.938, 10.014.674 e 118.308.126 byte.

I file JSON del tokenizer e della configurazione modello sono versionati nel repository. I tre asset binari/runtime sopra e `SHA256SUMS.local.txt` sono locali e devono restare esclusi da Git.

## Strategia WASM

ONNX Runtime è configurato per SIMD a thread singolo. CivicAI non usa le varianti `threaded`, `SharedArrayBuffer`, cross-origin isolation, proxy worker o worker Blob.

## Regole di aggiornamento

Ogni aggiornamento deve:

1. fissare una versione o revisione immutabile;
2. ricavare hash e dimensione da una fonte ufficiale verificabile;
3. aggiornare insieme script, documentazione e licenze;
4. essere testato in Chrome ed Edge da una copia pulita;
5. non introdurre telemetria, caricamento remoto o permessi aggiuntivi senza revisione esplicita.
