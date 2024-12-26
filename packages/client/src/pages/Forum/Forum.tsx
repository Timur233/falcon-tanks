import PromoLogo from '@/assets/images/svg/FT-promo.svg'
import { Button } from '@/components/ui/Button/Button'
import { Card } from '@/components/ui/Card/Card'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { Pagination } from '@/components/ui/Pagination/Pagination'
import { Thread } from '@/types/forum'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchThreads } from '@/api/forumApi'
import './Forum.scss'
import { Loader } from '@/components/ui/Loader/Loader'

const THREADS_COUNT = 10

export const Forum = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [threads, setThreads] = useState<Thread[]>([])
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const loadThreads = async () => {
      try {
        setLoading(true)
        const data = await fetchThreads(currentPage, THREADS_COUNT)
        setThreads(data.threads)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error('Ошибка загрузки тем форума:', err)
        setError('Не удалось загрузить темы.')
      } finally {
        setLoading(false)
      }
    }

    loadThreads()
  }, [currentPage])

  return (
    <div className="container forum-page">
      <img className="forum-page__logo" src={PromoLogo} alt="Tank wars" />
      <div className="forum-page__header header">
        <PageTitle text="Форумы" tagName="h1" className="header__title" />
        <Button
          text="Создать"
          onClick={() => navigate('/forum/new')}
          className="compact-button"
        />
      </div>
      {loading && <Loader show={true} />}
      {error && <div className="forum-page__error">{error}</div>}
      {threads ? (
        <div className="forum-page__threads threads">
          {threads.map(thread => (
            <Link to={`/forum/${thread.id}`} key={thread.id}>
              <Card className="threads__item thread">
                <div className="thread__title">{thread.title}</div>
                <div className="thread__answers answers">
                  <span className="answers__title">Ответы:</span>
                  <span className="answers__count">
                    {thread.commentsCount - 1}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div>Ни одна тема пока не создана, Вы можете создать её первым!</div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
