import IntroductionCard from "@/components/IntroductionCard";
import IndexLayout from "@/layout/IndexLayout";
import ContactSection from "@/template/Contact-us/ContactSection";
import React from "react";

function Page() {
  return (
    <IndexLayout>
      <IntroductionCard title={"تماس با ما"} items={[{ label: "تماس با ما" }]} />
      <ContactSection />
    </IndexLayout>
  );
}

export default Page;
