# Publica dist/ en el sitio IIS cod-app por Web Deploy.
# Desde WSL: DEPLOY_PASSWORD='...' npm run deploy
# Este archivo lo llama scripts/deploy.sh. También se puede ejecutar en Windows con -SkipBuild.

param(
    [switch]$SkipBuild,
    [string]$Password,
    [string]$SiteName = "fonti-app",
    [string]$ComputerName = "https://66.23.239.98:8172/msdeploy.axd",
    [string]$UserName = "WIN-KEJVO9CLD80\Administrator"
)

$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
if ([string]::IsNullOrWhiteSpace($root)) {
    $root = Split-Path -Parent $MyInvocation.MyCommand.Path
}

function Find-MsDeploy {
    $candidates = @(
        "${env:ProgramFiles}\IIS\Microsoft Web Deploy V3\msdeploy.exe",
        "${env:ProgramFiles(x86)}\IIS\Microsoft Web Deploy V3\msdeploy.exe"
    )
    foreach ($path in $candidates) {
        if (Test-Path $path) { return $path }
    }
    throw "No está msdeploy.exe. Instala Web Deploy 3 en Windows o ejecuta este script desde el equipo que ya publica cod.auth y cod.data."
}

$msdeploy = Find-MsDeploy

if (-not $SkipBuild) {
    if ($root.StartsWith("\\")) {
        # cmd.exe no puede usar una ruta UNC como carpeta actual. pushd le asigna una letra.
        cmd.exe /c "pushd `"$root`" && npm run build"
    } else {
        Push-Location $root
        try {
            npm run build
        } finally {
            Pop-Location
        }
    }
    if ($LASTEXITCODE -ne 0) { throw "El build falló." }
}

$dist = Join-Path $root "dist"
if (-not (Test-Path (Join-Path $dist "index.html"))) {
    throw "No está dist\index.html. Ejecuta npm run build antes de publicar."
}
if (-not (Test-Path (Join-Path $dist "web.config"))) {
    throw "No está dist\web.config. npm run build lo copia al terminar el build."
}

if (-not $Password) { $Password = $env:DEPLOY_PASSWORD }
if (-not $Password) {
    $passwordFile = Join-Path $root ".deploy-password"
    if (Test-Path $passwordFile) {
        $Password = (Get-Content -Raw $passwordFile).Trim()
    }
}
if (-not $Password) {
    $secure = Read-Host "Contraseña de Web Deploy" -AsSecureString
    $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
    try {
        $Password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
    } finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
    }
}

if ([string]::IsNullOrWhiteSpace($Password)) {
    throw "La contraseña de Web Deploy está vacía."
}
if ($Password.Contains(",")) {
    throw "Web Deploy separa los parámetros por comas. La contraseña no puede incluir una coma."
}

# contentPath en los dos lados: iisApp no acepta una carpeta suelta como origen.
$dest = "contentPath=$SiteName,computerName=$ComputerName,userName=$UserName,password=$Password,authType=Basic"

& $msdeploy `
    -verb:sync `
    "-source:contentPath=$dist" `
    "-dest:$dest" `
    -allowUntrusted `
    -useChecksum

if ($LASTEXITCODE -ne 0) { throw "Web Deploy falló con código $LASTEXITCODE." }

Write-Host "Publicado en el sitio IIS $SiteName."
