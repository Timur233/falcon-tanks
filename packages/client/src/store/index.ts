import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '@/store/reducers/user-reducer'
import { useDispatch } from 'react-redux'

import { combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  UserReducer,
})
export const store = configureStore({
  reducer: rootReducer,
})

window.store = store
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
