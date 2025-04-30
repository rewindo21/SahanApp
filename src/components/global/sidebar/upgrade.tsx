import React from 'react'
import PaymentButton from '../payment-button'
// import PaymentButton from '../payment-button'

type Props = {}

const UpgradeCard = (props: Props) => {
  return (
    <div className="bg-[#252525] p-3 rounded-2xl flex flex-col gap-y-3">
      <span className="text-sm">
        ارتقا به {''}
        <span
          className="bg-gradient-to-r 
        from-[#17665A] 
        to-[#2ECCB4] 
        font-bold 
        bg-clip-text 
        text-transparent"
        >
          هوش مصنوعی پیشرفته
        </span>
      </span>
      {/* <p className="text-[#9B9CA0] font-light text-sm">
        اضافه شدن امکانات بیشتر <br /> به همراه هوش مصنوعی و ...
      </p> */}
      <PaymentButton />
    </div>
  )
}

export default UpgradeCard