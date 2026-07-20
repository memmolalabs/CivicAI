$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ExtensionDir = Join-Path $ProjectRoot "extension"
$LibDir = Join-Path $ExtensionDir "lib"

New-Item -ItemType Directory -Force -Path $ExtensionDir | Out-Null
New-Item -ItemType Directory -Force -Path $LibDir | Out-Null

$Root = Split-Path -Parent $PSScriptRoot
$Ext = Join-Path $Root "extension"
$Model = Join-Path $Ext "models\paraphrase-multilingual-MiniLM-L12-v2"
$Onnx = Join-Path $Model "onnx"
$Lib = Join-Path $Ext "lib"

New-Item -ItemType Directory -Force -Path $Onnx, $Lib | Out-Null

$RuntimeBase = "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist"

$ExistingInt8 = Join-Path $Onnx "model_int8.onnx"
$QuantizedModel = Join-Path $Onnx "model_quantized.onnx"


$Downloads = @(
  @("$RuntimeBase/transformers.min.js", (Join-Path $Lib "transformers.min.js")),
  @("$RuntimeBase/ort-wasm-simd-threaded.wasm", (Join-Path $Lib "ort-wasm-simd-threaded.wasm"))
)

Write-Host "CivicAI browser runtime fix" -ForegroundColor Cyan
Write-Host "Runtime: @xenova/transformers 2.17.2"
Write-Host "No npm install will be executed."
Write-Host ""

foreach ($Download in $Downloads) {
  $Url = $Download[0]
  $Path = $Download[1]
  $Name = Split-Path -Leaf $Path

  if (Test-Path $Path) {
    $ExistingSize = (Get-Item $Path).Length
    if ($ExistingSize -gt 0) {
      Write-Host "Already present: $Name"
      continue
    }
  }

  Write-Host "Downloading $Name..."
  Invoke-WebRequest -Uri $Url -OutFile $Path -UseBasicParsing
}

$ObsoleteFiles = @(
  (Join-Path $Lib "transformers.web.min.js"),
  (Join-Path $Lib "transformers.min.mjs"),
  (Join-Path $Lib "ort-wasm-simd-threaded.jsep.mjs"),
  (Join-Path $Lib "ort-wasm-simd-threaded.jsep.wasm")
)

foreach ($File in $ObsoleteFiles) {
  if (Test-Path $File) {
    Remove-Item $File -Force
  }
}

$ModelDir = Join-Path $ExtensionDir "models\paraphrase-multilingual-MiniLM-L12-v2\onnx"
$QuantizedModel = Join-Path $ModelDir "model_quantized.onnx"

$ModelUrl = "https://huggingface.co/Xenova/paraphrase-multilingual-MiniLM-L12-v2/resolve/main/onnx/model_quantized.onnx?download=true"

New-Item -ItemType Directory -Force -Path $ModelDir | Out-Null

if (-not (Test-Path $QuantizedModel)) {
    Write-Host "Downloading model_quantized.onnx..."
    Invoke-WebRequest `
        -Uri $ModelUrl `
        -OutFile $QuantizedModel `
        -UseBasicParsing
}
else {
    Write-Host "Model already present: model_quantized.onnx"
}

$HashFile = Join-Path $Root "SHA256SUMS.local.txt"

Get-ChildItem $Model, $Lib -File -Recurse |
  Where-Object { $_.Name -notlike "README*" } |
  ForEach-Object {
    $Hash = (Get-FileHash $_.FullName -Algorithm SHA256).Hash.ToLower()
    $Relative = $_.FullName.Substring($Root.Length + 1).Replace("\", "/")
    "$Hash  $Relative"
  } | Set-Content $HashFile -Encoding utf8

Write-Host ""
Write-Host "Completed." -ForegroundColor Green
Write-Host "Runtime bundle: transformers.min.js"
Write-Host "Model: model_quantized.onnx"
Write-Host "Hashes written to $HashFile"
