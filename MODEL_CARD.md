# CivicAI local model

## Modello

- Modello originale: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`
- Conversione browser ONNX: `Xenova/paraphrase-multilingual-MiniLM-L12-v2`
- Variante utilizzata: `onnx/model_quantized.onnx`
- Licenza del modello: Apache-2.0

## Uso in CivicAI

CivicAI usa il modello localmente per produrre rappresentazioni semantiche multilingue del testo selezionato e confrontarle con esempi appartenenti a categorie civiche predefinite.

Il modello non genera autonomamente una decisione ufficiale. La classificazione serve soltanto a proporre una categoria approssimativa e a preparare una bozza modificabile.

## Limiti

Il modello è general-purpose e può:

- interpretare male testi ambigui o molto brevi;
- confondere categorie semanticamente vicine;
- produrre risultati differenti in base alla lingua o alla formulazione;
- non riconoscere correttamente contesti locali, amministrativi o giuridici;
- riflettere limiti o bias presenti nei dati di addestramento originali.

Il modello non:

- verifica i fatti;
- determina responsabilità legali;
- identifica con certezza l’autorità competente;
- sostituisce la valutazione umana;
- garantisce che un testo descriva realmente un problema civico.

## Privacy

L’inferenza avviene nel browser usando file locali dell’estensione. Il caricamento remoto dei modelli è disattivato durante l’utilizzo.
