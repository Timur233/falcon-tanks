import './Profile.scss'
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { saveUserData, changeUserAvatar } from '@/store/reducers/user-reducer'
import ProfileSidebarImg from '../../assets/images/profile-sidebar.png'
import ProfileRightSideImg from '../../assets/images/tank-dead.png'
import { Image } from '@/components/ui/Image/Image'
import { Button } from '@/components/ui/Button/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, AVATAR_SRC } from '@/components/ui/Avatar/Avatar'
import { logoutUser, UserType } from '@/store/reducers/auth-reducer'
import { RootState, useAppDispatch } from '@/store'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'

const fieldLabels: { [key: string]: string } = {
  first_name: 'Имя',
  second_name: 'Фамилия',
  login: 'Никнейм',
  email: 'Email',
  phone: 'Телефон',
}

interface LocationState {
  successMessage?: string
}

export const Profile = () => {
  const dispatch = useAppDispatch()
  const user = useSelector<RootState, UserType>(state => state.AuthReducer.user)
  const [formData, setFormData] = useState<UserType>(user)
  const [isEditable, setIsEditable] = useState(false)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [changedFields, setChangedFields] = useState<{
    [key: string]: boolean
  }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [inputWidths, setInputWidths] = useState<{ [key: string]: number }>({})

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setFormData(user)
  }, [user])

  useEffect(() => {
    const state = location.state as LocationState
    if (state?.successMessage) {
      setShowSaveMessage(true)
      setTimeout(() => {
        setShowSaveMessage(false)
        navigate(location.pathname, { replace: true, state: {} })
      }, 3000)
    }
  }, [location, navigate])

  useEffect(() => {
    adjustInputWidths()
  }, [formData, isEditable])

  const calculateWidth = useCallback((text: string) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = getComputedStyle(document.body).font
      const width = context.measureText(text).width
      return Math.max(50, Math.ceil(width))
    }
    return 50
  }, [])

  const adjustInputWidths = useCallback(() => {
    const newWidths: { [key: string]: number } = {}
    Object.keys(fieldLabels).forEach(field => {
      const value = formData[field as keyof UserType] || fieldLabels[field]
      newWidths[field] = calculateWidth(value)
    })
    setInputWidths(newWidths)
  }, [formData, calculateWidth])

  const handleSaveData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await dispatch(saveUserData(formData))
      setChangedFields({})
      setIsEditable(false)
      setShowSaveMessage(true)
      setTimeout(() => {
        setShowSaveMessage(false)
      }, 5000)
    } catch (err) {
      setError('Ошибка при сохранении данных')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSettings = () => {
    if (isEditable) {
      setFormData(user)
      setChangedFields({})
    }
    setIsEditable(!isEditable)
  }

  const handleInputChange =
    (field: keyof UserType) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      setFormData(prevData => ({
        ...prevData,
        [field]: newValue,
      }))
      setChangedFields(prevFields => ({
        ...prevFields,
        [field]: newValue !== user[field],
      }))
      setInputWidths(prevWidths => ({
        ...prevWidths,
        [field]: calculateWidth(newValue),
      }))
    }

  const handleAvatarChange = async (file: File) => {
    try {
      await dispatch(changeUserAvatar(file))
      setShowSaveMessage(true)
      setTimeout(() => {
        setShowSaveMessage(false)
      }, 3000)
    } catch (error) {
      console.error('Ошибка при обновлении аватара:', error)
      setError('Ошибка при обновлении аватара')
    }
  }

  return (
    <div className={'profile-page-layout'}>
      <div className={'profile-page-layout__profile-page'}>
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
          <Avatar
            containerClassName={
              'profile-page-layout__profile-page__profile-container__profile-avatar'
            }
            imageClassName={
              'profile-page-layout__profile-page__profile-container__profile-avatar__avatar'
            }
            src={`${AVATAR_SRC}/${user.avatar}`}
            onAvatarChange={handleAvatarChange}
          />
          {showSaveMessage && (
            <div
              className={
                'profile-page-layout__profile-page__profile-container__success-message'
              }>
              {(location.state as LocationState)?.successMessage ||
                'Данные профиля успешно обновлены!'}
            </div>
          )}
          {error && (
            <div
              className={
                'profile-page-layout__profile-page__profile-container__error-message'
              }>
              {error}
            </div>
          )}
          <Form
            className={
              'profile-page-layout__profile-page__profile-container__profile-form'
            }>
            {Object.keys(fieldLabels).map(field => (
              <div key={field} className="form-group">
                <label htmlFor={field}>{fieldLabels[field]}</label>
                <div className="dotted-line"></div>
                <div className="input-wrapper">
                  <Input
                    value={formData[field as keyof UserType] || ''}
                    className={`${field} dynamic-input ${
                      changedFields[field] ? 'changed' : ''
                    }`}
                    disabled={!isEditable}
                    onChange={handleInputChange(field as keyof UserType)}
                    style={{ width: `${inputWidths[field] || 50}px` }}
                  />
                </div>
              </div>
            ))}
          </Form>
          <Button
            className={`profile-page-layout__profile-page__profile-container__profile-form__edit-button ${
              isEditable ? 'link-button' : ''
            }`}
            text={isEditable ? 'Отменить' : 'Редактировать'}
            useFixWidth
            onClick={toggleSettings}
          />
          {isEditable && (
            <Button
              className={
                'profile-page-layout__profile-page__profile-container__profile-form__save-button'
              }
              text={'Сохранить'}
              useFixWidth
              onClick={handleSaveData}
            />
          )}
          {!isEditable && (
            <Button
              className={
                'custom-button_blue profile-page-layout__profile-page__profile-container__profile-form__edit-button'
              }
              text={'Сменить пароль'}
              useFixWidth
              href={'/profile/change-password'}
            />
          )}
          <Button
            className={
              'link-button profile-page-layout__profile-page__profile-container__profile-form__exit-button'
            }
            text={'Выйти'}
            onClick={() => dispatch(logoutUser())}
          />
        </div>
        <Image
          src={ProfileRightSideImg}
          className={'profile-page-layout__tank-dead'}
          alt={'Profile Right Side'}
        />
      </div>
    </div>
  )
}
