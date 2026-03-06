"use client";

import React, { useState } from "react";
import { Code, ArrowDown2 } from "iconsax-reactjs";

function formatValue(val) {
  if (val === null) return "null";
  if (val === undefined) return "—";
  if (typeof val === "boolean") return val ? "بله" : "خیر";
  if (typeof val === "number") return String(val);
  if (typeof val === "string") return val;
  if (Array.isArray(val)) return `[${val.length} آیتم]`;
  if (typeof val === "object") return "{...}";
  return String(val);
}

function DataRow({ label, value, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const isObject = value !== null && typeof value === "object" && !Array.isArray(value);
  const isArray = Array.isArray(value);

  if (isObject) {
    const keys = Object.keys(value);
    return (
      <div className="border-b border-gray-600/50">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-2 py-2 text-right hover:bg-gray-600/30 transition-colors"
          style={{ paddingRight: depth * 12 }}
        >
          <ArrowDown2 size={16} className={`text-gray-400 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
          <span className="text-gray-400 font-medium">{label}:</span>
          <span className="text-gray-500 text-sm">{`{${keys.length} فیلد}`}</span>
        </button>
        {open && (
          <div className="pr-4 pb-2">
            {keys.map((k) => (
              <DataRow key={k} label={k} value={value[k]} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (isArray) {
    return (
      <div className="border-b border-gray-600/50">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full flex items-center gap-2 py-2 text-right hover:bg-gray-600/30 transition-colors"
          style={{ paddingRight: depth * 12 }}
        >
          <ArrowDown2 size={16} className={`text-gray-400 shrink-0 transition-transform ${open ? "" : "-rotate-90"}`} />
          <span className="text-gray-400 font-medium">{label}:</span>
          <span className="text-gray-500 text-sm">{`[${value.length} آیتم]`}</span>
        </button>
        {open && (
          <div className="pr-4 pb-2 space-y-1">
            {value.map((item, i) => (
              <div key={i} className="pl-4 border-r-2 border-gray-600">
                {typeof item === "object" && item !== null && !Array.isArray(item) ? (
                  Object.entries(item).map(([k, v]) => (
                    <DataRow key={k} label={k} value={v} depth={depth + 1} />
                  ))
                ) : (
                  <div className="py-1 flex justify-between gap-4">
                    <span className="text-gray-400">[{i}]</span>
                    <span className="text-gray-200">{formatValue(item)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="flex justify-between items-start gap-4 py-2 text-sm"
      style={{ paddingRight: depth * 12 }}
    >
      <span className="text-gray-400 shrink-0">{label}:</span>
      <span className="text-gray-200 text-left break-all">{formatValue(value)}</span>
    </div>
  );
}

export default function OrderRawData({ rawResponse, order }) {
  const [showJson, setShowJson] = useState(false);
  const data = rawResponse && typeof rawResponse.data !== "undefined" ? rawResponse.data : order;

  if (!data && !rawResponse) return null;

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 overflow-hidden">
      <div className="p-4 border-b border-gray-600 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Code size={20} />
          تمام داده‌های ریسپانس API
        </h2>
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="text-sm text-blue-400 hover:text-blue-300"
        >
          {showJson ? "نمایش ساختار" : "نمایش JSON"}
        </button>
      </div>
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {showJson ? (
          <pre className="text-xs text-gray-300 bg-gray-800/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap break-words font-mono" dir="ltr">
            {JSON.stringify(rawResponse || order, null, 2)}
          </pre>
        ) : (
          <div className="space-y-0">
            {rawResponse && (
              <>
                <div className="text-gray-500 text-xs mb-2">ساختار کامل ریسپانس:</div>
                <DataRow label="statusCode" value={rawResponse.statusCode} />
                <DataRow label="success" value={rawResponse.success} />
                <DataRow label="message" value={rawResponse.message} />
                <DataRow label="data" value={rawResponse.data} />
              </>
            )}
            {!rawResponse && data && (
              <>
                <div className="text-gray-500 text-xs mb-2">ساختار شیء سفارش (data):</div>
                {Object.entries(data).map(([k, v]) => (
                  <DataRow key={k} label={k} value={v} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
