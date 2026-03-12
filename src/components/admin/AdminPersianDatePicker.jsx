"use client";

import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const ADMIN_PICKER_STYLES = `
.admin-persian-date-picker.rmdp-wrapper,
.rmdp-container .admin-persian-date-picker.ep-arrow::after { z-index: 9999 !important; background-color: #1f2937 !important; }
.admin-persian-date-picker .rmdp-calendar { background-color: #1f2937 !important; }
.admin-persian-date-picker .rmdp-header-values,
.admin-persian-date-picker .rmdp-week-day,
.admin-persian-date-picker .rmdp-day span { color: #e5e7eb !important; }
.admin-persian-date-picker .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover { background-color: #374151 !important; color: #fff !important; }
.admin-persian-date-picker .rmdp-day.rmdp-selected span:not(.highlight),
.admin-persian-date-picker .rmdp-day.rmdp-today span { background-color: #2563eb !important; color: #fff !important; }
.admin-persian-date-picker .rmdp-arrow { border-color: #9ca3af !important; }
.admin-persian-date-picker .rmdp-arrow-container:hover { background-color: #374151 !important; }
.admin-persian-date-picker .rmdp-month-picker,
.admin-persian-date-picker .rmdp-year-picker { background-color: #1f2937 !important; }
.admin-persian-date-picker .rmdp-month-picker .rmdp-ym,
.admin-persian-date-picker .rmdp-year-picker .rmdp-ym { color: #e5e7eb !important; }
.admin-persian-date-picker .rmdp-month-picker .rmdp-ym:hover,
.admin-persian-date-picker .rmdp-year-picker .rmdp-ym:hover { background-color: #374151 !important; color: #fff !important; }
.admin-persian-date-picker .rmdp-shadow { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.3), 0 2px 4px -2px rgb(0 0 0 / 0.2); }
`;

/**
 * دیت‌پیکر شمسی فقط برای ادمین.
 * - نمایش و انتخاب: فارسی (شمسی)
 * - value / onChange: همیشه انگلیسی YYYY-MM-DD برای سرور
 */
export default function AdminPersianDatePicker({ value, onChange, placeholder = "تاریخ را انتخاب کنید", className, ...rest }) {
  const pickerValue = value
    ? (() => {
        try {
          return new DateObject({ date: new Date(value), calendar: persian, locale: persian_fa });
        } catch {
          return undefined;
        }
      })()
    : undefined;

  const handleChange = (d) => {
    if (!d) {
      onChange?.("");
      return;
    }
    try {
      const g = new DateObject(d.toDate());
      onChange?.(g.format("YYYY-MM-DD"));
    } catch {
      onChange?.("");
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ADMIN_PICKER_STYLES }} />
      <DatePicker
      calendar={persian}
      locale={persian_fa}
      value={pickerValue}
      onChange={handleChange}
      placeholder={placeholder}
      format="YYYY/MM/DD"
      containerClassName="w-full"
      inputClass={`bg-gray-700 border border-gray-600 text-white rounded-md h-9 px-3 w-full text-sm ${className || ""}`}
      calendarPosition="bottom-right"
      zIndex={9999}
      className="admin-persian-date-picker"
      {...rest}
    />
    </>
  );
}
