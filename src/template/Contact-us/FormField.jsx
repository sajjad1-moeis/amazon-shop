"use client";

import React from "react";

export default function FormField({ label, name, type = "text", value, onChange, error, placeholder, disabled, rows }) {
  const inputClasses = `border rounded-md px-3 py-2 text-sm outline-none dark:bg-dark-field dark:border-dark-stroke ${
    error ? "border-red-500" : ""
  }`;

  return (
    <div className="flex flex-col text-right">
      <label className="mb-2 text-gray-700 dark:text-dark-titre">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={`${inputClasses} resize-none h-32`}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
          disabled={disabled}
        />
      )}
      {error && <span className="text-red-500 text-xs mt-1 text-right">{error}</span>}
    </div>
  );
}




