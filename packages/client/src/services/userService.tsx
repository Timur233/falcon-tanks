import { useAppDispatch } from '@/store'
import { actions, getUser, UserType } from '@/store/reducers/auth-reducer'

export const userService = {
  async fetchUser(dispatch: ReturnType<typeof useAppDispatch>) {
    try {
      const data: UserType = await dispatch(getUser()).unwrap()
      dispatch(actions.setUser(data))
      window.sessionStorage.setItem('userIsLogged', '1')
      return true
    } catch {
      window.sessionStorage.setItem('userIsLogged', '0')
      return false
    }
  },

  isLoggedIn() {
    if (typeof window !== 'undefined') {
      return window.sessionStorage.getItem('userIsLogged') === '1'
    }
    return false
  },
}
