"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateDiscountPage() {
  const [formData, setFormData] = useState({
    code: "",
    type: "percentage",
    value: "",
    minPurchase: "",
    maxDiscount: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ایجاد کوپن:", formData);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ایجاد کوپن جدید</h1>
        <p className="text-gray-400">ایجاد کوپن تخفیف جدید</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">اطلاعات کوپن</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">کد کوپن</Label>
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="WELCOME20"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">نوع تخفیف</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="percentage">درصدی</SelectItem>
                    <SelectItem value="fixed">مقدار ثابت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-gray-300">مقدار</Label>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  placeholder={formData.type === "percentage" ? "20" : "50000"}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">حداقل خرید (تومان)</Label>
                <Input
                  type="number"
                  value={formData.minPurchase}
                  onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  placeholder="100000"
                />
              </div>
              <div>
                <Label className="text-gray-300">حداکثر تخفیف (تومان)</Label>
                <Input
                  type="number"
                  value={formData.maxDiscount}
                  onChange={(e) => setFormData({ ...formData, maxDiscount: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  placeholder="500000"
                />
              </div>
            </div>
            <div>
              <Label className="text-gray-300">محدودیت استفاده</Label>
              <Input
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white mt-2"
                placeholder="100"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">تاریخ شروع</Label>
                <Input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  required
                />
              </div>
              <div>
                <Label className="text-gray-300">تاریخ پایان</Label>
                <Input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white mt-2"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 w-full">
              ایجاد کوپن
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

