/**
 * استایل‌های مشترک برای فیلدهای فیلتر (Input، Select و Textarea)
 * این استایل‌ها برای دارک مود و لایت مود یکسان هستند
 */

// استایل‌های Input
export const filterInputStyles = "dark:bg-dark-field dark:border-dark-stroke";

// استایل‌های Textarea
export const filterTextareaStyles = "dark:bg-dark-field dark:border-dark-stroke";

// استایل‌های SelectTrigger - همه Select ها باید از این استفاده کنند
// شامل استایل‌های مشترک: عرض، گپ و دارک مود
export const filterSelectTriggerStyles = "w-fit gap-2  md:gap-5 dark:bg-dark-field dark:border-dark-stroke";

// استایل‌های SelectContent - همه Select ها باید از این استفاده کنند
export const filterSelectContentStyles = "dark:bg-dark-box dark:border-dark-stroke";

// استایل‌های SelectItem
export const filterSelectItemStyles = "dark:hover:bg-dark-field dark:text-dark-title";
