import IndexLayout from "@/layout/IndexLayout";
import InvoiceCart from "@/template/Cart/InvoiceCart";
import ProductList from "@/template/Cart/ProductList";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <div className="bg-[#FAFAFA] p-8">
        <div className="grid grid-cols-4 container h-full gap-8">
          <div className="md:col-span-3">
            <div
              className="flex-between text-gray-700 py-1.5 px-3 w-fit rounded"
              style={{ background: "linear-gradient(90deg, rgba(137, 149, 214, 0) 0%, rgba(137, 149, 214, 0.3) 100%)" }}
            >
              🟩 خرید از فروشگاه امازون امارات
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
