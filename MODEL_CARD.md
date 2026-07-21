# CivicAI local model

## Identification

- Original model: `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2`;
- Browser conversion: `Xenova/paraphrase-multilingual-MiniLM-L12-v2`;
- Fixed revision: `7e3d5398ff67a776281d0a27b2d47a964d5bfffb`;
- Variant: `onnx/model_quantized.onnx`;
- SHA-256: `66fc00f5f29afcaff34092e1bdd20008ca3918265a82fb9695a551e510cc4ebc`;
- License: Apache-2.0.

## Usage

The model produces multilingual semantic embeddings. CivicAI compares the text embedding with examples of predefined civic categories using cosine similarity. The text draft is composed deterministically and remains editable.

The value displayed as a percentage is the maximum normalized semantic similarity in the displayed range. **It is not a calibrated probability**, does not measure veracity, and does not represent an official decision.

The tokenizer has a maximum limit of 512 tokens. Longer texts may be truncated for embedding; the original text remains in the draft.

## Limitations

The model may misinterpret ambiguous, negated, very short, multi-topic, or non-categorized texts; it may also produce different results between languages ​​and reflect limitations or biases in the original data.

It does not verify facts, legal responsibilities, real emergencies, or competent authorities, and does not replace human judgment.

## Privacy and Runtime

Inference and pooling are performed in the extension panel using Transformers.js 2.17.2 and ONNX Web Runtime 1.14.0, using the local, non-threaded WASM SIMD file. Remote model loading is disabled.
