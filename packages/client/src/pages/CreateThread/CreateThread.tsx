import React, { useState } from 'react'
import { createThread } from '@/api/forumApi'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import './CreateThread.scss'
import { File } from '@/components/ui/File/File'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export const CreateThread = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const user = useSelector((state: RootState) => state.authReducer.user)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    // e.preventDefault()
    const author = user
    await createThread({ title, message, author })
    navigate('/forum')
  }

  const handleFileAttach = (file: File | null) => {
    setAttachedFile(file)
  }

  const ThreadSchema = Yup.object().shape({
    title: Yup.string().required('Обязательно для заполнения'),
    message: Yup.string().required('Обязательно для заполнения'),
  })

  const formik = useFormik({
    initialValues: {
      title,
      message,
    },
    enableReinitialize: true,
    validationSchema: ThreadSchema,
    onSubmit: () => handleSubmit(),
  })

  return (
    <div className="create-thread-page container">
      <form
        className="create-thread-page__form form"
        onSubmit={formik.handleSubmit}>
        <PageTitle tagName="h1" text="Создать тему" />
        <Input
          name="thread-name"
          type="text"
          placeholder="Тема"
          className="thread-name"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        {formik?.touched.title && !!formik.errors.title ? (
          <div className={'error-message create-thread-page__error-message'}>
            {formik.errors.title}
          </div>
        ) : null}
        <textarea
          placeholder="Сообщение"
          className="form__textarea"
          name="first-comment"
          id="first-comment"
          value={message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setMessage(e.target.value)
          }
        />
        {formik?.touched.title && !!formik.errors.title ? (
          <div className={'error-message  create-thread-page__error-message'}>
            {formik.errors.title}
          </div>
        ) : null}
        <File className="form__file" onChange={handleFileAttach}></File>
        <Button
          text="Отправить"
          useFixWidth
          className="form__submit"
          type="submit"
        />
      </form>
    </div>
  )
}
