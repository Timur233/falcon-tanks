import './SignUp.scss'
import React, { useState } from 'react'
import { signUpUser } from '@/store/reducers/auth-reducer'
import { useAppDispatch } from '@/store'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/Form/Form'
import { Button } from '@/components/ui/Button/Button'
import SiteLogo from '@/assets/images/site-logo.svg'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { Input } from '@/components/ui/Input/Input'

type UserType = {
  first_name: string | null
  second_name: string | null
  login: string | null
  password: string | null
  email: string | null
  phone: string | null
}

const fieldLabels: { [key: string]: string } = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Никнейм',
  password: 'Пароль',
  email: 'Email',
  phone: 'Телефон',
}

export const SignUp = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    password: '',
    phone: '',
  })
  const [error, setError] = useState<string | null>(null)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prevData => ({
        ...prevData,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = () => {
    dispatch(signUpUser({ form: formData }))
      .unwrap()
      .then(() => {
        navigate('/game')
      })
      .catch(error => {
        setError('Ошибка! Регистрация не выполнена.')
      })
  }

  return (
    <div className="registration-page">
      <Link className="login-page__link" to="/">
        <img
          src={SiteLogo}
          className="login-page__link__image"
          alt="Falcon Tanks Logo"
          draggable="false"
        />
      </Link>
      <div className={'container'}>
        <div className={'row'}>
          <div className={'column col-6'}>
            <CustomPageTitle
              className={'login-page__title'}
              text={'Регистрация'}
            />
            <Form className={'registration-page__registration-form'}>
              {Object.keys(fieldLabels).map(field => (
                <>
                  <Input
                    value={formData[field as keyof UserType] || ''}
                    className={field}
                    name={field}
                    type={field === 'password' ? 'password' : 'text'}
                    placeholder={fieldLabels[field]}
                    onChange={handleInputChange(field as keyof UserType)}
                  />
                </>
              ))}
              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}
            </Form>
            <Button
              text={'Создать аккаунт'}
              useFixWidth
              onClick={handleSubmit}
            />
            <Button
              className={'link-button'}
              text={'Войти'}
              useFixWidth
              onClick={() => {
                navigate('/sign-in')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
