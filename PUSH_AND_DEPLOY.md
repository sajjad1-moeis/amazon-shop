# پوش کردن ترکیب sjd-custom + تغییرات شما و دیپلوی روی سرور

## مرحله ۱: ادغام تغییرات احراز هویت (اختیاری ولی توصیه می‌شود)

الان روی `sjd-custom` هستید. اگر می‌خواهید اصلاحات کامل auth (trim شماره/کد، نرمال در Verify و Resend) هم داخل همین برنچ باشد، یک بار merge کنید:

```bash
cd /Users/Mac/source_code/Amamzon_Shop_microless/amazon-shop

git merge feature/auth-api-integration -m "Merge auth fixes (verify/resend trim, cleanedCode) into sjd-custom"
```

اگر کانفلیک آمد، فایل‌ها را باز کنید، علامت‌های `<<<<<<<` / `=======` / `>>>>>>>` را حل کنید، بعد:

```bash
git add .
git commit -m "Resolve merge conflicts"
```

---

## مرحله ۲: انتخاب برنچ برای پوش

### گزینه الف — پوش روی برنچ جدید (پیشنهادی)

برنچ جدید بسازید تا هم `sjd-custom` دست نخورده بماند هم یک برنچ مشخص برای دیپلوی داشته باشید:

```bash
# ساخت برنچ جدید از وضعیت فعلی
git checkout -b production
# یا اسم دیگر مثلاً:  git checkout -b deploy-sjd-auth

# پوش به ریموت
git push -u origin production
```

روی سرور بعداً از همین برنچ پول می‌گیرید: `git checkout production` و `git pull origin production`.

### گزینه ب — پوش روی برنچ اصلی (master)

اگر می‌خواهید همین ترکیب روی master باشد:

```bash
git checkout master
git pull origin master
git merge sjd-custom -m "Merge sjd-custom into master for production"
# در صورت کانفلیک حل کنید و commit
git push origin master
```

### گزینه ج — پوش مستقیم روی sjd-custom

اگر مالک/مسئول این برنچ هستید و می‌خواهید همان را روی سرور استفاده کنید:

```bash
# بعد از merge در مرحله ۱ (در صورت تمایل)
git push origin sjd-custom
```

---

## مرحله ۳: روی سرور — دیپلوی فرانت

بعد از اینکه یک برنچ را پوش کردید، روی سرور:

```bash
cd ~/front_amazon

git fetch origin
git checkout production
git pull origin production

docker compose build --no-cache app
docker compose up -d
```

اگر از **master** پوش زدید، به‌جای `production` از `master` استفاده کنید:

```bash
git checkout master
git pull origin master
```

اگر از **sjd-custom** پوش زدید:

```bash
git checkout sjd-custom
git pull origin sjd-custom
```

بعد در هر حالت:

```bash
docker compose build --no-cache app
docker compose up -d
```

---

## خلاصه پیشنهادی (برنچ جدید)

```bash
# لوکال
cd /Users/Mac/source_code/Amamzon_Shop_microless/amazon-shop
git merge feature/auth-api-integration -m "Merge auth fixes into sjd-custom"
git checkout -b production
git push -u origin production

# سرور
cd ~/front_amazon
git fetch origin && git checkout production && git pull origin production
docker compose build --no-cache app && docker compose up -d
```
