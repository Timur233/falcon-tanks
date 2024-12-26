import './Profile.scss'
import React from 'react'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { changeUserPassword } from '@/store/reducers/user-reducer'
import { useAppDispatch } from '@/store'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import * as Yup from 'yup'
import { useFormik } from 'formik'
export const ChangePassword = () => {
  const dispatch = useAppDispatch()
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [userData, setUserData] = useState({
    old_password: '',
    new_password: '',
    new_password_confirm: '',
  })
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserData(prevData => ({
        ...prevData,
        [field]: event.target.value,
      }))
    }

  const saveData = async () => {
    setError(null)

    try {
      await dispatch(
        changeUserPassword({
          oldPassword: userData.old_password,
          newPassword: userData.new_password,
        })
      ).unwrap()

      setShowSaveMessage(true)
      setUserData({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
      })

      navigate('/profile', {
        state: { successMessage: 'Пароль успешно изменен!' },
      })
    } catch (err) {
      setError('Ошибка при смене пароля')
    }
  }

  const ChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Обязательно для заполнения'),
    new_password: Yup.string()
      .min(8, 'Минимум 8 символов')
      .max(40, 'Максимум 40 символов')
      .matches(/[0-9]/g, 'Необходима одна цифра')
      .matches(/[A-ZА-Я]/g, 'Необходим один заглавный символ')
      .required('Обязательно для заполнения'),
    new_password_confirm: Yup.string()
      .min(8, 'Минимум 8 символов')
      .max(40, 'Максимум 40 символов')
      .matches(/[0-9]/g, 'Необходима одна цифра')
      .matches(/[A-ZА-Я]/g, 'Необходим один заглавный символ')
      .required('Обязательно для заполнения')
      .oneOf([Yup.ref('new_password')], 'Введенные пароли не совпадают'),
  })

  const formik = useFormik({
    initialValues: userData,
    enableReinitialize: true,
    validationSchema: ChangePasswordSchema,
    onSubmit: () => saveData(),
  })

  return (
    <div className={'profile-page'}>
      <div className="profile-page__profile-container">
        <CustomPageTitle
          className={'profile-page__profile-container__title'}
          text={'Личный кабинет'}
        />
        <Form
          className={
            'profile-page__profile-container__profile-form__change-password'
          }
          onSubmit={formik.handleSubmit}>
          <Input
            className={'old_password'}
            name={'oldPassword'}
            type={'password'}
            placeholder={'Текущий пароль'}
            onChange={handleInputChange('old_password')}
          />
          {formik?.touched.old_password && !!formik.errors.old_password ? (
            <div className={'error-message'}>{formik.errors.old_password}</div>
          ) : null}
          <Input
            className={'new_password'}
            name={'newPassword'}
            type={'password'}
            placeholder={'Новый пароль'}
            onChange={handleInputChange('new_password')}
          />
          {formik?.touched.new_password && !!formik.errors.new_password ? (
            <div className={'error-message'}>{formik.errors.new_password}</div>
          ) : null}
          <Input
            className={'new_password_confirm'}
            name={'new_password_confirm'}
            type={'password'}
            placeholder={'Подтвердите пароль'}
            onChange={handleInputChange('new_password_confirm')}
          />
          {formik?.touched.new_password_confirm &&
          !!formik.errors.new_password_confirm ? (
            <div className={'error-message'}>
              {formik.errors.new_password_confirm}
            </div>
          ) : null}
          {error && (
            <div className={'profile-page__profile-container__error-message'}>
              {error}
            </div>
          )}
          <Button
            text={'Сохранить'}
            className={'save'}
            useFixWidth
            type={'submit'}
            // onClick={saveData}
          />
        </Form>

        <Button
          text={'Назад'}
          className={'link-button back'}
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  )
}
