import './Thread.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  fetchThreadById,
  fetchComments,
  uploadFile,
  createComment,
} from '@/api/forumApi'
import { Thread as ThreadType, Comment } from '@/types/forum'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { BreadCrumbs } from '@/components/ui/BreadCrumbs/BreadCrumbs'
import { Icon } from '@/components/ui/Icon/Icon'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import { AVATAR_SRC } from '@/components/ui/Avatar/Avatar'
import { File } from '@/components/ui/File/File'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'
import { Reaction } from '@/components/common/Reaction/Reaction'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Loader } from '@/components/ui/Loader/Loader'

export const Thread = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [thread, setThread] = useState<ThreadType | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [replyToComment, setReplyToComment] = useState<number | null>(null)
  const [commentText, setCommentText] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [attachedFile, setAttachedFile] = useState<File | null>(null)
  const user = useSelector((state: RootState) => state.authReducer.user)
  const COMMENTS_PER_PAGE = 10

  const breadCrumbs = [
    { title: 'Главная', href: '/' },
    { title: 'Форумы', href: '/forum' },
    { title: thread?.title, href: '' },
  ]

  const loadThread = async () => {
    try {
      setLoading(true)
      const data = await fetchThreadById(Number(id))
      setThread(data)
    } catch (error) {
      console.error('Ошибка при загрузке темы.', error)
    } finally {
      setLoading(false)
    }
  }

  // Функция загрузки комментариев
  const loadComments = async () => {
    try {
      setLoading(true)
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
      console.error('Ошибка при загрузке комментариев.', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadThread()
  }, [id])

  useEffect(() => {
    loadComments()
  }, [id, currentPage])

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!id || !commentText.trim()) return

    try {
      const comment = await createComment(
        Number(id),
        user,
        commentText,
        replyToComment ? Number(replyToComment) : null
      )
      setComments(prev => [...prev, comment])
      setCommentText('')
      setReplyToComment(null)

      if (attachedFile) {
        const formData = new FormData()
        formData.append('file', attachedFile)
        await uploadFile(formData)
        setAttachedFile(null)
      }
    } catch (error) {
      console.error('Ошибка при отправке комментария:', error)
    }
  }

  const handleReply = (commentId: number) => {
    setReplyToComment(commentId)
    document.getElementById('answer-message')?.focus()
  }

  const handleCancelReply = () => {
    setReplyToComment(null)
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
    return <Loader show={true} />
  }

  const author =
    typeof thread.author === 'string'
      ? JSON.parse(thread.author)
      : thread.author

  return (
    <div className="thread-page container">
      <PageTitle tagName="h1" text={thread.title} />
      {loading && <Loader show={true} />}
      <div className="thread-page__info thread-info">
        <div className="thread-info__label">
          <Icon id="profile-icon" width={10} height={12}></Icon>
          <span>
            {author.login
              ? author.login
              : 'Автор неизвестен' || 'Автор неизвестен'}
          </span>
        </div>
        <div className="thread-info__label">
          <Icon id="time-icon" width={13} height={12}></Icon>
          <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
      <BreadCrumbs
        className="thread-page__bread-crumbs"
        breadCrumbs={breadCrumbs}
      />
      <div className="thread-page__comments">
        {comments &&
          comments.length > 0 &&
          comments.map(comment => {
            const commentAuthor =
              typeof comment.author === 'string'
                ? JSON.parse(comment.author)
                : comment.author
            return (
              <Card key={comment.id} className="comment">
                <div className="comment__author author">
                  <img
                    className="author__avatar"
                    src={
                      commentAuthor?.avatar
                        ? `${AVATAR_SRC}/${commentAuthor.avatar}`
                        : AvatarPlaceholder
                    }
                    alt={'User Avatar'}
                  />
                  <span className="author__login">
                    {commentAuthor?.login || 'Anonymous'}
                  </span>
                  <span className="author__date">
                    {new Date(comment.createdAt).toLocaleDateString()} -{' '}
                    {new Date(comment.createdAt).toLocaleTimeString()}
                  </span>
                  <div className="author__controlls controlls">
                    <Reaction topicId={comment.id} userId={user.id} />
                    <button
                      className="controlls__item"
                      onClick={() => handleReply(comment.id)}>
                      <Icon id="message-icon" width={12} height={12}></Icon>
                    </button>
                    <button className="controlls__item">
                      <Icon id="share-icon" width={12} height={12}></Icon>
                    </button>
                  </div>
                </div>
                <div className="comment__text">{comment.text}</div>
              </Card>
            )
          })}
      </div>
      <Pagination
        className="thread-page__pagination"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="thread-page__answer answer">
        <form className="answer__form form" onSubmit={handleSubmitComment}>
          <label className="form__label" htmlFor="answer-message">
            <span>
              {replyToComment
                ? `Ответ на комментарий #${replyToComment}`
                : 'Ответить:'}
            </span>
          </label>
          {replyToComment && (
            <button
              type="button"
              className="form__cancel-reply"
              onClick={handleCancelReply}>
              Отменить ответ
            </button>
          )}
          <textarea
            className="form__textarea"
            name="answer-message"
            id="answer-message"
            placeholder="Сообщение"
            value={commentText}
            onChange={e => setCommentText(e.target.value)}></textarea>
          <File className="form__file" onChange={handleFileAttach}></File>
          <Button
            text="Отправить"
            className="form__submit"
            useFixWidth
            disabled={!commentText.trim()}
          />
        </form>
      </div>
    </div>
  )
}
