import axios from 'axios'
import { useState } from 'react'

// hook to manage subscription processing.
// If the payment initiation is successful (status 200), it redirects the user to the provided session URL.
// Maintains a loading state (`isProcessing`) to indicate ongoing processing.
export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const onSubscribe = async () => {
    setIsProcessing(true)
    const response = await axios.get('/api/payment')
    if (response.data.status === 200) {
      return (window.location.href = `${response.data.session_url}`)
    }

    setIsProcessing(false)
  }

  return { onSubscribe, isProcessing }
}