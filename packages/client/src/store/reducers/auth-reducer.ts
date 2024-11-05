import backendApi from '@/api/backendApi'
import { InferAppActions } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

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
  name: 'authReducer',
  initialState,
  reducers: {
    setUser(state, actions) {
      state.user = actions.payload
    },
  },
})

const authReducer = slice.reducer
export const { actions } = slice

export const getUser = createAsyncThunk('AuthUser/getUser', async thunkAPI => {
  try {
    const response = await backendApi({
      method: 'get',
      url: '/auth/user',
    })
    return response.data
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    // @ts-ignore
    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export const logoutUser = createAsyncThunk(
  'AuthUser/logoutUser',
  async thunkAPI => {
    try {
      const response = await backendApi({
        method: 'post',
        url: '/auth/logout',
      })
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      // @ts-ignore
      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

type TypeSignInForm = {
  login: string
  password: string
}

export const signInUser = createAsyncThunk(
  'AuthUser/signInUser',
  async (data: { form: TypeSignInForm }, thunkAPI) => {
    try {
      const response = await backendApi({
        method: 'post',
        url: '/auth/signin',
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

type TypeSignUpForm = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export const signUpUser = createAsyncThunk(
  'AuthUser/signUpUser',
  async (data: { form: TypeSignUpForm }, thunkAPI) => {
    try {
      const response = await backendApi({
        method: 'post',
        url: '/auth/signup',
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

export type ActionsType = InferAppActions<typeof actions>
export default authReducer
