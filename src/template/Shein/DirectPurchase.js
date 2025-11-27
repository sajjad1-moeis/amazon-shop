import AboutServiceCard from "@/components/AboutServiceCard";
import React from "react";

function DirectPurchase() {
  return (
    <div className="container">
      <AboutServiceCard
        src={"/image/Shein/banner.png"}
        title="خرید از SHEIN چگونه انجام می شود؟"
        desc={
          <>
            <p>
              با توجه به شرایط فعلی و تحریم‌ها، برخی از مردم ایران ممکن است در خرید از برند shein با محدودیت‌ هایی روبرو
              شوند. برای رفع این مشکل، استفاده از روش‌ های جایگزین مانند واسطه‌ها یا پلتفرم‌های خرید آنلاین ضروری است.
              در این راستا، میکرولس به عنوان یک پلتفرم معتبر واسطه، این امکان را برای کاربران ایرانی فراهم کرده است تا
              به راحتی و با اطمینان از فروشگاه‌های بین‌المللی معروف، از جمله شین، خرید کنند. این پلتفرم با ارائه خدمات
              متنوع و امنیت بالا، تجربه خرید آنلاین را برای کاربران ایرانی به سطحی جدید و مطمئن می‌رساند.
            </p>
          </>
        }
      />
    </div>
  );
}

export default DirectPurchase;
