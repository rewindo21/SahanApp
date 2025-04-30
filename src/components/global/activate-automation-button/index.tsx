import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useQueryAutomation } from '@/hooks/user-queries'
import { useMutationData } from '@/hooks/use-mutation-data'
import { ActiveAutomation } from '@/icons/active-automation'
import { activateAutomation } from '@/actions/automations'

type Props = {
  id: string
}

const ActivateAutomationButton = ({ id }: Props) => {
  // fetch some automation data
  const { data } = useQueryAutomation(id)
  // setup optimistic ui
  const { mutate, isPending } = useMutationData(
    ['activate'],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    'automation-info'
  )
  
  return (
    <Button
      disabled={isPending}
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#2ECCB4] font-medium to-[#17665A] ml-4"
    >
      {/* Set the loading state */}
      {isPending ? <Loader2 className="animate-spin" /> : <ActiveAutomation />}

        {/* Set the activate state */}
      <p className="lg:inline hidden">
        {data?.data?.active ? 'غیر فعال کردن' : 'فعالسازی'}
      </p>
    </Button>
  )
}

export default ActivateAutomationButton