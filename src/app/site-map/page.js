import IntroductionCard from "@/components/IntroductionCard";
import IndexLayout from "@/layout/IndexLayout";
import React from "react";

function Page() {
  const sections = [
    {
      title: "صفحات اصلی",
      rightLinks: [
        { label: "صفحه اصلی", href: "/" },
        { label: "دسته بندی محصولات", href: "/products" },
        { label: "درباره ما", href: "/about" },
        { label: "تماس با ما", href: "/contact" },
        { label: "قوانین و مقررات", href: "/terms" },
      ],
      leftLinks: [
        { label: "سوالات متداول", href: "/brands-faq" },
        { label: "نقشه سایت", href: "/footer" },
        { label: "سبد خرید", href: "/cart" },
        { label: "تجربه خریداران", href: "/experiences" },
      ],
    },
    {
      title: "آموزشی",
      rightLinks: [
        { label: "راهنمای خدمات سایت", href: "/guides" },
        { label: "لیست مقالات", href: "/article" },
        { label: "شرایط استفاده از امتیازات", href: "/guides?section=points-terms" },
      ],
      leftLinks: [
        { label: "راهنمای خرید از آمازون", href: "/guides?section=amazon-guide" },
        { label: "خدمات گمرکی و حمل و نقل", href: "/guides?section=customs-shipping" },
        { label: "سیاست ارسال و بازگشت کالا", href: "/guides?section=shipping-return" },
      ],
    },
    {
      title: "خدمات ویژه",
      rightLinks: [
        { label: "خرید از آمازون امارات", href: "/products?store=amazon-uae" },
        { label: "خرید از ایبی", href: "/products?store=ebay" },
        { label: "خرید از علی اکسپرس", href: "/products?store=aliexpress" },
      ],
      leftLinks: [
        { label: "خرید از شین", href: "/products?store=shein" },
        { label: "خرید از نون امارات", href: "/products?store=noon-uae" },
        { label: "خرید از ایکیا", href: "/products?store=ikea" },
      ],
    },
  ];

  return (
    <IndexLayout>
      <IntroductionCard title="سوالات متداول" items={[{ label: "سوالات متداول" }]} />

      <div className="pt-10 pb-20 bg-gray-50 max-md:px-4">
        <div className="bg-white py-8 md:px-4 container rounded-2xl border-2 border-gray-200">
          <div className=" space-y-6">
            {sections.map((section, index) => (
              <div key={index}>
                {index > 0 && <div className="border-t border-gray-200 my-6"></div>}

                <div className="grid grid-cols-2 gap-8">
                  {/* Right Column */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-1 h-8 bg-primary-400 rounded-l"></div>
                      <h2 className="text-xl md:text-2xl font-bold text-primary-600">{section.title}</h2>
                    </div>
                    <ul className="space-y-2">
                      {section.rightLinks.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm text-[#C99C14] hover:text-amber-800 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#C99C14] rounded-full"></span>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Left Column */}
                  <div className="space-y-3">
                    <div className="h-6"></div> {/* Spacer for alignment */}
                    <ul className="space-y-2">
                      {section.leftLinks.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm text-[#C99C14] hover:text-amber-800 transition-colors flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 bg-[#C99C14] rounded-full"></span>
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
