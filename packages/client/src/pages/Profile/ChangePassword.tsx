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

  // TODO: перенести в компонент валдиации (добаваленно сюда времено)
  const validatePassword = () => {
    if (userData.new_password !== userData.new_password_confirm) {
      setError('Пароли не совпадают')
      return false
    }
    return true
  }

  const saveData = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    setError(null)
    if (!validatePassword()) {
      return
    }

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
          }>
          <Input
            className={'old_password'}
            name={'oldPassword'}
            type={'password'}
            placeholder={'Текущий пароль'}
            onChange={handleInputChange('old_password')}
          />
          <Input
            className={'new_password'}
            name={'newPassword'}
            type={'password'}
            placeholder={'Новый пароль'}
            onChange={handleInputChange('new_password')}
          />
          <Input
            className={'new_password_confirm'}
            name={'new_password_confirm'}
            type={'password'}
            placeholder={'Подтвердите пароль'}
            onChange={handleInputChange('new_password_confirm')}
          />
          {error && (
            <div className={'profile-page__profile-container__error-message'}>
              {error}
            </div>
          )}
        </Form>
        <Button
          text={'Сохранить'}
          className={'save'}
          useFixWidth
          onClick={saveData}
        />
        <Button
          text={'Назад'}
          className={'link-button back'}
          onClick={() => navigate('/profile')}
        />
      </div>
    </div>
  )
}
