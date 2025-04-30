import { InstagramDuoToneBlue, SalesForceDuoToneBlue } from "@/icons"

type Props = {
  title: string
  icon: React.ReactNode
  description: string
  strategy: 'INSTAGRAM' | 'CRM'
}

export const INTEGRATION_CARDS: Props[] = [
  {
    title: 'اینستاگرام',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.',
    icon: <InstagramDuoToneBlue />,
    strategy: 'INSTAGRAM',
    
  },
  {
    title: 'یوتیوب',
    description:
      'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ.',
    icon: <SalesForceDuoToneBlue />,
    strategy: 'CRM',
  },
]