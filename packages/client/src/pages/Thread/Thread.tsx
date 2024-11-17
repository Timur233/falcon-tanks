import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchThreadById, fetchComments, uploadFile } from '@/api/forumApi'
import { Thread as ThreadType, Comment } from '@/types/forum'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { BreadCrumbs } from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { Icon } from '@/components/ui/Icon/Icon'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import { Avatar } from '@/components/ui/Avatar/Avatar'
import { File } from '@/components/ui/File/File'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import './Thread.scss'
import { Reaction } from '@/components/common/Reaction/Reaction'
import { mockComments, mockThread } from '../../../mocks/Threads'

const breadCrumbs = [
  { title: 'Главная', href: '/' },
  { title: 'Формумы', href: '/forum' },
  { title: 'Новые игры', href: '/forum' },
]

export const Thread = () => {
  const { id } = useParams<{ id: string }>()
  const [thread, setThread] = useState<ThreadType | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const COMMENTS_PER_PAGE = 10

  const loadThread = async () => {
    try {
      const data = await fetchThreadById(Number(id))
      setThread(data)
    } catch (error) {
      console.error('Ошибка при загрузке темы, используются мок-данные:', error)
      setThread(mockThread)
    }
  }

  // Функция загрузки комментариев
  const loadComments = async () => {
    try {
      if (id) {
        const { comments, total } = await fetchComments(
          Number(id),
          currentPage,
          COMMENTS_PER_PAGE
        )
        setComments(comments)
        setTotalPages(Math.ceil(total / COMMENTS_PER_PAGE))
      }
    } catch (error) {
      console.error(
        'Ошибка при загрузке комментариев, используются мок-данные:',
        error
      )
      setComments(mockComments)
      setTotalPages(1) // Моковые данные на одну страницу
    }
  }

  useEffect(() => {
    // получить id из url страницы
  }, [id])

  useEffect(() => {
    loadThread()
  }, [id])

  useEffect(() => {
    loadComments()
  }, [id, currentPage])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (attachedFile) {
      try {
        const formData = new FormData()
        formData.append('file', attachedFile)
        await uploadFile(formData)
        alert('Файл успешно загружен')
        setAttachedFile(null) // Очистка файла после загрузки
      } catch (error) {
        console.error('Ошибка при загрузке файла:', error)
        alert('Не удалось загрузить файл')
      }
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleFileAttach = (file: File | null) => {
    setAttachedFile(file)
  }

  if (!id) {
    return <div>Ошибка: ID темы отсутствует.</div>
  }

  if (!thread) {
    return <div>Загрузка темы...</div>
  }

  return (
    <div className="thread-page container">
      <PageTitle tagName="h1" text={thread.title}></PageTitle>
      <div className="thread-page__info thread-info">
        <div className="thread-info__label">
          <Icon id="profile-icon" width={10} height={12}></Icon>
          <span>
            {thread.comments
              ? thread.comments[0]?.author
              : 'Автор неизвестен' || 'Автор неизвестен'}
          </span>
        </div>
        <div className="thread-info__label">
          <Icon id="time-icon" width={13} height={12}></Icon>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>
      <BreadCrumbs
        className="thread-page__bread-crumbs"
        breadCrumbs={breadCrumbs}></BreadCrumbs>
      <div className="thread-page__comments">
        {comments.map(comment => (
          <Card key={comment.id} className="comment">
            <div className="comment__author author">
              <Avatar
                src={comment.avatarUrl || AvatarPlaceholder}
                onChange={file => console.log('Avatar changed', file)}
                containerClassName="author__avatar-container"
                imageClassName="author__avatar"
              />
              <span className="author__login">{comment.author}</span>
              <span className="author__date">{comment.date}</span>
              <div className="author__controlls controlls">
                <Reaction topicId={comment.id} />
                <button className="controlls__item">
                  <Icon id="message-icon" width={12} height={12}></Icon>
                </button>
                <button className="controlls__item">
                  <Icon id="share-icon" width={12} height={12}></Icon>
                </button>
              </div>
            </div>
            <div className="comment__text">{comment.message}</div>
          </Card>
        ))}
      </div>
      <Pagination
        className="thread-page__pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}></Pagination>
      <div className="thread-page__answer answer">
        <form className="answer__form form" onSubmit={handleSubmit}>
          <label className="form__label" htmlFor="answer-message">
            <span>Ответить:</span>
          </label>
          <textarea
            className="form__textarea"
            name="answer-message"
            id="answer-message"
            placeholder="Сообщение"></textarea>
          <File className="form__file" onChange={handleFileAttach}></File>
          <Button
            text="Отправить"
            className="form__submit"
            useFixWidth
            disabled={!attachedFile}></Button>
        </form>
      </div>
    </div>
  )
}
