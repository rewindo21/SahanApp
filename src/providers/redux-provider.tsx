'use client'
import React from 'react'
import { store } from '@/redux/store'
import { Provider } from 'react-redux'

// This component, `ReduxProvider`, wraps the application with the Redux store provider to enable state management using Redux.
// - It imports the `store` from the Redux setup and uses the `Provider` component from `react-redux`.
// - `children` are passed as props, allowing any components within this provider to access the Redux store.
// - The component ensures seamless integration of Redux in a Next.js app.
type Props = {
  children: React.ReactNode
}

const ReduxProvider = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider