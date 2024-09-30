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

export type PasswordData = {
  oldPassword: string
  newPassword: string
}

const initialState = {
  user: null as unknown as UserType,
}

const slice = createSlice({
  name: 'UserReducer',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    updateAvatar(state, action) {
      if (state.user) {
        state.user.avatar = action.payload
      }
    },
  },
})

const UserReducer = slice.reducer
export const { actions } = slice

export const saveUserData =
  (userData: UserType) => async (dispatch: AppDispatch) => {
    await backendApi({
      method: 'put',
      url: '/user/profile',
      data: userData,
    })
      .then((response: { data: UserType }) => {
        if (response.data) {
          dispatch(actions.setUser(response.data))
        }
      })
      .catch(error => {
        console.error('Error saving user data:', error)
      })
  }

export const changeUserPassword =
  (passwordData: PasswordData) => async (dispatch: AppDispatch) => {
    await backendApi({
      method: 'put',
      url: '/user/password',
      data: passwordData,
    })
      .then((response: { data: UserType }) => {
        if (response.data) {
          dispatch(actions.setUser(response.data))
        }
      })
      .catch(error => {
        console.error('Error changing user password:', error)
      })
  }

export const changeUserAvatar =
  (file: File) => async (dispatch: AppDispatch) => {
    const formData = new FormData()
    formData.append('avatar', file)

    await backendApi({
      method: 'put',
      url: '/user/profile/avatar',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response: { data: { avatar: string } }) => {
        if (response.data) {
          dispatch(actions.updateAvatar(response.data.avatar))
        }
      })
      .catch(error => {
        console.error('Error changing avatar:', error)
      })
  }

export type ActionsType = InferAppActions<typeof actions>
export default UserReducer
