# 📦 لیست دقیق فایل‌های مورد نیاز برای سرور

## ✅ فایل‌های ضروری که باید بفرستید:

### 1. فایل‌های Docker (حتمی):
```
Dockerfile
Dockerfile.dev
docker-compose.yml
```

### 2. فایل‌های تنظیمات پروژه (حتمی):
```
package.json
package-lock.json (اگر وجود دارد)
next.config.mjs
tailwind.config.js
postcss.config.js
jsconfig.json
components.json
.npmrc (اگر وجود دارد)
```

### 3. فایل‌های کد منبع (حتمی):
```
src/          (تمام پوشه src با تمام محتویات)
public/       (تمام پوشه public با تمام محتویات)
```

### 4. فایل‌های اختیاری (مفید):
```
.gitignore
ENV_EXAMPLE.txt
ENV_FOR_SERVER.txt
README.md
```

---

## ❌ فایل‌هایی که نباید بفرستید:

```
node_modules/     (Docker خودش نصب می‌کند)
.next/            (Docker خودش build می‌کند)
.git/             (نیازی نیست)
.env              (اگر حساس است، نفرستید)
.env.local        (حساس است)
coverage/         (برای تست است)
*.log             (لاگ‌ها)
.DS_Store         (فایل سیستم)
```

---

## 📝 نحوه Zip و Unzip

### روی ویندوز (Zip کردن):

#### روش 1: استفاده از PowerShell
```powershell
# رفتن به پوشه پروژه
cd D:\Amazon_Shop\front_amazon\amazon-shop

# ایجاد zip (بدون node_modules و .next)
Compress-Archive -Path Dockerfile,Dockerfile.dev,docker-compose.yml,package.json,next.config.mjs,tailwind.config.js,postcss.config.js,jsconfig.json,components.json,src,public,.gitignore,ENV_EXAMPLE.txt,ENV_FOR_SERVER.txt -DestinationPath amazon-shop-deploy.zip -Force
```

#### روش 2: استفاده از 7-Zip یا WinRAR
1. انتخاب فایل‌های زیر:
   - `Dockerfile`
   - `Dockerfile.dev`
   - `docker-compose.yml`
   - `package.json`
   - `package-lock.json` (اگر وجود دارد)
   - `next.config.mjs`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `jsconfig.json`
   - `components.json`
   - `.npmrc` (اگر وجود دارد)
   - پوشه `src/`
   - پوشه `public/`
   - `.gitignore`
   - `ENV_EXAMPLE.txt`
   - `ENV_FOR_SERVER.txt`

2. راست کلیک → Add to archive → نام: `amazon-shop-deploy.zip`

#### روش 3: استفاده از دستور Git (بهترین روش)
```powershell
# ایجاد archive از git (بدون فایل‌های ignore شده)
cd D:\Amazon_Shop\front_amazon\amazon-shop
git archive -o amazon-shop-deploy.zip HEAD
```

---

### روی سرور لینوکس (Unzip کردن):

```bash
# رفتن به پوشه مورد نظر
cd /root/amazon-shop-frontend

# Unzip کردن
unzip amazon-shop-deploy.zip

# یا اگر unzip نصب نیست
apt install -y unzip
unzip amazon-shop-deploy.zip

# بررسی فایل‌ها
ls -la
```

---

## 🚀 روش بهتر: استفاده از Git (توصیه می‌شود)

به جای zip کردن، بهتر است از Git استفاده کنید:

### روی سرور:
```bash
cd /root/amazon-shop-frontend
git clone https://github.com/sajjad1-moeis/amazon-shop.git .
```

این روش بهتر است چون:
- ✅ فقط فایل‌های لازم را می‌گیرد
- ✅ فایل‌های ignore شده را نمی‌گیرد
- ✅ به‌روزرسانی راحت‌تر است
- ✅ حجم کمتر

---

## 📋 چک‌لیست قبل از Zip:

- [ ] `Dockerfile` موجود است
- [ ] `Dockerfile.dev` موجود است
- [ ] `docker-compose.yml` موجود است
- [ ] `package.json` موجود است
- [ ] `next.config.mjs` موجود است
- [ ] پوشه `src/` کامل است
- [ ] پوشه `public/` کامل است
- [ ] `node_modules/` در zip نیست
- [ ] `.next/` در zip نیست
- [ ] `.git/` در zip نیست (اختیاری)

---

## 📊 حجم تقریبی:

- با zip (بدون node_modules): حدود 5-10 MB
- با Git clone: حدود 2-5 MB
- با node_modules: حدود 200-300 MB (نیازی نیست!)

---

## ⚠️ نکات مهم:

1. **هرگز `node_modules` را نفرستید** - Docker خودش نصب می‌کند
2. **هرگز `.next` را نفرستید** - Docker خودش build می‌کند
3. **فایل `.env` را نفرستید** اگر حاوی اطلاعات حساس است
4. **از Git استفاده کنید** اگر ممکن است - راحت‌تر و سریع‌تر است
