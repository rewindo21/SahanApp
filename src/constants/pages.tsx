import {
    AutomationDuoToneBlue,
    ContactsDuoToneBlue,
    FileDuoToneWhite,
    HomeDuoToneBlue,
    RocketDuoToneBlue,
    SettingsDuoToneWhite,
  } from '@/icons'
  
  export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'analyse',
    'integrations',
    'settings',
  ]
  
  type Props = {
    [page in string]: React.ReactNode
  }
  
  export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoToneBlue />,
    CONTACTS: <ContactsDuoToneBlue />,
    ANALYSE: <FileDuoToneWhite />,
    INTEGRATIONS: <RocketDuoToneBlue />,
    SETTINGS: <SettingsDuoToneWhite />,
    HOME: <HomeDuoToneBlue />,
  }
  
  export const PLANS = [
    {
      name: 'پلن رایگان',
      description: 'سریعترین روش برای استفاده از سهن',
      price: 'بدون هزینه',
      features: [
        'لورم ایپسی با تولامفهوم از صنعتار گیرد.',
        'ابا تولید سادگاده از روزنامه',
        'ابا تولید سادگاده از روزنامه',
      ],
      cta: 'شروع کنید',
    },
    {
      name: 'پلن حرفه ای سهن',
      description: 'با پیشرفته ترین امکانات',
      price: '2 میلیون تومان',
      features: [
        'لورم ستفاده از روزنامه و مقرار گیرد.',
        'اب از ص روید ستفاده از روزنامه',
        'اختگی با توپ، ستفاده از روزنامه',
      ],
      cta: 'ارتقا',
    },
  ]