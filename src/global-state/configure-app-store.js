import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { reducer } from './'

export function configureAppStore() {
  const obj = {
    reducer,
    middleware: getDefaultMiddleware()
  }
  const store = configureStore(obj)
  return store
}
