import { InstagramBlue, PlaneBlue } from '@/icons'
import React from 'react'

type Props = {
    type: string
    keywords: {
        id: string
        word: string
        automationId: string | null
    }[]
}

const ActiveTrigger = ({ type, keywords }: Props) => {
  return (
    <div className='bg-background-80 p-3 rounded-xl w-full'>
        <div className='flex gap-x-2 items-center'>
            {type === 'COMMENT' ? <InstagramBlue /> : <PlaneBlue />}
            <p className='text-lg'>{type === 'COMMENT' 
                 ? 'کاربر کامنت گذاشت.'
                 : 'کاربر دایرکت پیام فرستاد.'}
            </p>
        </div>
        <p className='text-text-secondary'>{type === 'COMMENT' 
            ? 'اگر کاربر زیر پستی که برای شنیدن کلمات کلیدی تنظیم شده است نظر دهد، این اتوماسیون فعال می شود' 
            : 'اگر کاربر پیامی حاوی یک کلمه کلیدی برای شما ارسال کند، این اتوماسیون فعال می شود'}
        </p>
        <div className='flex ga-2 mt-5 flex-wrap'>
            {keywords.map((word) => (
                <div 
                key={word.id}
                className='bg-background-to-br from-[#2ECCB4] to-[#17665A] flex items-center gap-x-2 capitalize text-white front-light py-1 px-4 rounded-full'
                >
                    <p>{word.word}</p>
                </div> 
            ))}
        </div>
    </div>)
}

export default ActiveTrigger