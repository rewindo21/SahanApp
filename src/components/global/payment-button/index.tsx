import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-ubscription'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription()
  return (
    <Button
      className="bg-gradient-to-br text-white rounded-full from-[#2ECCB4] via-[#229987] font-bold to-[#17665A]"
      disabled={isProcessing}
      onClick={onSubscribe}
    >
      {/* COMMENT FOR STRIPE */}
      {/* {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />} */}
      ارتقا
    </Button>
  )
}

export default PaymentButton