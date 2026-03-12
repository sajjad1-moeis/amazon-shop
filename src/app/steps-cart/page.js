"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Timeline from "@/components/TimeLine";
import DeliveryAddressDemo from "@/template/StepsCart/Step1/Adresses";
import HeaderSection from "@/template/StepsCart/Step1/HeaderSection";
import { Location, Receipt2 } from "iconsax-reactjs";
import PaymentCheckout from "@/template/StepsCart/Step2/PaymentCheckout";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { shoppingCartService } from "@/services/shoppingCart/shoppingCartService";
import { orderService, PaymentMethod, ShippingMethod, InstallmentPlanType } from "@/services/order/orderService";
import { paymentGatewayService } from "@/services/payment/paymentGatewayService";

const steps = [
  { id: 1, label: "سبد خرید", Icon: Location },
  { id: 2, label: "اطلاعات ارسال", Icon: Location },
  { id: 3, label: "تکمیل سفارش", Icon: Receipt2 },
];

const PAYMENT_METHOD_MAP = {
  online: PaymentMethod.OnlinePayment,
  bank: PaymentMethod.CashOnDelivery,
  installment: PaymentMethod.Installment,
  wallet: PaymentMethod.Wallet,
};

export default function Page() {
  const router = useRouter();
  const { user, loading, openAuthModal } = useAuth();
  const [currentStep, setCurrentStep] = useState(2);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      toast.error("برای ادامه و پرداخت وارد حساب کاربری شوید");
      openAuthModal("/steps-cart");
      router.replace("/cart");
      return;
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (currentStep !== 3 || !user?.id) return;
    (async () => {
      try {
        const data = await shoppingCartService.getCart(user.id);
        setCart(data);
      } catch (e) {
        console.error("Error loading cart:", e);
      }
    })();
  }, [currentStep, user?.id]);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmPayment = async (data) => {
    if (!user?.id || !selectedAddressId) {
      toast.error("لطفاً آدرس تحویل را انتخاب کنید");
      return;
    }
    const paymentMethod = PAYMENT_METHOD_MAP[data.paymentMethod] ?? PaymentMethod.OnlinePayment;
    const installmentPlanType =
      data.paymentMethod === "installment"
        ? data.installmentType === "30percent"
          ? InstallmentPlanType.Plan30Percent
          : InstallmentPlanType.Plan20Percent
        : null;

    try {
      const order = await orderService.createOrder({
        userId: user.id,
        userAddressId: selectedAddressId,
        paymentMethod,
        shippingMethod: ShippingMethod.Standard,
        discountCode: cart?.discountCode || undefined,
        installmentPlanType,
        notes: undefined,
        hasIranInsurance: false,
      });

      if (paymentMethod === PaymentMethod.Wallet) {
        await paymentGatewayService.payWithWallet({ orderId: order.id });
        toast.success("سفارش با کیف پول پرداخت شد");
        window.location.href = `/steps-cart/result?success=1&orderId=${order.id}`;
        return;
      }

      if (
        paymentMethod === PaymentMethod.OnlinePayment ||
        paymentMethod === PaymentMethod.Installment
      ) {
        const gate = await paymentGatewayService.requestFromOrder({
          orderId: order.id,
        });
        if (gate?.paymentUrl) {
          window.location.href = gate.paymentUrl;
          return;
        }
      }

      if (paymentMethod === PaymentMethod.CashOnDelivery) {
        toast.success("سفارش ثبت شد");
        window.location.href = `/steps-cart/result?success=1&orderId=${order.id}`;
        return;
      }

      toast.success("سفارش ثبت شد");
      window.location.href = `/steps-cart/result?success=1&orderId=${order.id}`;
    } catch (error) {
      toast.error(error?.message || "خطا در ثبت سفارش یا اتصال به درگاه");
      console.error("Create order / payment error:", error);
    }
  };

  if (loading || !user) {
    return null;
  }

  return (
    <div>
      <HeaderSection />
      <div className="bg-[#F9F9F9] dark:bg-dark-box min-h-screen pb-10">
        <div className="flex flex-col p-4 md:p-8 lg:container">
          <h1 className="text-2xl font-bold text-right">پرداخت سفارش آمازون امارات</h1>
          <p className="text-primary-500 my-4 dark:text-primary-300">{steps[currentStep - 1].label}</p>
          <div>
            <Timeline steps={steps} currentStep={currentStep} />
          </div>
        </div>

        <div className="w-full max-lg:px-5 lg:container mt-32">
          {currentStep === 2 && (
            <DeliveryAddressDemo
              onNext={nextStep}
              onSelectedAddressChange={setSelectedAddressId}
            />
          )}
          {currentStep === 3 && (
            <PaymentCheckout
              orderPrice={cart?.subTotal ?? 0}
              discount={(cart?.discountCodeAmount ?? 0) + (cart?.totalDiscount ?? 0)}
              onConfirm={handleConfirmPayment}
              onBack={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
