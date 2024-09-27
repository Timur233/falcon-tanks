import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, InferAppActions } from '@/store'
import backendApi from '@/api/backendApi'

export type UserType = {
  avatar: string | null
  display_name: string | null
  email: string | null
  first_name: string | null
  id: string | null
  login: string | null
  phone: string | null
  second_name: string | null
}

const initialState = {
  user: null as unknown as UserType,
}

const slice = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload
    },
  },
})

const UserReducer = slice.reducer
export const { actions } = slice

export const getUser = () => async (dispatch: AppDispatch) => {
  await backendApi({
    method: 'get',
    url: `${import.meta.env.VITE_AUTH_URL}/auth/user`,
  })
    .then((data: { data: UserType }) => {
      if (data) {
        dispatch(actions.setUser(data.data))
      }
    })
    .catch((error) => {
      console.error(error)
    })
}

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await backendApi({
    method: 'post',
    url: `${import.meta.env.VITE_AUTH_URL}/auth/logout`,
  })
    .then(() => {
      dispatch(actions.setUser(null))
      window.location.href = '/'
    })
    .catch((error) => {
      console.error(error)
    })
}

export const signInUser =
  (form: { login: string; password: string }, query?: string | null) =>
  (dispatch: AppDispatch) => {
    return backendApi({
      method: 'post',
      url: `${import.meta.env.VITE_AUTH_URL}/auth/signin`,
      data: form,
    })
      .then(data => {
        if (data) {
          dispatch(actions.setUser(data))
          dispatch(getUser())

          if (query) {
            window.location.href = query
          } else {
            window.location.href = '/game'
          }
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

export const signUpUser =
  (form: { login: string; password: string }) => (dispatch: AppDispatch) => {
    backendApi({
      method: 'post',
      url: `${import.meta.env.VITE_AUTH_URL}/auth/signup`,
      data: form,
    })
      .then((data: { data: UserType }) => {
        if (data) {
          dispatch(actions.setUser(data.data))
          dispatch(getUser())
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

export type ActionsType = InferAppActions<typeof actions>
export default UserReducer
