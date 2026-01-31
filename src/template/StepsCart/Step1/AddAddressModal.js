"use client";

import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ADDRESS_FORM_FIELDS } from "@/data";
import { DEFAULT_FORM_DATA } from "@/hooks/use-address";

export default function AddressForm({ isOpen, onClose, defaultValues, onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues || DEFAULT_FORM_DATA,
  });

  useEffect(() => {
    if (isOpen) {
      reset(defaultValues || DEFAULT_FORM_DATA);
    }
  }, [isOpen, defaultValues, reset]);

  const groupedFields = useMemo(() => {
    const groups = [];
    let currentGroup = null;

    ADDRESS_FORM_FIELDS.forEach((field) => {
      if (field.gridCols === 1) {
        if (currentGroup) {
          groups.push(currentGroup);
          currentGroup = null;
        }
        groups.push({ fields: [field], gridCols: 1 });
      } else {
        if (!currentGroup || currentGroup.gridCols !== 2) {
          if (currentGroup) groups.push(currentGroup);
          currentGroup = { fields: [], gridCols: 2 };
        }
        currentGroup.fields.push(field);

        if (currentGroup.fields.length === 2) {
          groups.push(currentGroup);
          currentGroup = null;
        }
      }
    });

    if (currentGroup && currentGroup.fields.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  }, []);

  const renderField = (field) => {
    const commonProps = {
      ...register(field.id, {
        required: field.required ? `${field.label || field.placeholder} الزامی است` : false,
      }),
      className: "bg-gray-50 dark:bg-dark-field dark:border-none max-md:placeholder:text-xs",
      placeholder: field.placeholder,
    };

    const hasError = errors[field.id];

    if (field.type === "textarea") {
      return (
        <div>
          <Textarea
            {...commonProps}
            className="bg-gray-50 min-h-[100px] max-md:placeholder:text-xs  dark:bg-dark-field dark:border-none"
          />
          {hasError && <p className="text-sm text-red-500 mt-1">{hasError.message}</p>}
        </div>
      );
    }

    return (
      <div>
        <Input {...commonProps} type={field.type} />
        {hasError && <p className="text-sm text-red-500 mt-1">{hasError.message}</p>}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="sm:max-w-[600px]  max-h-[90vh] overflow-y-auto dark:bg-dark-box dark:border-dark-stroke">
        <DialogHeader className="text-right">
          <DialogTitle className="text-lg md:text-2xl font-medium mb-2">ثبت اطلاعات آدرس و گیرنده</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            لطفاً محل تحویل سفارش خود را روی نقشه مشخص کنید.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          {groupedFields.map((group, groupIndex) => (
            <div key={groupIndex} className={group.gridCols === 2 ? "grid grid-cols-2 gap-4" : "grid gap-2"}>
              {group.fields.map((field) => (
                <div key={field.id} className="grid gap-2">
                  {field.label && (
                    <Label htmlFor={field.id} className="text-right">
                      {field.label}
                    </Label>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="ghost"
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-yellow-400 text-white py-3 rounded-lg dark:text-gray-900"
          >
            تأیید و ثبت آدرس
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
