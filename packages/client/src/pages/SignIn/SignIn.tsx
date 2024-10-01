import { useState } from 'react'
import { useAppDispatch } from '@/store'
import { signInUser } from '@/store/reducers/auth-reducer'
import { Button } from '@/components/ui/Button/Button'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const SignIn = () => {
  const [form, setForm] = useState({ login: '', password: '' })
  const [searchParams] = useSearchParams()
  const [query] = useState(searchParams.get('redirectUrl'))
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const handleForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => {
    dispatch(signInUser({form: form, query: query}))
      .unwrap()
      .then((response: any) => {
        navigate('/game')
      })
      .catch((error?: any, code?: any) => {
        toast.error(error.reason)
      })
  }

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
            value={form.login}
          />
        </label>
        <label>
          <span>Пароль</span>
          <input
            onChange={e => handleForm('password', e.target.value)}
            type="password"
            name={'password'}
            value={form.password}
          />
        </label>
        <Button
          text={'войти'}
          useFixWidth={true}
          onClick={() => handleSubmit()}
        />
      </form>
      <Button
        text={'Регистрация'}
        useFixWidth={true}
        onClick={() => { navigate('/sign-up') }}
      />
    </>
  )
}
