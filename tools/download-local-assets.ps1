$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $PSScriptRoot
$ExtensionDir = Join-Path $Root "extension"
$LibDir = Join-Path $ExtensionDir "lib"
$ModelDir = Join-Path $ExtensionDir "models\paraphrase-multilingual-MiniLM-L12-v2"
$OnnxDir = Join-Path $ModelDir "onnx"

New-Item -ItemType Directory -Force -Path $LibDir, $OnnxDir | Out-Null

$TransformersVersion = "2.17.2"
$OnnxRuntimeVersion = "1.14.0"
$ModelRevision = "7e3d5398ff67a776281d0a27b2d47a964d5bfffb"

$Assets = @(
  [pscustomobject]@{
    Name = "Transformers.js browser bundle"
    Url = "https://cdn.jsdelivr.net/npm/@xenova/transformers@$TransformersVersion/dist/transformers.min.js"
    Path = Join-Path $LibDir "transformers.min.js"
    Size = 897938
    Sha256 = "bcf7cf304e51f470ed59409622b9d6ffbad80dfcf5baf6a40c919e4b9c4ff812"
  },
  [pscustomobject]@{
    Name = "ONNX Runtime Web non-threaded SIMD WASM"
    Url = "https://cdn.jsdelivr.net/npm/@xenova/transformers@$TransformersVersion/dist/ort-wasm-simd.wasm"
    Path = Join-Path $LibDir "ort-wasm-simd.wasm"
    Size = 10014674
    Sha256 = "9bd07bababc65f53d061f457233eeae501be7ceb8a2adb9eef52d87fe776d865"
  },
  [pscustomobject]@{
    Name = "Quantized multilingual MiniLM ONNX model"
    Url = "https://huggingface.co/Xenova/paraphrase-multilingual-MiniLM-L12-v2/resolve/$ModelRevision/onnx/model_quantized.onnx?download=true"
    Path = Join-Path $OnnxDir "model_quantized.onnx"
    Size = 118308126
    Sha256 = "66fc00f5f29afcaff34092e1bdd20008ca3918265a82fb9695a551e510cc4ebc"
  }
)

function Get-NormalizedSha256([string]$Path) {
  return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Test-VerifiedAsset($Asset) {
  if (-not (Test-Path -LiteralPath $Asset.Path -PathType Leaf)) { return $false }
  $File = Get-Item -LiteralPath $Asset.Path
  if ($File.Length -ne $Asset.Size) { return $false }
  return (Get-NormalizedSha256 $Asset.Path) -eq $Asset.Sha256
}

function Install-VerifiedAsset($Asset) {
  if (Test-VerifiedAsset $Asset) {
    Write-Host "Verified: $($Asset.Name)"
    return
  }

  if (Test-Path -LiteralPath $Asset.Path) {
    Write-Warning "Removing invalid or unverified asset: $($Asset.Path)"
    Remove-Item -LiteralPath $Asset.Path -Force
  }

  $TemporaryPath = "$($Asset.Path).partial-$([guid]::NewGuid().ToString('N'))"
  try {
    Write-Host "Downloading $($Asset.Name)..."
    Invoke-WebRequest -Uri $Asset.Url -OutFile $TemporaryPath -UseBasicParsing
    if (-not (Test-Path -LiteralPath $TemporaryPath -PathType Leaf)) {
      throw "The download did not create a file."
    }
    $DownloadedFile = Get-Item -LiteralPath $TemporaryPath
    if ($DownloadedFile.Length -ne $Asset.Size) {
      throw "Unexpected size for $($Asset.Name): $($DownloadedFile.Length), expected $($Asset.Size)."
    }
    $DownloadedHash = Get-NormalizedSha256 $TemporaryPath
    if ($DownloadedHash -ne $Asset.Sha256) {
      throw "SHA-256 mismatch for $($Asset.Name): $DownloadedHash, expected $($Asset.Sha256)."
    }
    Move-Item -LiteralPath $TemporaryPath -Destination $Asset.Path -Force
    Write-Host "Installed and verified: $($Asset.Name)"
  }
  finally {
    if (Test-Path -LiteralPath $TemporaryPath) {
      Remove-Item -LiteralPath $TemporaryPath -Force
    }
  }
}

Write-Host "CivicAI v0.3.1 verified local asset setup" -ForegroundColor Cyan
Write-Host "Transformers.js: $TransformersVersion"
Write-Host "ONNX Runtime Web: $OnnxRuntimeVersion (single-threaded SIMD WASM)"
Write-Host "Model revision: $ModelRevision"
Write-Host "No npm install will be executed."
Write-Host ""

foreach ($Asset in $Assets) { Install-VerifiedAsset $Asset }

$ObsoleteFiles = @(
  (Join-Path $LibDir "transformers.web.min.js"),
  (Join-Path $LibDir "transformers.min.mjs"),
  (Join-Path $LibDir "ort-wasm-simd-threaded.wasm"),
  (Join-Path $LibDir "ort-wasm-threaded.wasm"),
  (Join-Path $LibDir "ort-wasm-simd-threaded.jsep.mjs"),
  (Join-Path $LibDir "ort-wasm-simd-threaded.jsep.wasm"),
  (Join-Path $OnnxDir "model_int8.onnx")
)

foreach ($File in $ObsoleteFiles) {
  if (Test-Path -LiteralPath $File) {
    Remove-Item -LiteralPath $File -Force
    Write-Host "Removed obsolete asset: $(Split-Path -Leaf $File)"
  }
}

$HashFile = Join-Path $Root "SHA256SUMS.local.txt"
$HashLines = $Assets | Sort-Object Path | ForEach-Object {
  if (-not (Test-VerifiedAsset $_)) { throw "Final verification failed for $($_.Name)." }
  $Relative = $_.Path.Substring($Root.Length + 1).Replace("\", "/")
  "$($_.Sha256)  $Relative"
}
$HashLines | Set-Content -LiteralPath $HashFile -Encoding utf8

Write-Host ""
Write-Host "Completed. All local assets match the pinned SHA-256 values." -ForegroundColor Green
Write-Host "Hashes written to $HashFile"
