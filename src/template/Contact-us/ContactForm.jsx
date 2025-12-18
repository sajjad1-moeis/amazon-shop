"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { contactService } from "@/services/contact/contactService";
import FormField from "./FormField";

const INITIAL_FORM_DATA = {
  fullName: "",
  email: "",
  message: "",
};

const VALIDATION_RULES = {
  fullName: {
    required: true,
    maxLength: 200,
    errorMessages: {
      required: "نام و نام خانوادگی الزامی است",
      maxLength: "نام و نام خانوادگی نمی‌تواند بیشتر از 200 کاراکتر باشد",
    },
  },
  email: {
    required: true,
    maxLength: 200,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessages: {
      required: "آدرس ایمیل الزامی است",
      pattern: "فرمت ایمیل معتبر نیست",
      maxLength: "ایمیل نمی‌تواند بیشتر از 200 کاراکتر باشد",
    },
  },
  message: {
    required: true,
    maxLength: 5000,
    errorMessages: {
      required: "متن پیام الزامی است",
      maxLength: "متن پیام نمی‌تواند بیشتر از 5000 کاراکتر باشد",
    },
  },
};

export default function ContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (name, value) => {
    const rules = VALIDATION_RULES[name];
    if (!rules) return "";

    if (rules.required && !value.trim()) {
      return rules.errorMessages.required;
    }

    if (rules.maxLength && value.trim().length > rules.maxLength) {
      return rules.errorMessages.maxLength;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return rules.errorMessages.pattern;
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("لطفاً تمام فیلدها را به درستی پر کنید");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await contactService.create({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      if (response.success) {
        toast.success(response.message || "پیام شما با موفقیت ارسال شد");
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
      } else {
        toast.error(response.message || "خطا در ارسال پیام");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ارسال پیام. لطفاً دوباره تلاش کنید");
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-transparent h-max">
      <h3 className="text-lg lg:text-2xl font-bold mb-2 text-right text-gray-700 dark:text-dark-titre">
        ارسال پیام برای تیم میکرولس
      </h3>
      <p className="text-gray-400 dark:text-dark-text mb-6 text-right max-lg:text-sm">
        برای هرگونه سوال، پیشنهاد یا درخواست پشتیبانی می‌توانید از طریق فرم زیر یا اطلاعات تماس درج‌شده با ما در ارتباط
        باشید.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            label="نام و نام خانوادگی"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            placeholder="نام خود را وارد کنید"
            disabled={isSubmitting}
          />
          <FormField
            label="آدرس ایمیل"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            placeholder="ایمیل خود را وارد کنید"
            disabled={isSubmitting}
          />
        </div>

        <FormField
          label="متن پیام"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          error={errors.message}
          placeholder="متن پیام خود را وارد کنید"
          disabled={isSubmitting}
        />

        <Button
          size="lg"
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 hover:bg-yellow-500 w-1/2 text-primary-800 max-lg:w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال پیام"}
        </Button>
      </form>
    </div>
  );
}






