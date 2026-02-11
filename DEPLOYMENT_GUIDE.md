# راهنمای Deploy فرانت Amazon Shop

## 📋 فایل‌های مورد نیاز برای سرور

اگر می‌خواهید دستی فایل‌ها را بفرستید، این فایل‌ها را نیاز دارید:

### فایل‌های ضروری Docker:
- `Dockerfile`
- `Dockerfile.dev`
- `docker-compose.yml`

### فایل‌های کد (از GitHub clone می‌شود):
- تمام فایل‌های پروژه (از طریق git clone)
- `package.json`
- `next.config.mjs`
- `tailwind.config.js`
- `postcss.config.js`
- `jsconfig.json`
- پوشه `src/`
- پوشه `public/`

### فایل‌های اختیاری:
- `ENV_FOR_SERVER.txt` (برای تنظیمات محیط)
- `ENV_EXAMPLE.txt`
- `.gitignore`

---

## 🚀 دستورات نصب و راه‌اندازی روی سرور لینوکس

### مرحله 1: نصب Docker

```bash
# به‌روزرسانی سیستم
sudo apt update

# نصب پیش‌نیازها
sudo apt install -y ca-certificates curl gnupg lsb-release

# اضافه کردن GPG key رسمی Docker
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# اضافه کردن repository Docker
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# نصب Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# بررسی نصب Docker
sudo docker --version
sudo docker compose version

# اضافه کردن کاربر فعلی به گروه docker (برای اجرا بدون sudo)
sudo usermod -aG docker $USER
# بعد از این دستور باید logout و login کنید یا دستور زیر را اجرا کنید:
newgrp docker
```

### مرحله 2: نصب Git (اگر نصب نیست)

```bash
sudo apt update
sudo apt install -y git
git --version
```

### مرحله 3: نصب Node.js و npm (اختیاری - فقط برای تست محلی)

```bash
# نصب Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

---

## 📦 روش Deploy

### روش 1: استفاده از اسکریپت PowerShell (توصیه می‌شود)

از روی ویندوز، در پوشه پروژه:

```powershell
.\deploy-to-server.ps1 -ServerIP 107.161.175.45 -SSHPassword "your-password"
```

یا با SSH Key:

```powershell
.\deploy-to-server.ps1 -ServerIP 107.161.175.45 -SSHKey "path\to\your\key"
```

### روش 2: Deploy دستی روی سرور

#### مرحله 1: اتصال به سرور

```bash
ssh root@107.161.175.45
```

#### مرحله 2: ایجاد پوشه پروژه

```bash
mkdir -p /root/amazon-shop-frontend
cd /root/amazon-shop-frontend
```

#### مرحله 3: Clone کردن از GitHub

```bash
# اگر قبلاً clone نشده
git clone https://github.com/sajjad1-moeis/amazon-shop.git .

# یا اگر قبلاً clone شده
git fetch origin
git reset --hard origin/master
```

#### مرحله 4: بررسی فایل‌ها

```bash
# بررسی وجود فایل‌های Docker
ls -la Dockerfile docker-compose.yml

# بررسی package.json
ls -la package.json
```

#### مرحله 5: Build و Run با Docker

```bash
# توقف containerهای قبلی (اگر وجود دارند)
docker compose down

# Build کردن image (این کار ممکن است چند دقیقه طول بکشد)
docker compose build --no-cache

# اجرای container
docker compose up -d

# بررسی وضعیت container
docker compose ps

# مشاهده لاگ‌ها
docker compose logs -f app
```

#### مرحله 5: بررسی سلامت برنامه

```bash
# بررسی اینکه container در حال اجرا است
docker ps | grep amazon-shop-app

# تست دسترسی به برنامه
curl http://localhost:3000

# یا از خارج سرور
curl http://107.161.175.45:3000
```

---

## 🔧 دستورات مفید برای مدیریت

### مشاهده لاگ‌ها

```bash
# لاگ‌های زنده
docker compose logs -f app

# آخرین 50 خط لاگ
docker compose logs --tail=50 app
```

### Restart کردن Container

```bash
docker compose restart app
```

### توقف Container

```bash
docker compose down
```

### توقف و حذف Volumeها

```bash
docker compose down -v
```

### Rebuild کردن (بعد از تغییرات در کد)

```bash
# Pull آخرین تغییرات
git pull origin master

# Rebuild
docker compose build --no-cache

# Restart
docker compose up -d
```

### بررسی استفاده از منابع

```bash
# استفاده از CPU و Memory
docker stats amazon-shop-app

# لیست تمام imageها
docker images

# لیست تمام containerها
docker ps -a
```

### پاکسازی Docker

```bash
# حذف imageهای استفاده نشده
docker image prune -f

# حذف containerهای متوقف شده
docker container prune -f

# حذف همه چیز (مراقب باشید!)
docker system prune -a
```

---

## 🔍 عیب‌یابی

### Container شروع نمی‌شود

```bash
# بررسی لاگ‌ها
docker compose logs app

# بررسی وضعیت
docker compose ps

# بررسی خطاهای build
docker compose build --no-cache
```

### Port 3000 در حال استفاده است

```bash
# بررسی چه چیزی از port 3000 استفاده می‌کند
sudo lsof -i :3000
# یا
sudo netstat -tulpn | grep 3000

# توقف process استفاده‌کننده
sudo kill -9 <PID>
```

### مشکل در Build

```bash
# بررسی لاگ‌های build
docker compose build --no-cache 2>&1 | tee build.log

# بررسی disk space
df -h

# بررسی memory
free -h
```

### مشکل در دسترسی به برنامه از خارج

```bash
# بررسی firewall
sudo ufw status

# باز کردن port 3000 (اگر نیاز باشد)
sudo ufw allow 3000/tcp
sudo ufw reload

# بررسی اینکه container به درستی listen می‌کند
docker compose logs app | grep -i "listening"
```

---

## 📝 نکات مهم

1. **اولین Build**: اولین بار که `docker compose build` را اجرا می‌کنید، ممکن است 10-15 دقیقه طول بکشد چون باید تمام dependencies را دانلود کند.

2. **Memory**: مطمئن شوید سرور حداقل 2GB RAM دارد.

3. **Disk Space**: مطمئن شوید حداقل 5GB فضای خالی دارید.

4. **Firewall**: اگر از firewall استفاده می‌کنید، port 3000 را باز کنید.

5. **Environment Variables**: اگر نیاز به تغییر `NEXT_PUBLIC_BASE_URL` دارید، فایل `.env` را ایجاد کنید یا در `docker-compose.yml` تغییر دهید.

---

## ✅ چک‌لیست نهایی

- [ ] Docker نصب شده
- [ ] Docker Compose نصب شده
- [ ] Git نصب شده
- [ ] پروژه از GitHub clone شده
- [ ] فایل‌های Docker موجود هستند
- [ ] Build موفقیت‌آمیز بوده
- [ ] Container در حال اجرا است
- [ ] برنامه روی `http://107.161.175.45:3000` قابل دسترسی است

---

## 🌐 دسترسی به برنامه

بعد از deploy موفق، برنامه در آدرس زیر قابل دسترسی است:

```
http://107.161.175.45:3000
```

اگر می‌خواهید از دامنه استفاده کنید، باید:
1. DNS را تنظیم کنید
2. Nginx یا reverse proxy تنظیم کنید
3. SSL certificate نصب کنید
4. `NEXT_PUBLIC_BASE_URL` را به دامنه تغییر دهید
