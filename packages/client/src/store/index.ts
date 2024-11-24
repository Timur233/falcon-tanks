import authReducer from '@/store/reducers/auth-reducer'
import themeReducer, { BASE_THEME_ALIAS } from '@/store/reducers/theme-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { combineReducers } from '@reduxjs/toolkit'

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
}

const initialState =
  typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE

if (initialState) {
  initialState.themeReducer.themeAlias =
    window.sessionStorage.getItem('themeAlias') || BASE_THEME_ALIAS
}

export const rootReducer = combineReducers({
  authReducer,
  themeReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comment: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export type InferAppActions<T> = T extends {
  [keys: string]: (...args: unknown[]) => infer U
}
  ? U
  : never
