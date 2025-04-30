import { onBoardUser } from '@/actions/user'
import { redirect } from 'next/navigation'

type Props = {}

// Asynchronous React component to handle user onboarding and redirection logic.
const Page = async (props: Props) => {
    
    // If the user onboarding is successful, redirect the user to their personalized dashboard.
    const user = await onBoardUser()
    if (user.status === 200 || user.status === 201) {
        return redirect(`/dashboard/${user.data?.firstname}${user.data?.lastname}`)
    }

    return redirect('/sign-in') 
}

export default Page