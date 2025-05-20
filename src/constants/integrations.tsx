import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons";

type Props = {
  title: string;
  icon: React.ReactNode;
  description: string;
  strategy: "INSTAGRAM" | "CRM";
};

export const INTEGRATION_CARDS: Props[] = [
  {
    title: "اینستاگرام",
    description: "به زودی ...",
    icon: <InstagramDuoToneBlue />,
    strategy: "INSTAGRAM",
  },
  {
    title: "یوتیوب",
    description: "به زودی ...",
    icon: <SalesForceDuoToneBlue />,
    strategy: "CRM",
  },
];
