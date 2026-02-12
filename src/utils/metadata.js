/**
 * Helper functions for generating metadata
 */

export function createMetadata({ title, description, keywords, image, url }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://micrls.com";
  const defaultImage = `${siteUrl}/image/logo-blue.png`;

  return {
    title,
    description,
    keywords: keywords?.join(", ") || "",
    openGraph: {
      title,
      description,
      url: url || siteUrl,
      siteName: "میکرولس",
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "fa_IR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image || defaultImage],
    },
    alternates: {
      canonical: url || siteUrl,
    },
  };
}

