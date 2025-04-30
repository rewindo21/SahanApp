import { v4 } from 'uuid'

type Props = {
  id: string
  label: string
  subLabel: string
  description: string
}

export const DASHBOARD_CARDS: Props[] = [
  {
    id: v4(),
    label: 'تنظیم پاسخ‌های خودکار',
    subLabel: 'محصولات را از طریق DM اینستاگرام تحویل دهید',
    description: 'محصولات را در مکان های مختلف در معرض دید دنبال کنندگان خود قرار دهید',
  },
  {
    id: v4(),
    label: 'با هوش مصنوعی به سوالات پاسخ دهید',
    subLabel: 'پرس و جوها را با هوش مصنوعی شناسایی کرده و به آنها پاسخ دهید',
    description: 'شناسایی خودکار هدف پیام',
  },
  {
    id: v4(),
    label: 'با هوش مصنوعی به سوالات پاسخ دهید',
    subLabel: 'پرس و جوها را با هوش مصنوعی شناسایی کرده و به آنها پاسخ دهید',
    description: 'شناسایی خودکار هدف پیام',
  },
]