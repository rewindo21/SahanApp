import {
  AutomationDuoToneWhite,
  ContactsDuoToneWhite,
  FileDuoToneWhite,
  HomeDuoToneWhite,
  RocketDuoToneWhite,
  SettingsDuoToneWhite,
} from "@/icons";

export const PAGE_BREAD_CRUMBS: string[] = [
  "contacts",
  "automations",
  "analyse",
  "integrations",
  "settings",
];

type Props = {
  [page in string]: React.ReactNode;
};

export const PAGE_NAME_FA: { [key: string]: string } = {
  HOME: "خانه",
  AUTOMATIONS: "اتوماسیون",
  ANALYSE: "آنالیز کامنت",
  INTEGRATIONS: "اتصال",
  SETTINGS: "تنظیمات",
};

export const PAGE_ICON: Props = {
  AUTOMATIONS: <AutomationDuoToneWhite />,
  CONTACTS: <ContactsDuoToneWhite />,
  ANALYSE: <FileDuoToneWhite />,
  INTEGRATIONS: <RocketDuoToneWhite />,
  SETTINGS: <SettingsDuoToneWhite />,
  HOME: <HomeDuoToneWhite />,
};

export const PLANS = [
  {
    name: "پلن رایگان",
    description: "سریعترین روش برای استفاده از سهن",
    price: "بدون هزینه",
    features: [
      "آپلود ماهیانه دو فایل",
      "دسترسی همیشگی به داکیومنت های آنالیز شده",
      "با سرعت معمولی و آنالیز دقیق",
    ],
    cta: "شروع کنید",
  },
  {
    name: "پلن حرفه ای سهن",
    description: "با پیشرفته ترین امکانات",
    price: "2 میلیون تومان",
    features: [
      "آپلود بینهایت فایل",
      "دسترسی همیشگی به داکیومنت های آنالیز شده",
      "با سریعترین سرعت و آنالیز دقیق",
    ],
    cta: "ارتقا",
  },
];
