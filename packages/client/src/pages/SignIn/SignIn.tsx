import './SignIn.scss'
import React, {useEffect, useState, useRef} from 'react'
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
import * as Yup from 'yup';

type SignInType = {
  login: string;
  password: string;
}

export const SignIn = () => {
  const [userData, setUserData] = useState({ login: '', password: '' })
  const [error, setError] = useState<string | null>()
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
    login: Yup.string()
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .matches(/^(?![\d+_@.-]+$)[a-zA-Zа-яА-Я0-9+_@.-]*$/g, 'Логин не должен содержать спецсимволы или состоять только из цифп')
      .required('Обязательно для заполнения'),
    password: Yup.string()
      .min(8, 'Минимум 8 символов')
      .max(40, 'Максимум 40 символов')
      .matches(/[a-z]/g , 'Необходим один заглавный символ')
      .required('Обязательно для заполнения'),
  })

  const validate = (values: SignInType) => {
    type validateError = {
      login: null | string,
      password: null | string
    } | unknown

    let errors:validateError = null as unknown;

    if (!values.login) {
      errors['login']= 'Обязательно для заполнения';
    } else if (values.login.match(/^[0-9!@#\$%\^\&*\)\(+=.]+$/g)) {
      errors.login = 'Логин не должен содержать спецсимволы';
    } else if (values.login.length >= 20) {
      errors.login = 'Максимум 20 символов';
    } else if (values.login.length <= 3) {
      errors.login = 'Минимум 3 символа';
    }

    if (!values.password) {
      errors.password = 'Обязательно для заполнения';
    } else if (values.password.length <= 8) {
      errors.password = 'Минимум 8 символов';
    } else if (!values.password.match(/[A-Z]/)) {
      errors.password = 'Необходим один заглавный символ';
    } else if (values.password.length >= 40) {
      errors.password = 'Не более 40 символов';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    // validate,
    validationSchema: SignInSchema,
    onSubmit: values => {
      console.log('onSubmit', userData)
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

  useEffect(() => {
    console.log(userData)
  }, [userData])

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
            <Form name={'userLogin'} className={'login-page__login-form'} onSubmit={formik.handleSubmit}>
              <Input
                className={'login'}
                name={'login'}
                placeholder={'Логин'}
                onChange={handleInputChange('login')}
                onBlur={formik.handleBlur}
                value={userData.login}
                onFocus={!!userData.login ? formik.handleBlur : () => {}}
              />
              {formik.touched.login && !!formik.errors.login ? (
                <div className={'login-page__error-message'}>{formik.errors.login}</div>
              ) : null}
              <Input
                className={'password'}
                name={'password'}
                type={'password'}
                placeholder={'Пароль'}
                onChange={handleInputChange('password')}
                onBlur={formik.handleBlur}
                value={userData.password}
                onFocus={!!userData.password ? formik.handleBlur : () => {}}
              />
              {formik.touched.password && !!formik.errors.password ? (
                <div className={'login-page__error-message'}>{formik.errors.password}</div>
              ) : null}

              {error && (
                <div className={'login-page__error-message'}>{error}</div>
              )}
              <Button text={'Войти'} useFixWidth={true} type={'submit'} />

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
