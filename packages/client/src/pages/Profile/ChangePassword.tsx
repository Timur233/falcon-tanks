import './Profile.scss'
import React from 'react'
import { Image } from '@/components/ui/Image/Image'
import ProfileSidebarImg from '@/assets/images/profile-sidebar.png'
import ProfileRightSideImg from '@/assets/images/tank-dead.png'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { useState } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { changeUserPassword } from '@/store/reducers/user-reducer'
import { useAppDispatch } from '@/store'
import { Header } from '@/components/common/Header/Header'
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
      )

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
      console.log(err)
      setError('Ошибка при смене пароля')
    }
  }

  return (
    <div className={'profile-page-layout'}>
      <Header className={'profile-page-layout__header'} />
      <main className={'profile-page-layout__profile-page'}>
        <div className={'profile-page-layout__profile-page__sidebar'}>
          <Image
            src={ProfileSidebarImg}
            className={'profile-page-layout__profile-page__sidebar__image'}
            alt={'Profile Sidebar'}
          />
        </div>
        <div className="profile-page-layout__profile-page__profile-container">
          <CustomPageTitle
            className={
              'profile-page-layout__profile-page__profile-container__title'
            }
            text={'Личный кабинет'}
          />
          <Form
            className={
              'profile-page-layout__profile-page__profile-container__profile-form__change-password'
            }>
            <Input
              className={'input-default old_password'}
              name={'oldPassword'}
              type={'password'}
              placeholder={'Текущий пароль'}
              onChange={handleInputChange('old_password')}
            />
            <Input
              className={'input-default new_password'}
              name={'newPassword'}
              type={'password'}
              placeholder={'Новый пароль'}
              onChange={handleInputChange('new_password')}
            />
            <Input
              className={'input-default new_password_confirm'}
              name={'new_password_confirm'}
              type={'password'}
              placeholder={'Подтвердите пароль'}
              onChange={handleInputChange('new_password_confirm')}
            />
            {error && (
              <div
                className={
                  'profile-page-layout__profile-page__profile-container__error-message'
                }>
                {error}
              </div>
            )}
            <Button
              text={'Сохранить'}
              className={'save'}
              useFixWidth={true}
              onClick={saveData}
            />
          </Form>
          <Button
            text={'Назад'}
            className={'link-button back'}
            href={'/profile'}
          />
        </div>
        <Image
          src={ProfileRightSideImg}
          className={'profile-page-layout__tank-dead'}
          alt={'Profile Right Side'}
        />
      </main>
    </div>
  )
}
