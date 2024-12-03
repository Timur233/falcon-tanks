import './SignUp.scss'
import React, { useState, Fragment } from 'react'
import { signUpUser } from '@/store/reducers/auth-reducer'
import { useAppDispatch } from '@/store'
import { Link, useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/Form/Form'
import { Button } from '@/components/ui/Button/Button'
import SiteLogo from '@/assets/images/site-logo.svg'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import { Input } from '@/components/ui/Input/Input'
import { YandexOAuth } from '@/services/o-auth/YandexOAuth'
import { Icon } from '@/components/ui/Icon/Icon'
import { OauthLinks } from '@/components/ui/OauthLinks/OauthLinks'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import fields from '@/form/fields'

type UserType = {
  first_name: string | null
  second_name: string | null
  login: string | null
  password: string | null
  email: string | null
  phone: string | null
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

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape(
      fields.reduce(
        (
          acc: { [x: string]: Yup.Maybe<Yup.AnyObject> } | any = {},
          field: { id: string; rules: Yup.Maybe<Yup.AnyObject> }
        ) => {
          if (field.rules !== undefined) acc[field.id] = field.rules
          return acc
        },
        {}
      )
    ),
    onSubmit: values => {
      dispatch(signUpUser({ form: formData }))
        .unwrap()
        .then(() => {
          navigate('/game')
        })
        .catch(error => {
          if (error.data?.reason) {
            setError(error.data?.reason)
          } else {
            setError('Ошибка! Регистрация не выполнена.')
          }
        })
    },
  })

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
            <Form
              className={'registration-page__registration-form'}
              onSubmit={formik.handleSubmit}>
              {fields.map(
                (field: {
                  id: string
                  label: string
                  defaultValue: string | number
                  type: string
                  rules: Yup.Maybe<Yup.AnyObject>
                }) => (
                  <Fragment key={field.id}>
                    <Input
                      value={formData[field.id as keyof UserType] || ''}
                      className={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.label}
                      onChange={handleInputChange(field.id as keyof UserType)}
                      onFocus={() => formik.setTouched({ [field?.id]: true })}
                      onBlur={() => formik.setTouched({ [field?.id]: true })}
                    />
                    {formik?.touched[field.id] && !!formik.errors[field.id] ? (
                      <div className={'error-message'}>
                        {formik.errors[field.id]}
                      </div>
                    ) : null}
                  </Fragment>
                )
              )}
              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}
              <Button text={'Создать аккаунт'} useFixWidth />
            </Form>

            <Button
              className={'link-button'}
              text={'Войти'}
              useFixWidth
              onClick={() => {
                navigate('/sign-in')
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
