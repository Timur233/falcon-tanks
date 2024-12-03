import './Profile.scss'
import React, { useState, useEffect, useCallback, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Form } from '@/components/ui/Form/Form'
import { Input } from '@/components/ui/Input/Input'
import { saveUserData, changeUserAvatar } from '@/store/reducers/user-reducer'
import { Button } from '@/components/ui/Button/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar, AVATAR_SRC } from '@/components/ui/Avatar/Avatar'
import {
  actions,
  getUser,
  logoutUser,
  UserType,
} from '@/store/reducers/auth-reducer'
import { RootState, useAppDispatch } from '@/store'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'
import fields from '@/form/fields'
import { useFormik } from 'formik'
import * as Yup from 'yup'

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
  const user = useSelector<RootState, UserType | null>(
    state => state.authReducer.user
  )
  const [formData, setFormData] = useState<UserType>({
    avatar: '',
    display_name: '',
    email: '',
    first_name: '',
    id: '',
    login: '',
    phone: '',
    second_name: '',
  })
  const [isEditable, setIsEditable] = useState(false)
  const [showSaveMessage, setShowSaveMessage] = useState(false)
  const [changedFields, setChangedFields] = useState<{
    [key: string]: boolean
  }>({})
  const [error, setError] = useState<string | null>(null)
  const [inputWidths, setInputWidths] = useState<{ [key: string]: number }>({})
  const [isLoading, setIsLoading] = useState(true)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setFormData(user)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      dispatch(getUser())
        .unwrap()
        .then(data => {
          dispatch(actions.setUser(data))
          setFormData(data)
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Ошибка при загрузке данных пользователя:', error)
          setError('Не удалось загрузить данные пользователя')
          setIsLoading(false)
        })
    }
  }, [dispatch, user])

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

  const calculateWidth = useCallback((text: string) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = '20px Roboto'
      const metrics = context.measureText(text)
      return Math.ceil(metrics.width)
    }
    return 10
  }, [])

  const adjustInputWidths = useCallback(() => {
    const newWidths: { [key: string]: number } = {}
    Object.keys(fieldLabels).forEach(field => {
      const value = formData?.[field as keyof UserType] || fieldLabels[field]
      newWidths[field] = calculateWidth(value)
    })
    setInputWidths(newWidths)
  }, [formData, calculateWidth])

  useEffect(() => {
    adjustInputWidths()
  }, [formData, isEditable, adjustInputWidths])

  const handleSaveData = async () => {
    setError(null)
    try {
      const updatedUser = await dispatch(
        saveUserData({ form: formData })
      ).unwrap()
      if (updatedUser) {
        dispatch(actions.setUser(updatedUser))
        setFormData(updatedUser)
        setChangedFields({})
        setIsEditable(false)
        setShowSaveMessage(true)
        setTimeout(() => {
          setShowSaveMessage(false)
        }, 5000)
      } else {
        setError('Не удалось обновить данные пользователя')
      }
    } catch (err) {
      console.error('Ошибка при сохранении данных:', err)
      setError('Ошибка при сохранении данных')
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
      setFormData(prevData =>
        prevData
          ? {
              ...prevData,
              [field]: newValue,
            }
          : null
      )
      setChangedFields(prevFields => ({
        ...prevFields,
        [field]: newValue !== user?.[field],
      }))
      setInputWidths(prevWidths => ({
        ...prevWidths,
        [field]: calculateWidth(newValue),
      }))
    }

  const handleAvatarChange = async (file: File) => {
    setError(null)
    try {
      await dispatch(changeUserAvatar(file)).unwrap()
      setShowSaveMessage(true)
      setTimeout(() => {
        setShowSaveMessage(false)
      }, 3000)
    } catch (err) {
      console.error('Ошибка при обновлении аватара:', err)
      setError('Ошибка при обновлении аватара')
    }
  }

  const onLogoutUser = () => {
    dispatch(logoutUser()).then(() => {
      window.sessionStorage.setItem('userIsLogged', '0') // 0
      navigate('/')
    })
  }

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validationSchema: Yup.object().shape(
      fields
        .filter(field => field.id !== 'password')
        .reduce(
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
    onSubmit: () => {
      handleSaveData()
    },
  })

  // TODO: заменить на компонент прелоадера из другого реквеста
  if (isLoading) {
    return (
      <div className={'profile-page'}>
        <div className="profile-page__profile-container">
          <CustomPageTitle
            className={'profile-page__profile-container__title'}
            text={'Личный кабинет'}
          />
          <div className="profile-loading">
            <div className="profile-loading__spinner"></div>
            <p>Загрузка данных пользователя...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!formData) {
    return <h1>Ошибка загрузки данных</h1>
  }

  return (
    <div className={'profile-page'}>
      <div className="profile-page__profile-container">
        <CustomPageTitle
          className={'profile-page__profile-container__title'}
          text={'Личный кабинет'}
        />
        <Avatar
          containerClassName={'profile-page__profile-container__profile-avatar'}
          imageClassName={
            'profile-page__profile-container__profile-avatar__avatar'
          }
          src={formData.avatar ? `${AVATAR_SRC}/${formData.avatar}` : ''}
          onChange={handleAvatarChange}
        />
        <Form
          className={'profile-page__profile-container__profile-form'}
          onSubmit={formik.handleSubmit}>
          {fields
            .filter(field => field.id !== 'password')
            .map(field => (
              <Fragment key={field.id}>
                <div className="form-group">
                  <label htmlFor={field.id}>{field.label}</label>
                  <div className="dotted-line"></div>
                  <Input
                    value={formData[field.id as keyof UserType] || ''}
                    className={`${field} dynamic-input ${
                      changedFields[field.id] ? 'changed' : ''
                    }`}
                    disabled={!isEditable}
                    onChange={handleInputChange(field.id as keyof UserType)}
                    onFocus={() => formik.setTouched({ [field?.id]: true })}
                    onBlur={() => formik.setTouched({ [field?.id]: true })}
                    style={{ width: `${inputWidths[field.id] || 50}px` }}
                  />
                </div>
                {formik?.touched[field.id] && !!formik.errors[field.id] ? (
                  <div className={'error-message'}>
                    {formik.errors[field.id]}
                  </div>
                ) : null}
              </Fragment>
            ))}
          {showSaveMessage && (
            <div className={'profile-page__profile-container__success-message'}>
              {(location.state as LocationState)?.successMessage ||
                'Данные профиля успешно обновлены!'}
            </div>
          )}
          {error && (
            <div className={'profile-page__profile-container__error-message'}>
              {error}
            </div>
          )}
          {isEditable ? (
            <Button
              className={
                'profile-page__profile-container__profile-form__save-button'
              }
              text={'Сохранить'}
              useFixWidth
              type={'submit'}
              // onClick={handleSaveData}
            />
          ) : null}
        </Form>
        <Button
          className={`profile-page__profile-container__profile-form__edit-button ${
            isEditable ? 'link-button' : ''
          }`}
          text={isEditable ? 'Отменить' : 'Редактировать'}
          useFixWidth
          onClick={toggleSettings}
        />
        {isEditable ? null : (
          <Button
            className={
              'custom-button_blue profile-page__profile-container__profile-form__edit-button'
            }
            text={'Сменить пароль'}
            useFixWidth
            onClick={() => navigate('/profile/change-password')}
          />
        )}
        <Button
          className={
            'link-button profile-page__profile-container__profile-form__exit-button'
          }
          text={'Выйти'}
          onClick={onLogoutUser}
        />
      </div>
    </div>
  )
}
