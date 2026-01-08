/**
 * استایل‌های مشترک برای فیلدهای فیلتر (Input، Select و Textarea)
 * این استایل‌ها برای دارک مود و لایت مود یکسان هستند
 */

import { FORM_STYLES } from "@/template/Admin/formStyles";

// استایل‌های Input
export const filterInputStyles = "dark:bg-dark-field dark:border-dark-stroke max-md:placeholder:text-sm";

// استایل‌های Textarea
export const filterTextareaStyles = "dark:bg-dark-field dark:border-dark-stroke";

// استایل‌های SelectTrigger - همه Select ها باید از این استفاده کنند
// شامل استایل‌های مشترک: عرض، گپ و دارک مود
export const filterSelectTriggerStyles = "w-full md:w-fit gap-2  md:gap-5 dark:bg-dark-field dark:border-dark-stroke";

// استایل‌های SelectContent - همه Select ها باید از این استفاده کنند
export const filterSelectContentStyles = "dark:bg-dark-box dark:border-dark-stroke";

// استایل‌های SelectItem
export const filterSelectItemStyles = "dark:hover:bg-dark-field dark:text-dark-title";

export const adminFilterSelectTriggerStyles = FORM_STYLES.selectTrigger + "w-full md:w-fit gap-2";

export const adminFilterSelectContentStyles = FORM_STYLES.selectContent;

export const adminFilterInputStyles = FORM_STYLES.input;

export const adminFilterBtn = FORM_STYLES.button;

export const adminFilterDrawer = FORM_STYLES.card;
