import { v4 } from "uuid";

type Props = {
  id: string;
  label: string;
  subLabel: string;
  description: string;
};

export const DASHBOARD_CARDS: Props[] = [
  {
    id: v4(),
    label: "آنالیز فایل های CSV",
    subLabel: "سرعت بخشیدن به آنایز رفتار کاربرانتان",
    description: "فایل های CSV مختلف در دیتابیس خود را آپلود کنید",
  },
  {
    id: v4(),
    label: "با هوش مصنوعی به سوالات پاسخ دهید",
    subLabel: "",
    description: "یه زودی ...",
  },
  {
    id: v4(),
    label: "اتومات سازی دایرکت و کامنت اینستاگرام",
    subLabel: "",
    description: "به زودی ...",
  },
];
