import AboutServiceCard from "@/components/AboutServiceCard";
import React from "react";

function DirectPurchase() {
  return (
    <AboutServiceCard
      className={"container mt-14"}
      src={"/image/AliEx/aliExBanner.png"}
      title="چطور از علی اکسپرس خرید کنیم؟"
      desc={
        <p>
          علی اکسپرس یکی از خرده‌فروشی‌های بزرگ چین است که به تنوع محصولات، فروشندگان و قیمت‌های متنوع معروف است.خرید از
          علی اکسپرس به صورت مستقیم برای ایرانیان میسر نیست، بنابراین برای خرید از علی اکسپرس به یک واسطه نیاز دارید؛
          مالتینا به عنوان واسطه امن در کنار شماست تا محصولات مورد نظر خود را از علی اکسپرس انتخاب کرده و با پرداخت
          ریالی و تکمیل خرید محصولات را درب منزل تحویل بگیرید.
        </p>
      }
    />
  );
}

export default DirectPurchase;
