import { PlaneBlue, SmartAi, TinyInstagram } from '@/icons'
import { v4 } from 'uuid'


export type AutomationListenerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'SMARTAI' | 'MESSAGE'
}

export type AutomationsTriggerProps = {
    id: string
    label: string
    icon: JSX.Element
    description: string
    type: 'COMMENT' | 'DM'
}
  

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
    {
      id: v4(),
      label: 'برای کاربر پیام بفرست',
      icon: <PlaneBlue />,
      description: 'پیامی که میخواهید برای کاربر ارسال شود را وارد کنید',
      type: 'MESSAGE',
    },
    {
      id: v4(),
      label: 'استفاده از هوش مصنوعی سهن',
      icon: <SmartAi />,
      description: 'به هوش مصنوعی درمورد پروژه ات بگو (برای استفاده پلن خود را ارتقا دهید.',
      type: 'SMARTAI',
    },
]

export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[] = [
    {
      id: v4(),
      label: 'کاربر برای پستم کامنت گذاشت',
      icon: <TinyInstagram />,
      description: 'برای ایجاد اتوماسیون روی پست ها انتخاب کنید',
      type: 'COMMENT',
    },
    {
      id: v4(),
      label: 'کاربر در دایرکیت پیام برایم فرستاد',
      icon: <TinyInstagram />,
      description: 'برای ایجاد اتوماسیون روی دایرکت های خود انخاب کنید',
      type: 'DM',
    },
]