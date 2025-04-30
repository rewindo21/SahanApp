import { redirect } from 'next/navigation'
import { onCurrentUser } from '../user'
import axios from 'axios'
import { createIntegration, getIntegration } from './queries'
import { generateTokens } from '@/lib/fetch'

export const onOAuthInstagram = (strategy: 'INSTAGRAM' | 'CRM') => {
    if (strategy === 'INSTAGRAM') {
      return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string)
    }
}

// Function to integrate Instagram with the user's account.
export const onIntegrate = async (code: string) => {
  const user = await onCurrentUser() // Fetch the current user.

  try {
    // Check if user has an integration
    const integration = await getIntegration(user.id)

    if (integration && integration.integrations.length === 0) {
      // Generate tokens for the user
      const token = await generateTokens(code)

      // if token is exists, get the instagram id of the user
      if (token) {
        const insta_id = await axios.get(
          `${process.env.INSTAGRAM_BASE_URL}/me?fields=user_id&access_token=${token.access_token}`
        )

        // Create an integration and set the expiration date to 60 days
        const today = new Date()
        const expire_date = today.setDate(today.getDate() + 60)
        const create = await createIntegration(
          user.id,
          token.access_token,
          new Date(expire_date),
          insta_id.data.user_id
        )
        return { status: 200, data: create }
      }
      return { status: 401 }
    }
    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}
  