[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $CliArguments
)

$ErrorActionPreference = 'Stop'
$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCommand) {
    $nodeExecutable = $nodeCommand.Source
} else {
    $nodeExecutable = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe'
    if (-not (Test-Path -LiteralPath $nodeExecutable)) {
        throw 'Install Node.js 22.12 or newer and reopen PowerShell.'
    }
}

$cliPackagePath = Join-Path $PSScriptRoot 'node_modules\@shopify\cli\package.json'
if (-not (Test-Path -LiteralPath $cliPackagePath)) {
    throw 'Shopify CLI is not installed. Run npm ci from the project folder.'
}
$cliPackage = Get-Content -LiteralPath $cliPackagePath -Raw | ConvertFrom-Json
$cliEntry = Join-Path (Split-Path $cliPackagePath) $cliPackage.bin.shopify
$env:PATH = (Split-Path $nodeExecutable) + [IO.Path]::PathSeparator + $env:PATH
Push-Location $PSScriptRoot
try {
    & $nodeExecutable $cliEntry @CliArguments
    $cliExitCode = $LASTEXITCODE
} finally {
    Pop-Location
}
exit $cliExitCode
