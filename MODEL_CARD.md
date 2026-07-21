# CivicAI local model

## Identificazione

- modello originale: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`;
- conversione browser: `Xenova/paraphrase-multilingual-MiniLM-L12-v2`;
- revisione fissata: `7e3d5398ff67a776281d0a27b2d47a964d5bfffb`;
- variante: `onnx/model_quantized.onnx`;
- SHA-256: `66fc00f5f29afcaff34092e1bdd20008ca3918265a82fb9695a551e510cc4ebc`;
- licenza: Apache-2.0.

## Uso

Il modello produce embedding semantici multilingue. CivicAI confronta l’embedding del testo con esempi di categorie civiche predefinite mediante similarità coseno. La bozza testuale è composta deterministicamente e resta modificabile.

Il valore mostrato come percentuale è la similarità semantica massima normalizzata nell’intervallo visualizzato. **Non è una probabilità calibrata**, non misura la veridicità e non rappresenta una decisione ufficiale.

Il tokenizer ha un limite massimo di 512 token. Testi più lunghi possono essere troncati per l’embedding; il testo originale resta comunque nella bozza.

## Limiti

Il modello può interpretare male testi ambigui, negati, molto brevi, multitema o fuori dalle categorie disponibili; può inoltre produrre risultati differenti fra lingue e riflettere limiti o bias dei dati originali.

Non verifica fatti, responsabilità legali, urgenze reali o autorità competenti e non sostituisce la valutazione umana.

## Privacy e runtime

Inferenza e pooling avvengono nel pannello dell’estensione tramite Transformers.js 2.17.2 e ONNX Runtime Web 1.14.0, usando il file WASM SIMD non threaded locale. Il caricamento remoto dei modelli è disattivato.
