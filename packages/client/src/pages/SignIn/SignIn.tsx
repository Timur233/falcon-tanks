import './SignIn.scss'
import React, { useState } from 'react'
import { useAppDispatch } from '@/store'
import { signInUser } from '@/store/reducers/auth-reducer'
import { Button } from '@/components/ui/Button/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import SiteLogo from '@/assets/images/site-logo.svg'
import { useFormik } from 'formik';

type SignInType = {
  login: string;
  password: string;
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

  const handleSubmit = () => {
    // dispatch(signInUser({ form: userData }))
    //   .unwrap()
    //   .then(() => {
    //     navigate('/game')
    //   })
    //   .catch((_error?: any, _code?: any) => {
    //     setError('Ошибка входа в аккаунт!')
    //   })
    // formik.handleSubmit()
  }
  const validate = (values: SignInType) => {
    let errors = {
      login: null
    };
    if (!values.login) {
      errors.login = 'Required';
    } else if (values.login.length > 15) {
      errors.login = 'Must be 15 characters or less';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 20) {
      errors.password = 'Must be 20 characters or less';
    }

    // if (!values.email) {
    //   errors.email = 'Required';
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //   errors.email = 'Invalid email address';
    // }

    return errors;
  };

  const formik = useFormik({
    initialValues: userData,
    // validate,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(signInUser({ form: userData }))
        .unwrap()
        .then(() => {
          navigate('/game')
        })
        .catch((_error?: any, _code?: any) => {
          setError('Ошибка входа в аккаунт!')
        })
    },
  });

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
            <Form className={'login-page__login-form'} onSubmit={formik.handleSubmit}>
              <Input
                className={'login'}
                name={'login'}
                placeholder={'Логин'}
                onChange={handleInputChange('login')}
              />
              {formik.touched.login && formik.errors.login ? (
                <div className={'login-page__error-message'}>{formik.errors.login}</div>
              ) : null}
              <Input
                className={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleInputChange('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className={'login-page__error-message'}>{formik.errors.password}</div>
              ) : null}
              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}
              <Button text={'Войти'} useFixWidth={true} />

            </Form>
            {/*<Button text={'Войти'} useFixWidth={true} onClick={handleSubmit} />*/}
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
