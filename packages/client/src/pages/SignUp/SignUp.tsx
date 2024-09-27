import { useState } from 'react'
import { signUpUser } from '@/store/reducers/user-reducer'
import { useAppDispatch } from '@/store'

export const SignUp = () => {
  const [form, setForm] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })
  const dispatch = useAppDispatch()

  const handleForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = () => dispatch(signUpUser(form))

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}>
        <label htmlFor="">
          <span>Имя</span>
          <input
            onChange={e => handleForm('first_name', e.target.value)}
            type="text"
            name={'first_name'}
          />
        </label>
        <label htmlFor="">
          <span>Фамилия</span>
          <input
            onChange={e => handleForm('second_name', e.target.value)}
            type="text"
            name={'second_name'}
          />
        </label>
        <label htmlFor="">
          <span>Логин</span>
          <input
            onChange={e => handleForm('login', e.target.value)}
            type="text"
            name={'login'}
          />
        </label>
        <label htmlFor="">
          <span>Email</span>
          <input
            onChange={e => handleForm('email', e.target.value)}
            type="text"
            name={'email'}
          />
        </label>
        <label htmlFor="">
          <span>Пароль</span>
          <input
            onChange={e => handleForm('password', e.target.value)}
            type="password"
            name={'password'}
          />
        </label>
        <label htmlFor="">
          <span>Телефон</span>
          <input
            onChange={e => handleForm('phone', e.target.value)}
            type="tel"
            name={'phone'}
          />
        </label>
        <button onClick={() => handleSubmit()}>зарегистрироваться</button>
      </form>
    </>
  )
}
