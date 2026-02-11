# اسکریپت برای ایجاد فایل Zip برای Deploy
# این اسکریپت فقط فایل‌های ضروری را zip می‌کند

$ErrorActionPreference = "Stop"

Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📦 Creating Deployment Zip File" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# بررسی اینکه در پوشه پروژه هستیم
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root directory." -ForegroundColor Yellow
    exit 1
}

# نام فایل zip
$zipFileName = "amazon-shop-deploy.zip"
$zipPath = Join-Path $PWD $zipFileName

# حذف zip قبلی اگر وجود دارد
if (Test-Path $zipPath) {
    Write-Host "🗑️  Removing existing zip file..." -ForegroundColor Yellow
    Remove-Item $zipPath -Force
}

Write-Host "📋 Collecting files..." -ForegroundColor Green

# لیست فایل‌های ضروری
$filesToInclude = @(
    # Docker files
    "Dockerfile",
    "Dockerfile.dev",
    "docker-compose.yml",
    
    # Config files
    "package.json",
    "next.config.mjs",
    "tailwind.config.js",
    "postcss.config.js",
    "jsconfig.json",
    "components.json",
    ".gitignore",
    "ENV_EXAMPLE.txt",
    "ENV_FOR_SERVER.txt"
)

# بررسی فایل‌های اختیاری
if (Test-Path "package-lock.json") {
    $filesToInclude += "package-lock.json"
    Write-Host "✅ Found package-lock.json" -ForegroundColor Green
}

if (Test-Path ".npmrc") {
    $filesToInclude += ".npmrc"
    Write-Host "✅ Found .npmrc" -ForegroundColor Green
}

# بررسی وجود فایل‌های ضروری
$missingFiles = @()
foreach ($file in $filesToInclude) {
    if (-not (Test-Path $file)) {
        $missingFiles += $file
    }
}

if ($missingFiles.Count -gt 0) {
    Write-Host "⚠️  Warning: Some files are missing:" -ForegroundColor Yellow
    foreach ($file in $missingFiles) {
        Write-Host "   - $file" -ForegroundColor Yellow
    }
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

# بررسی وجود پوشه‌های ضروری
if (-not (Test-Path "src")) {
    Write-Host "❌ Error: src/ folder not found!" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path "public")) {
    Write-Host "❌ Error: public/ folder not found!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Creating zip file..." -ForegroundColor Green

# ایجاد فایل موقت برای لیست فایل‌ها
$tempListFile = [System.IO.Path]::GetTempFileName()

# نوشتن لیست فایل‌ها
$filesToInclude | ForEach-Object {
    if (Test-Path $_) {
        $_.Replace("\", "/")
    }
} | Out-File -FilePath $tempListFile -Encoding UTF8

# اضافه کردن پوشه‌ها
"src/" | Out-File -FilePath $tempListFile -Append -Encoding UTF8
"public/" | Out-File -FilePath $tempListFile -Append -Encoding UTF8

# استفاده از 7-Zip اگر موجود است، در غیر این صورت از Compress-Archive
$use7zip = $false
if (Get-Command 7z -ErrorAction SilentlyContinue) {
    $use7zip = $true
    Write-Host "Using 7-Zip..." -ForegroundColor Gray
    
    # ایجاد zip با 7-Zip
    $filesToInclude | Where-Object { Test-Path $_ } | ForEach-Object {
        $relativePath = $_.Replace("\", "/")
        7z a -tzip $zipPath $relativePath | Out-Null
    }
    
    # اضافه کردن پوشه‌ها
    7z a -tzip $zipPath "src\*" -r | Out-Null
    7z a -tzip $zipPath "public\*" -r | Out-Null
} else {
    Write-Host "Using PowerShell Compress-Archive..." -ForegroundColor Gray
    
    # ایجاد لیست فایل‌ها برای Compress-Archive
    $itemsToCompress = @()
    
    # اضافه کردن فایل‌های موجود
    foreach ($file in $filesToInclude) {
        if (Test-Path $file) {
            $itemsToCompress += Get-Item $file
        }
    }
    
    # اضافه کردن پوشه‌ها
    $itemsToCompress += Get-Item "src"
    $itemsToCompress += Get-Item "public"
    
    # ایجاد zip
    Compress-Archive -Path $itemsToCompress -DestinationPath $zipPath -Force
}

# حذف فایل موقت
Remove-Item $tempListFile -Force -ErrorAction SilentlyContinue

# بررسی حجم فایل
$zipSize = (Get-Item $zipPath).Length / 1MB
$zipSizeFormatted = "{0:N2}" -f $zipSize

Write-Host ""
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host "✅ Zip file created successfully!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════" -ForegroundColor Green
Write-Host ""
Write-Host "📁 File: $zipPath" -ForegroundColor White
Write-Host "📊 Size: $zipSizeFormatted MB" -ForegroundColor White
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Upload this zip file to your server" -ForegroundColor Gray
Write-Host "   2. On server, run: unzip amazon-shop-deploy.zip" -ForegroundColor Gray
Write-Host "   3. Or use: git clone https://github.com/sajjad1-moeis/amazon-shop.git" -ForegroundColor Gray
Write-Host ""
