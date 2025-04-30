import { useQueryUser } from "@/hooks/user-queries"

type Props = {
  type: 'FREE' | 'PRO'
  children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type }: Props) => {
  // WIP: return subscription of user
  const { data } = useQueryUser()
  // if user subscription plan is equal to type, return children
  return data?.data?.subscription?.plan === type && children
}