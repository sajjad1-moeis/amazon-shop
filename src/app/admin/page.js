"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ShoppingBag, ShoppingCart, TrendingUp, DollarSign, Package } from "lucide-react";

// داده‌های تستی
const stats = [
  {
    title: "کل کاربران",
    value: "2,456",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    change: "+12.5%",
  },
  {
    title: "محصولات",
    value: "1,234",
    icon: ShoppingBag,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    change: "+8.2%",
  },
  {
    title: "سفارشات امروز",
    value: "89",
    icon: ShoppingCart,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    change: "+15.3%",
  },
  {
    title: "درآمد امروز",
    value: "12.5M",
    icon: DollarSign,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    change: "+22.1%",
  },
  {
    title: "درآمد ماهانه",
    value: "245M",
    icon: TrendingUp,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    change: "+18.7%",
  },
  {
    title: "محصولات موجود",
    value: "856",
    icon: Package,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    change: "+5.4%",
  },
];

const recentOrders = [
  {
    id: 1,
    customer: "علی محمدی",
    product: "لپ تاپ Dell",
    amount: 45000000,
    status: "در حال پردازش",
    date: "1403/09/20",
  },
  { id: 2, customer: "مریم احمدی", product: "گوشی سامسونگ", amount: 32000000, status: "ارسال شده", date: "1403/09/20" },
  { id: 3, customer: "حسین رضایی", product: "هدفون Sony", amount: 8500000, status: "تحویل شده", date: "1403/09/19" },
  { id: 4, customer: "فاطمه کریمی", product: "ساعت هوشمند", amount: 12000000, status: "در انتظار", date: "1403/09/19" },
  {
    id: 5,
    customer: "محمد صادقی",
    product: "تبلت iPad",
    amount: 55000000,
    status: "در حال پردازش",
    date: "1403/09/19",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl text-white mb-2">داشبورد ادمین</h1>
        <p className="max-md:text-sm text-gray-400">خوش آمدید به پنل مدیریت فروشگاه</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-sm font-medium text-gray-300  ">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="text-xl md:text-2xl  text-white mb-1">{stat.value}</div>
                <p className="text-xs text-green-400">{stat.change} از ماه قبل</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="p-3">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl text-white mb-2 font-medium">آخرین سفارشات</CardTitle>
            <CardDescription className="text-gray-400">سفارشات اخیر سیستم</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-4 mt-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{order.customer}</p>
                    <p className="text-gray-400 text-xs">{order.product}</p>
                    <p className="text-gray-400 text-xs mt-1">{order.date}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-white text-sm font-medium">{order.amount.toLocaleString()} تومان</p>
                    <p className="text-gray-400 text-xs">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">وضعیت سیستم</CardTitle>
            <CardDescription className="text-gray-400">وضعیت کلی سیستم</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">CPU</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Memory</span>
                <span className="text-white font-medium">62%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "62%" }}></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Storage</span>
                <span className="text-white font-medium">38%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "38%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
