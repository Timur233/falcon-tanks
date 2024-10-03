import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { InferAppActions } from '@/store'
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

type InitialState = {
  user: UserType
}

const initialState: InitialState = {
  user: null as unknown as UserType,
}

const slice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

const userReducer = slice.reducer
export const { actions } = slice

export const saveUserData = createAsyncThunk(
  'User/saveUserData',
  async (data: { form: UserType | null }, thunkAPI) => {
    try {
      const response = await backendApi({
        method: 'put',
        url: '/user/profile',
        data: data.form,
      })
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const changeUserPassword = createAsyncThunk(
  'User/changeUserPassword',
  async (
    passwordData: { oldPassword: string; newPassword: string },
    thunkAPI
  ) => {
    try {
      const response = await backendApi({
        method: 'put',
        url: '/user/password',
        data: passwordData,
      })
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export const changeUserAvatar = createAsyncThunk(
  'User/changeUserAvatar',
  async (file: File, thunkAPI) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)

      const response = await backendApi({
        method: 'put',
        url: '/user/profile/avatar',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data.avatar
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

export type ActionsType = InferAppActions<typeof actions>
export default userReducer
