import React from 'react'
import { BlueAddIcon } from '@/icons'
import PopOver from '../../popover'

type Props = {
  children: React.ReactNode
  label: string
}

// A button component that triggers a popover with customizable content and a label
const TriggerButton = ({ children, label }: Props) => {
  return (
    <PopOver
      className="w-[400px]"
      trigger={
        <div className="border-2 border-dashed w-full border-[#229987] hover:opacity-80 cursor-pointer transition duration-100 rounded-xl flex gap-x-2 justify-center items-center p-5 mt-4">
          <BlueAddIcon />
          <p className="text-[#d4d7e2] font-bold">{label}</p>
        </div>
      }
    >
      {children}
    </PopOver>
  )
}

export default TriggerButton