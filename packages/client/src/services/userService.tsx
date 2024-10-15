import { actions, UserType, getUser } from '@/store/reducers/auth-reducer'
import { useAppDispatch } from '@/store'

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
    return window.sessionStorage.getItem('userIsLogged') === '1'
  },
}
