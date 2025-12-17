"use client";

import React from "react";
import Image from "next/image";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <div className="w-full mt-14 md:mt-20 container">
      <ContactInfo />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-20 h-max">
        <ContactForm />
        <div className="relative aspect-square h-2/3 w-full rounded-xl">
          <Image
            src="/image/Contact-Us/location.png"
            alt="نقشه موقعیت دفتر میکرولس"
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
