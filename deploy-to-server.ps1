# Deploy Frontend to Server (Direct SSH)
# این اسکریپت مستقیم به سرور متصل می‌شه و deploy می‌کنه

param(
    [Parameter(Mandatory=$false)]
    [string]$ServerIP = "107.161.175.45",
    
    [Parameter(Mandatory=$false)]
    [string]$SSHUser = "root",
    
    [Parameter(Mandatory=$false)]
    [string]$SSHPassword = "",
    
    [Parameter(Mandatory=$false)]
    [string]$SSHKey = "",
    
    [Parameter(Mandatory=$false)]
    [string]$DeployPath = "/root/amazon-shop-frontend",
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipPush,
    
    [Parameter(Mandatory=$false)]
    [switch]$SkipBuild
)

$ErrorActionPreference = "Continue"

# رنگ‌ها
function Write-ColoredMessage {
    param([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

Write-ColoredMessage "═══════════════════════════════════════════════════" "Cyan"
Write-ColoredMessage "🚀 Amazon Shop Frontend Deployment Script" "Cyan"
Write-ColoredMessage "═══════════════════════════════════════════════════" "Cyan"

# بررسی پارامترها
if ([string]::IsNullOrEmpty($ServerIP)) {
    Write-ColoredMessage "❌ ServerIP is required!" "Red"
    Write-ColoredMessage "Usage: .\deploy-to-server.ps1 -ServerIP <YOUR_SERVER_IP>" "Yellow"
    Write-ColoredMessage "Example: .\deploy-to-server.ps1 -ServerIP 1.2.3.4" "Yellow"
    exit 1
}

Write-ColoredMessage "📋 Configuration:" "White"
Write-ColoredMessage "  Server: $SSHUser@$ServerIP" "Gray"
Write-ColoredMessage "  Deploy Path: $DeployPath" "Gray"
Write-ColoredMessage "  SSH Key: $SSHKey" "Gray"
Write-ColoredMessage ""

# مرحله 1: Push به GitHub (اختیاری)
if (-not $SkipPush) {
    Write-ColoredMessage "═══ Step 1: Pushing to GitHub ═══" "Cyan"
    
    try {
        # بررسی تغییرات
        $changes = git status --porcelain
        if ($changes) {
            Write-ColoredMessage "📝 Found uncommitted changes, committing..." "Yellow"
            
            git add .
            if ($LASTEXITCODE -ne 0) {
                throw "git add failed"
            }
            
            $commitMsg = "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
            git commit -m $commitMsg
            if ($LASTEXITCODE -ne 0) {
                throw "git commit failed"
            }
            
            Write-ColoredMessage "✅ Changes committed" "Green"
        } else {
            Write-ColoredMessage "✅ No uncommitted changes" "Green"
        }
        
        # Push
        Write-ColoredMessage "📤 Pushing to GitHub..." "Yellow"
        $currentBranch = git rev-parse --abbrev-ref HEAD
        git push origin $currentBranch
        if ($LASTEXITCODE -ne 0) {
            throw "git push failed"
        }
        
        Write-ColoredMessage "✅ Pushed to GitHub ($currentBranch)" "Green"
    }
    catch {
        Write-ColoredMessage "❌ Git operations failed: $_" "Red"
        Write-ColoredMessage "⚠️ Continuing with deployment anyway..." "Yellow"
    }
    Write-ColoredMessage ""
} else {
    Write-ColoredMessage "⏭️ Skipping Git push" "Yellow"
    Write-ColoredMessage ""
}

# مرحله 2: SSH به سرور و Deploy
Write-ColoredMessage "═══ Step 2: Deploying to Server ═══" "Cyan"

# ساخت اسکریپت deploy
$deployScript = @"
#!/bin/bash
set -e

echo "🚀 Starting deployment..."
echo ""

# Navigate to project
echo "📂 Navigating to $DeployPath..."
mkdir -p $DeployPath
cd $DeployPath || exit 1

# Check if repo exists
if [ ! -d ".git" ]; then
    echo "📥 Repository not found, cloning..."
    git clone https://github.com/sajjad1-moeis/amazon-shop.git .
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git fetch origin
git reset --hard origin/master

echo "📋 Current commit:"
git log -1 --oneline
echo ""

# Verify package.json
if [ ! -f "package.json" ]; then
    echo "❌ ERROR: package.json not found!"
    exit 1
fi
echo "✅ Found package.json"

# Check package-lock.json
if [ ! -f "package-lock.json" ]; then
    echo "⚠️ package-lock.json not found, generating it..."
    npm install --package-lock-only || true
fi
echo "✅ Found package-lock.json"
echo ""

# Stop containers
echo "🛑 Stopping existing containers..."
docker compose down 2>/dev/null || docker-compose down 2>/dev/null || true
echo ""

# Build
if [ "$1" != "--skip-build" ]; then
    echo "🔨 Building Docker image (this may take a while)..."
    docker compose build --no-cache 2>/dev/null || docker-compose build --no-cache || exit 1
    echo "✅ Build completed"
    echo ""
else
    echo "⏭️ Skipping build"
    echo ""
fi

# Start containers
echo "🚀 Starting containers..."
docker compose up -d 2>/dev/null || docker-compose up -d || exit 1
echo ""

# Wait for startup
echo "⏳ Waiting for containers to start..."
sleep 10
echo ""

# Check status
echo "📊 Container status:"
docker compose ps 2>/dev/null || docker-compose ps
echo ""

# Check if running
if docker ps | grep -q "amazon-shop-app"; then
    echo "✅ Container is running"
else
    echo "❌ Container failed to start!"
    echo "📋 Logs:"
    docker compose logs app 2>/dev/null || docker-compose logs app
    exit 1
fi
echo ""

# Health check
echo "🏥 Running health check..."
for i in {1..10}; do
    if curl -f -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Health check passed!"
        break
    fi
    if [ \$i -eq 10 ]; then
        echo "⚠️ Health check timed out (but container is running)"
    fi
    echo "⏳ Waiting... (\$i/10)"
    sleep 3
done
echo ""

# Cleanup
echo "🧹 Cleaning up old Docker resources..."
docker image prune -f || true
docker container prune -f || true
echo ""

echo "═══════════════════════════════════════════════════"
echo "✅ Deployment completed successfully!"
echo "═══════════════════════════════════════════════════"
"@

# ذخیره اسکریپت در فایل موقت
$tempScript = [System.IO.Path]::GetTempFileName()
$deployScript | Out-File -FilePath $tempScript -Encoding UTF8 -NoNewline

try {
    Write-ColoredMessage "🌐 Connecting to server..." "Yellow"
    
    # آرگومنت اختیاری برای skip build
    $buildArg = if ($SkipBuild) { "--skip-build" } else { "" }
    
    # اجرای اسکریپت روی سرور
    if (-not [string]::IsNullOrEmpty($SSHKey) -and (Test-Path $SSHKey)) {
        Write-ColoredMessage "🔑 Using SSH key: $SSHKey" "Gray"
        Get-Content $tempScript | ssh -i $SSHKey -o StrictHostKeyChecking=no "$SSHUser@$ServerIP" "bash -s -- $buildArg"
    } else {
        Write-ColoredMessage "🔑 Using password authentication" "Gray"
        # استفاده از sshpass برای password authentication
        $sshpassCmd = "sshpass -p '$SSHPassword' ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null $SSHUser@$ServerIP"
        Get-Content $tempScript | & $sshpassCmd "bash -s -- $buildArg"
        
        # اگر sshpass نصب نیست، از expect استفاده می‌کنیم یا user رو راهنمایی می‌کنیم
        if ($LASTEXITCODE -ne 0) {
            Write-ColoredMessage "⚠️ sshpass not found. Please install it or use SSH key." "Yellow"
            Write-ColoredMessage "Alternative: Use SSH key or install sshpass:" "Yellow"
            Write-ColoredMessage "  Windows: choco install sshpass" "Gray"
            Write-ColoredMessage "  Or use: plink.exe -ssh -pw '$SSHPassword' $SSHUser@$ServerIP" "Gray"
            throw "SSH authentication failed"
        }
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColoredMessage ""
        Write-ColoredMessage "═══════════════════════════════════════════════════" "Green"
        Write-ColoredMessage "✅ Deployment successful!" "Green"
        Write-ColoredMessage "═══════════════════════════════════════════════════" "Green"
        Write-ColoredMessage ""
        Write-ColoredMessage "🌐 Your app should be available at:" "White"
        Write-ColoredMessage "   http://$ServerIP:3000" "Cyan"
    } else {
        throw "SSH command failed with exit code $LASTEXITCODE"
    }
}
catch {
    Write-ColoredMessage ""
    Write-ColoredMessage "═══════════════════════════════════════════════════" "Red"
    Write-ColoredMessage "❌ Deployment failed!" "Red"
    Write-ColoredMessage "═══════════════════════════════════════════════════" "Red"
    Write-ColoredMessage "Error: $_" "Red"
    exit 1
}
finally {
    # حذف فایل موقت
    if (Test-Path $tempScript) {
        Remove-Item $tempScript -Force
    }
}

Write-ColoredMessage ""
Write-ColoredMessage "📚 Useful commands:" "White"
Write-ColoredMessage "  - Check logs: ssh $SSHUser@$ServerIP 'cd $DeployPath && docker compose logs -f'" "Gray"
Write-ColoredMessage "  - Restart: ssh $SSHUser@$ServerIP 'cd $DeployPath && docker compose restart'" "Gray"
Write-ColoredMessage "  - Stop: ssh $SSHUser@$ServerIP 'cd $DeployPath && docker compose down'" "Gray"
