import { userThemeApi } from '@/api/userThemeApi'
import { RootState } from '@/store'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { logoutUser } from './auth-reducer'

export const BASE_THEME_ALIAS = 'standart'

export interface UserThemeState {
  themeAlias: string
  error: string | null
}

/**
 * Название темы из sessionStorage
 */
const savedTheme =
  window.sessionStorage.getItem('themeAlias') || BASE_THEME_ALIAS

/**
 * Начальное состояние
 */
const initialState: UserThemeState = {
  themeAlias: savedTheme,
  error: null,
}

/**
 * Слайс с обработкой запросов к серверу
 */
const slice = createSlice({
  name: 'userTheme',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      console.log('setTheme', action.payload)

      state.themeAlias = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTheme.fulfilled, (state, action: PayloadAction<string>) => {
        state.themeAlias = action.payload
        window.sessionStorage.setItem('themeAlias', action.payload)
      })
      .addCase(getTheme.rejected, state => {
        state.error = 'Ошибка ответа от сервера'
      })
      .addCase(
        updateTheme.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.themeAlias = action.payload
          window.sessionStorage.setItem('themeAlias', action.payload)
        }
      )
      .addCase(updateTheme.rejected, (state, action) => {
        state.error = action.payload = 'Ошибка ответа от сервера'
      })
      .addCase(logoutUser.fulfilled, state => {
        state.themeAlias = BASE_THEME_ALIAS
        window.sessionStorage.setItem('themeAlias', BASE_THEME_ALIAS)
      })
  },
})

export const { actions } = slice

/**
 * Запрос на получение темы пользователя
 */
export const getTheme = createAsyncThunk<string, void, { rejectValue: string }>(
  'UserTheme/getTheme',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState
      const user = state.authReducer.user

      if (user && user.id) {
        const response = await userThemeApi.getTheme(parseFloat(user.id))

        return response.data.theme.theme_alias
      }

      return BASE_THEME_ALIAS
    } catch (err: any) {
      if (!err.response) {
        throw err
      }

      return thunkAPI.rejectWithValue(err.response.data)
    }
  }
)

/**
 * Запрос на обновление темы пользователя
 */
export const updateTheme = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('UserTheme/updateTheme', async (newThemeAlias: string, thunkAPI) => {
  try {
    const state = thunkAPI.getState() as RootState
    const user = state.authReducer.user

    if (user && user.id) {
      const response = await userThemeApi.setTheme(
        parseFloat(user.id),
        newThemeAlias
      )

      return response.data.theme.theme_alias
    }

    return BASE_THEME_ALIAS
  } catch (err: any) {
    if (!err.response) {
      throw err
    }

    return thunkAPI.rejectWithValue(err.response.data)
  }
})

export default slice.reducer
