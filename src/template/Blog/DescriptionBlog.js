import TitleCard from "@/components/TitleCard";
import React from "react";

function DescriptionBlog() {
  return (
    <div className="mt-32">
      {/* Introduction Section */}
      <section>
        <TitleCard title={"مقدمه"} />
        <p className="text-gray-700 leading-7 text-right mt-8">
          خرید از آمازون همیشه یکی از جذاب‌ترین گزینه‌ها برای دسترسی به محصولات اصل و متنوع دنیا بوده است. اما برای
          کاربران ایرانی، این فرآیند ممکن است کمی پیچیده به‌نظر برسد. در این مقاله قدم‌به‌قدم به شما نشان می‌دهیم که
          چگونه از آمازون آمریکا خرید کنید و کالا را بدون دردسر به ایران برسانید . شما کالا را به ضمانت ما خریداری می
          کنید
        </p>
      </section>
      <section className="mt-14">
        <TitleCard title={"جمع‌بندی"} />
        <p className="text-gray-700 leading-7 text-right mt-8">
          خرید از آمازون همیشه یکی از جذاب‌ترین گزینه‌ها برای دسترسی به محصولات اصل و متنوع دنیا بوده است. اما برای
          کاربران ایرانی، این فرآیند ممکن است کمی پیچیده به‌نظر برسد. در این مقاله قدم‌به‌قدم به شما نشان می‌دهیم که
          چگونه از آمازون آمریکا خرید کنید و کالا را بدون دردسر به ایران برسانید . شما کالا را به ضمانت ما خریداری می
          کنید
        </p>
      </section>
    </div>
  );
}

export default DescriptionBlog;
