import { useState } from 'react'
import { useAppDispatch } from '@/store'
import { signInUser } from '@/store/reducers/user-reducer'
import { Button } from '@/components/ui/Button/Button'
import { useSearchParams } from 'react-router-dom'

export const SignIn = () => {
  const [form, setForm] = useState({ login: '', password: '' })
  const [searchParams] = useSearchParams()
  const [query] = useState(searchParams.get('redirectUrl'))
  const dispatch = useAppDispatch()

  const handleForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => dispatch(signInUser(form, query))

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}>
        <label>
          <span>Логин</span>
          <input
            onChange={e => handleForm('login', e.target.value)}
            type="text"
            name={'login'}
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            onChange={e => handleForm('password', e.target.value)}
            type="password"
            name={'password'}
          />
        </label>
        <Button
          text={'войти'}
          useFixWidth={true}
          onClick={() => handleSubmit()}
        />
      </form>
      <Button text={'Регистрация'} useFixWidth={true} href={'/sign-up'} />
    </>
  )
}
