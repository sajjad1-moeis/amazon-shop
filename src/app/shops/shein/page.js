import AboutServiceCard from "@/components/AboutServiceCard";
import ProductPurchaseForm from "@/components/module/ProductPurchaseForm";
import ShopsLayout from "@/layout/ShopsLayout";
import ShoppingTraining from "@/template/Shein/ShoppingTraining";
import AvailableProducts from "@/template/Shein/AvailableProducts";
import DirectPurchase from "@/template/Shein/DirectPurchase";
import React from "react";

function Page() {
  return (
    <ShopsLayout
      direct={<DirectPurchase />}
      title={"شین"}
      src="/image/Shops/shein.png"
      imgClassName={"max-md:max-h-44"}
    >
      <div class="bg-gray-50">
        <ProductPurchaseForm />
        <AvailableProducts />
        <AboutServiceCard
          className={"container max-md:mt-14"}
          src={"/image/Shein/banner3.png"}
          title="مزایای خرید از شی این امارات"
          desc={
            <>
              <p>
                شیک پوشان می‌توانند به راحتی لباس مورد نظر خود را از مجموعه شین امارات خریداری کنند. در این مجموعه به
                طور کلی بهترین محصولات با کیفیت عالی عرضه می‌شوند. همینطور شرایط به صورتی است که جدیدترین لباس‌های روز
                دنیا و لباس‌هایی که هنوز وارد بازار ایران نشده اند را سفارش دهید. شما این امکان را خواهید داشت که
                بتوانید محصولاتی کاملاً با کیفیت خریداری کنید.
              </p>
              <p>
                خرید از سایت شین دبی با تخفیف نیز فراهم شده است. یعنی شما بسته به فصل مشخص این امکان را خواهید داشت که
                محصول مورد نظر را تهیه کنید. البته می‌توانید پیشنهادات ویژه شین را نیز دنبال کنید.
              </p>
              <p>
                با خرید از شین امارات دیگر نیاز به صرف زمان زیاد در بازار نخواهید داشت و می‌توانید سریعاً خرید خود را به
                صورت آنلاین به ثبت برسانید. خرید از شاین عمارت برای ایرانیان با بهترین شرایط فراهم شده و هزینه‌ها نیز به
                طور دقیق محاسبه می‌شوند.
              </p>
            </>
          }
        />
        <ShoppingTraining />
      </div>
    </ShopsLayout>
  );
}

export default Page;
