import IndexLayout from "@/layout/IndexLayout";
import InvoiceCart from "@/template/Cart/InvoiceCart";
import ProductList from "@/template/Cart/ProductList";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div className="bg-[#FAFAFA] dark:bg-dark-bg p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4  xl:container h-full gap-8">
          <div className="lg:col-span-2 xl:col-span-3">
            <div
              className="flex-between text-gray-700 dark:text-dark-title py-1.5 px-3 w-fit rounded"
              style={{ background: "linear-gradient(90deg, rgba(137, 149, 214, 0) 0%, rgba(137, 149, 214, 0.3) 100%)" }}
            >
              <img src="/image/emarat.png" className="w-5 ml-2" /> خرید از فروشگاه امازون امارات
            </div>
            <ProductList />
          </div>
          <InvoiceCart />
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
