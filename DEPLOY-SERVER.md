# راهنمای دیپلوی فرانت روی سرور

## ۱. پول گرفتن آخرین نسخه

```bash
cd /root/amazon-shop
# یا مسیر واقعی فرانت روی سرور

git fetch origin
git checkout seyed-custom-changes
git pull origin seyed-custom-changes
```

## ۲. اجرا با Docker

آدرس بک‌اند به‌صورت پیش‌فرض `http://107.161.175.45:8080/api` در بیلد قرار می‌گیرد. برای بیلد و اجرا:

```bash
docker compose build --no-cache app
docker compose up -d
```

اگر خواستی آدرس API یا base URL را عوض کنی، در همان پوش یک فایل `.env` بساز و بعد بیلد کن:

```bash
echo 'NEXT_PUBLIC_API_URL=http://107.161.175.45:8080/api' >> .env
echo 'NEXT_PUBLIC_BASE_URL=http://107.161.175.45' >> .env
docker compose build --no-cache app
docker compose up -d
```

## ۳. اگر بدون داکر اجرا می‌کنی

قبل از بیلد آدرس API را بگذار:

```bash
echo 'NEXT_PUBLIC_API_URL=http://107.161.175.45:8080/api' > .env.local
npm ci && npm run build && npm run start
```

---

| مورد | مقدار |
|------|--------|
| آدرس فرانت | http://107.161.175.45:3000 |
| آدرس بک‌اند API | http://107.161.175.45:8080 |
| برنچ | `seyed-custom-changes` |
