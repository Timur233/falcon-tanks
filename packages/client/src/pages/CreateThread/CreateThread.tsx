import React, { useState } from 'react'
import { createThread } from '@/api/forumApi'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import './CreateThread.scss'
import { File } from '@/components/ui/File/File'

export const CreateThread = () => {
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createThread({ title, message })
    navigate('/forum')
  }

  const handleFileAttach = (file: File | null) => {
    setAttachedFile(file)
  }

  return (
    <div className="create-thread-page container">
      <form className="create-thread-page__form form" onSubmit={handleSubmit}>
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
        <File className="form__file" onChange={handleFileAttach}></File>
        <Button text="Отправить" useFixWidth className="form__submit" />
      </form>
    </div>
  )
}
