"use client";

import React from "react";
import DynamicField from "./DynamicField";

export default function FormSection({
  section,
  formData,
  onChange,
  onSelectChange,
  optionsData = {},
  styles,
}) {
  const getFieldOptions = (field) => {
    if (field.options) return field.options;
    if (field.optionsKey && optionsData[field.optionsKey]) {
      return optionsData[field.optionsKey];
    }
    return [];
  };

  const hasGrid = section.fields.some((field) => field.gridCols);

  return (
    <div className={hasGrid ? "grid md:grid-cols-2 gap-4" : "space-y-4"}>
      {section.fields.map((field) => (
        <DynamicField
          key={field.id}
          field={field}
          value={formData[field.name]}
          formData={formData}
          onChange={onChange}
          onSelectChange={onSelectChange}
          options={getFieldOptions(field)}
          styles={styles}
        />
      ))}
    </div>
  );
}

