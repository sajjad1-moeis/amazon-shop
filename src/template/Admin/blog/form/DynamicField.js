"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FORM_STYLES } from "./blogFormConfig";

export default function DynamicField({
  field,
  value,
  formData,
  onChange,
  onSelectChange,
  options = [],
  styles = FORM_STYLES,
}) {
  if (field.conditional && !field.conditional(formData)) {
    return null;
  }

  const renderField = () => {
    switch (field.type) {
      case "text":
      case "datetime-local":
        return (
          <Input
            id={field.id}
            name={field.name}
            type={field.type}
            value={value || ""}
            onChange={onChange}
            placeholder={field.placeholder}
            className={styles.input}
            required={field.required}
          />
        );

      case "textarea":
        return (
          <Textarea
            id={field.id}
            name={field.name}
            value={value || ""}
            onChange={onChange}
            placeholder={field.placeholder}
            className={`${styles.input} ${field.minHeight || ""}`}
            rows={field.rows}
            required={field.required}
          />
        );

      case "select":
        const selectValue = value ? value.toString() : "";
        return (
          <Select
            value={selectValue}
            onValueChange={(val) => onSelectChange(field.name, val)}
          >
            <SelectTrigger className={styles.selectTrigger}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent className={styles.selectContent}>
              {options.map((option) => {
                const optionValue = typeof option === "string" ? option : (field.getOptionValue ? field.getOptionValue(option) : option.value);
                const optionLabel = typeof option === "string" ? option : (field.getOptionLabel ? field.getOptionLabel(option) : option.label);
                return (
                  <SelectItem key={optionValue} value={optionValue} className={styles.selectItem}>
                    {optionLabel}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        );

      case "checkbox":
        return (
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id={field.id}
              name={field.name}
              checked={value || false}
              onChange={onChange}
              className="w-4 h-4"
            />
            <Label htmlFor={field.id} className={`${styles.label} cursor-pointer`}>
              {field.checkboxLabel || field.label}
            </Label>
          </div>
        );

      default:
        return null;
    }
  };

  const containerClass = field.gridCols ? `space-y-2 ${field.gridCols}` : "space-y-2";

  return (
    <div className={containerClass}>
      {field.type !== "checkbox" && (
        <Label htmlFor={field.id} className={styles.label}>
          {field.label} {field.required && "*"}
        </Label>
      )}
      {renderField()}
    </div>
  );
}

