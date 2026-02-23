"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import { userDashboardService } from "@/services/userDashboard/userDashboardService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function formatDate(val) {
  if (!val) return "-";
  try {
    return new Date(val).toLocaleDateString("fa-IR");
  } catch {
    return String(val);
  }
}

export default function SupportTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userDashboardService
      .getRecentTickets(5)
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        setTickets(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setTickets([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6 flex justify-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6" style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}>
      <div className="flex items-start justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h3 className="md:text-lg text-gray-700 dark:text-dark-titre mb-2">آخرین تیکتهای پشتیبانی</h3>
          <p className="text-xs md:text-sm text-gray-500 dark:text-caption">وضعیت آخرین درخواستهای شما</p>
        </div>
        <Link
          href="/dashboard/support"
          className="text-yellow-600 border-0 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-sm p-0"
        >
          مشاهده همه تیکت ها
        </Link>
      </div>

      {tickets.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-dark-text py-4">تیکتی وجود ندارد</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {tickets.map((ticket) => {
            const status = ticket.status ?? "processing";
            const getButtonClassName = () => {
              if (status === "answered" || status === "closed") {
                return "border-2 border-primary-700 text-primary-700 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-900/20";
              }
              return "bg-primary-600 text-white hover:bg-primary-700 dark:bg-dark-primary dark:hover:bg-primary-600";
            };
            return (
              <div
                key={ticket.id}
                className={cn("p-3 rounded-2xl border transition-colors bg-gray-50 dark:bg-dark-field border-gray-200 dark:border-dark-stroke")}
              >
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm md:text-base font-medium text-gray-800 dark:text-dark-titre mb-2">
                      {ticket.title ?? ticket.subject ?? `تیکت #${ticket.id}`}
                    </p>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-dark-text mb-3">
                      تاریخ : {formatDate(ticket.createdAt ?? ticket.date)}
                    </p>
                  </div>
                  <div className="mb-3">
                    <StatusBadge status={status} />
                  </div>
                </div>
                <Link href={`/dashboard/support/${ticket.id}`}>
                  <Button
                    variant="ghost"
                    className={cn("items-center w-full text-center px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-colors", getButtonClassName())}
                  >
                    {status === "answered" || status === "closed" ? "نمایش" : "مشاهده تیکت"}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
