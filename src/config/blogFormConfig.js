export const FORM_STYLES = {
  input: "bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-600",
  selectTrigger: "bg-gray-800 border border-gray-700 text-white focus:ring-gray-600",
  selectContent: "bg-gray-800 border-gray-700 text-white",
  selectItem: "text-white focus:bg-gray-700",
  label: "text-gray-300",
  card: "bg-gray-800 border border-gray-700 shadow-lg rounded-xl",
  cardTitle: "text-white text-xl",
};

export const STATUS_OPTIONS = [
  { value: "1", label: "پیش‌نویس" },
  { value: "2", label: "منتشر شده" },
  { value: "3", label: "بایگانی" },
  { value: "4", label: "زمان‌بندی شده" },
];

export const FORM_SECTIONS = {
  basic: {
    title: "اطلاعات پایه",
    fields: [
      {
        id: "title",
        name: "title",
        type: "text",
        label: "عنوان وبلاگ",
        placeholder: "عنوان وبلاگ را وارد کنید",
        required: true,
        gridCols: "md:col-span-1",
      },
      {
        id: "slug",
        name: "slug",
        type: "text",
        label: "Slug",
        placeholder: "اگر خالی باشد، از عنوان ساخته می‌شود",
        required: false,
        gridCols: "md:col-span-1",
      },
      {
        id: "categoryId",
        name: "categoryId",
        type: "select",
        label: "دسته‌بندی",
        placeholder: "دسته‌بندی را انتخاب کنید",
        required: true,
        optionsKey: "categories",
        getOptionValue: (item) => item.id.toString(),
        getOptionLabel: (item) => item.name,
        gridCols: "md:col-span-1",
      },
      {
        id: "status",
        name: "status",
        type: "select",
        label: "وضعیت انتشار",
        required: true,
        options: STATUS_OPTIONS,
        gridCols: "md:col-span-1",
      },
      {
        id: "scheduledPublishAt",
        name: "scheduledPublishAt",
        type: "datetime-local",
        label: "تاریخ و زمان انتشار",
        required: false,
        gridCols: "md:col-span-2",
        conditional: (formData) => formData.status === "4",
      },
      {
        id: "isFeatured",
        name: "isFeatured",
        type: "checkbox",
        label: "بلاگ ویژه",
        checkboxLabel: "بلاگ ویژه باشد",
        gridCols: "md:col-span-1",
      },
      {
        id: "allowComments",
        name: "allowComments",
        type: "checkbox",
        label: "اجازه ثبت نظر",
        checkboxLabel: "اجازه ثبت نظر",
        gridCols: "md:col-span-1",
      },
    ],
  },
  content: {
    title: "محتوای وبلاگ",
    fields: [
      {
        id: "shortDescription",
        name: "shortDescription",
        type: "textarea",
        label: "توضیحات کوتاه",
        placeholder: "توضیحات کوتاه وبلاگ را وارد کنید",
        required: true,
        rows: 5,
        minHeight: "min-h-[120px]",
      },
      {
        id: "content",
        name: "content",
        type: "textarea",
        label: "محتوای وبلاگ",
        placeholder: "محتوای کامل وبلاگ را وارد کنید",
        required: true,
        rows: 20,
        minHeight: "min-h-[400px]",
      },
    ],
  },
  meta: {
    title: "اطلاعات SEO",
    fields: [
      {
        id: "metaTitle",
        name: "metaTitle",
        type: "text",
        label: "Meta Title",
        placeholder: "عنوان SEO",
        required: false,
        gridCols: "md:col-span-1",
      },
      {
        id: "metaDescription",
        name: "metaDescription",
        type: "text",
        label: "Meta Description",
        placeholder: "توضیحات SEO",
        required: false,
        gridCols: "md:col-span-1",
      },
      {
        id: "metaKeywords",
        name: "metaKeywords",
        type: "text",
        label: "Meta Keywords",
        placeholder: "کلمات کلیدی (با کاما جدا کنید)",
        required: false,
        gridCols: "md:col-span-2",
      },
    ],
  },
};





