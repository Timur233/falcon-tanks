import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/store/reducers/auth-reducer'
import { useDispatch } from 'react-redux'

import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  authReducer,
})
export const store = configureStore({
  reducer: rootReducer,
})

const g: (typeof globalThis & Record<string, unknown>) | null =
  typeof globalThis === 'object'
    ? globalThis
    : typeof window === 'object'
    ? window
    : typeof global === 'object'
    ? global
    : null;

if (g !== null) {
  g.store = store;
}
declare global {
  interface Window {
    store: typeof store
  }
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comment: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type InferAppActions<T> = T extends {
  [keys: string]: (...args: unknown[]) => infer U
}
  ? U
  : never
