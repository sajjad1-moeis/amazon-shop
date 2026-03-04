# برگشت به نسخهٔ من (قبل از merge با sjd-custom)

اگر خواستی دوباره دقیقاً روی همان نسخه‌ای باشی که قبل از ادغام با برنچ سجاد داشتی:

```bash
git checkout test-backup
```

یا اگر روی برنچ `test` هستی و می‌خواهی محتوای test را با بکاپ عوض کنی:

```bash
git reset --hard test-backup
```

- **test-backup** = همان کامیت «نسخه من قبل از merge با sjd-custom» (شامل product page + productHelpers + sessionStorage/ASIN fallback).
- بعد از برگشت، در صورت نیاز: `git checkout test` و کار روی test را ادامه بده.
