# Dependency and asset policy

CivicAI v0.3.1 does not run `npm install` and does not use a package manager during preparation.

## Asset runtime fixed

| Component | Version/revision | File | SHA-256 |
| --- | --- | --- | --- |
| `@xenova/transformers` | `2.17.2` | `transformers.min.js` | `bcf7cf304e51f470ed59409622b9d6ffbad80dfcf5baf6a40c919e4b9c4ff812` |
| ONNX Runtime Web, in the bundle | `1.14.0` | `ort-wasm-simd.wasm` | `9bd07bababc65f53d061f457233eeae501be7ceb8a2adb9eef52d87fe776d865` |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | commit `7e3d5398ff67a776281d0a27b2d47a964d5bfffb` | `onnx/model_quantized.onnx` | `66fc00f5f29afcaff34092e1bdd20008ca3918265a82fb9695a551e510cc4ebc` |

The script also verifies the expected sizes: 897,938, 10,014,674, and 118,308,126 bytes, respectively.

The tokenizer and model configuration JSON files are versioned in the repository. The three binary/runtime assets above and `SHA256SUMS.local.txt` are local and must remain excluded from Git.

## WASM Strategy

ONNX Runtime is configured for single-threaded SIMD. CivicAI does not use the `threaded`, `SharedArrayBuffer`, cross-origin isolation, proxy workers, or Blob workers variants.

## Update Rules

Every update must:

1. Fix an immutable version or revision;
2. Obtain the hash and size from a verifiable official source;
3. Update the scripts, documentation, and licenses together;
4. Be tested in Chrome and Edge from a clean copy;
5. Do not introduce telemetry, remote uploads, or additional permissions without explicit review.
Invia commenti
