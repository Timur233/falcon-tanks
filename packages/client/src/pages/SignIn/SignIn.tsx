import SiteLogo from '@/assets/images/site-logo.svg'
import { Button } from '@/components/ui/Button/Button'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { useAppDispatch } from '@/store'
import { signInUser } from '@/store/reducers/auth-reducer'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.scss'

export const SignIn = () => {
  const [userData, setUserData] = useState({ login: '', password: '' })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData(prevData => ({
        ...prevData,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = () => {
    dispatch(signInUser({ form: userData }))
      .unwrap()
      .then(() => {
        navigate('/game')
      })
      .catch((_error?: any, _code?: any) => {
        setError('Ошибка входа в аккаунт!')
      })
  }

  return (
    <div className={'login-page'}>
      <Link className="login-page__link" to="/">
        <img
          src={SiteLogo}
          className="login-page__link__image"
          alt="Falcon Tanks Logo"
          draggable="false"
        />
      </Link>
      <div className="container">
        <div className={'row'}>
          <div className={'column col-6'}>
            <CustomPageTitle className={'login-page__title'} text={'Вход'} />
            <Form className={'login-page__login-form'}>
              <Input
                className={'login'}
                name={'login'}
                placeholder={'Логин'}
                onChange={handleInputChange('login')}
              />
              <Input
                className={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleInputChange('password')}
              />
              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}
            </Form>
            <Button text={'Войти'} useFixWidth={true} onClick={handleSubmit} />
            <Button
              className={'link-button'}
              text={'Регистрация'}
              useFixWidth={true}
              onClick={() => {
                navigate('/sign-up')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
