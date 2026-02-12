import IntroductionCard from "@/components/IntroductionCard";
import { createMetadata } from "@/utils/metadata";
import IndexLayout from "@/layout/IndexLayout";
import ContactSection from "@/template/Contact-us/ContactSection";
import React from "react";

export async function generateMetadata() {
  return createMetadata({
    title: "تماس با ما | پشتیبانی و ارتباط با میکرولس",
    description:
      "با ما در تماس باشید. تیم پشتیبانی میکرولس آماده پاسخگویی به سوالات و راهنمایی شما در تمام مراحل خرید است.",
    keywords: ["تماس با ما", "پشتیبانی", "ارتباط", "راهنمایی", "سوالات", "میکرولس"],
    url: "/contact-us",
  });
}

function Page() {
  return (
    <IndexLayout>
      <IntroductionCard title={"تماس با ما"} items={[{ label: "تماس با ما" }]} />
      <ContactSection />
    </IndexLayout>
  );
}

export default Page;
