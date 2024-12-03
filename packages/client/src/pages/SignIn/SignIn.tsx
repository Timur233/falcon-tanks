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
import { YandexOAuth } from '@/services/o-auth/YandexOAuth'
import { Icon } from '@/components/ui/Icon/Icon'
import { OauthLinks } from '@/components/ui/OauthLinks/OauthLinks'

import { useFormik } from 'formik'
import * as Yup from 'yup'

type SignInType = {
  login: string
  password: string
}

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

  const SignInSchema = Yup.object().shape({
    login: Yup.string().required('Обязательно для заполнения'),
    password: Yup.string().required('Обязательно для заполнения'),
  })

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    validationSchema: SignInSchema,
    onSubmit: values => {
      dispatch(signInUser({ form: userData }))
        .unwrap()
        .then(() => {
          navigate('/game')
        })
        .catch((_error?: any, _code?: any) => {
          setError('Ошибка входа в аккаунт!')
        })
    },
  })

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
            <Form
              className={'login-page__login-form'}
              onSubmit={formik.handleSubmit}>
              <Input
                className={'login'}
                name={'login'}
                placeholder={'Логин'}
                onChange={handleInputChange('login')}
              />
              {formik.touched.login && !!formik.errors.login ? (
                <div className={'error-message'}>{formik.errors.login}</div>
              ) : null}
              <Input
                className={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleInputChange('password')}
              />
              {formik.touched.password && !!formik.errors.password ? (
                <div className={'error-message'}>{formik.errors.password}</div>
              ) : null}
              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}

              <Button text={'Войти'} useFixWidth={true} type={'submit'} />
            </Form>
            <Button
              className={'link-button'}
              text={'Регистрация'}
              useFixWidth={true}
              onClick={() => {
                navigate('/sign-up')
              }}
            />
            <OauthLinks>
              <button
                className="oauth-buttons__item"
                onClick={YandexOAuth.redirect}>
                <Icon id="yandex-icon" width={32} height={32}></Icon>
              </button>
            </OauthLinks>
          </div>
        </div>
      </div>
    </div>
  )
}
