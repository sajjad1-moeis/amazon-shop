import React from "react";
import IndexLayout from "@/layout/IndexLayout";
import HeroSection from "@/template/About-us/HeroSection";
import LandingSection from "@/template/About-us/LandingSection";
import TeamSite from "@/template/About-us/TeamSite";

export const metadata = {
  title: "درباره ما | معرفی مأموریت، ارزش‌ها و داستان برند",
  description: "با داستان برند، مأموریت، ارزش‌ها و تیم ما آشنا شوید. تلاش ما ارائه بهترین تجربه برای شماست.",
  keywords: ["درباره ما", "داستان برند", "معرفی شرکت", "مأموریت", "ارزش‌ها", "تیم ما"],
};

function Page() {
  return (
    <IndexLayout>
      <HeroSection />
      <LandingSection />
      <TeamSite />
    </IndexLayout>
  );
}

export default Page;
