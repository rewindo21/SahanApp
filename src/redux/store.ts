'use client'

import AutmationReducer from '@/redux/slices/automation'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'

// This code sets up a Redux store for managing application state in a Next.js "use client" component. 
// - `AutmationReducer` is added to the `rootReducer` using `combineReducers`. 
// - The `store` is configured with default middleware, disabling `serializableCheck` for flexibility. 
// - Types `RootState` and `AppDispatch` are defined for type-safe state and dispatch usage. 
// - A `useAppSelector` hook is created as a typed version of `useSelector` for convenient access to the state.
const rootReducer = combineReducers({
  AutmationReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector