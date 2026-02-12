import React from "react";
import { createMetadata } from "@/utils/metadata";
import IndexLayout from "@/layout/IndexLayout";
import HeroSection from "@/template/About-us/HeroSection";
import LandingSection from "@/template/About-us/LandingSection";
import TeamSite from "@/template/About-us/TeamSite";

export async function generateMetadata() {
  return createMetadata({
    title: "درباره ما | معرفی مأموریت، ارزش‌ها و داستان برند",
    description: "با داستان برند، مأموریت، ارزش‌ها و تیم ما آشنا شوید. تلاش ما ارائه بهترین تجربه برای شماست.",
    keywords: ["درباره ما", "داستان برند", "معرفی شرکت", "مأموریت", "ارزش‌ها", "تیم ما"],
    url: "/about-us",
  });
}

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
