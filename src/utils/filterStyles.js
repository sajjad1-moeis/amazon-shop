/**
 * استایل‌های مشترک برای فیلدهای فیلتر (Input، Select و Textarea)
 * این استایل‌ها برای دارک مود و لایت مود یکسان هستند
 */

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

export const adminFilterSelectTriggerStyles =
  "w-full md:w-fit gap-2  md:gap-5 bg-gray-800 bg-opacity-50 border border-gray-700 ";

export const adminFilterSelectContentStyles = "bg-gray-800";

export const adminFilterInputStyles =
  "w-full md:w-fit gap-2  md:gap-5  bg-transparent max-md:bg-garay-800 border border-gray-700";

export const adminFilterBtn = "bg-gray-800";

export const adminFilterDrawer = "bg-gray-800";
