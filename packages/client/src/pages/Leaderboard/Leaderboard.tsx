import './Leaderboard.scss'
import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/Button/Button'
import { Loader } from '@/components/ui/Loader/Loader'
import PromoLogo from '@/assets/images/svg/FT-promo.svg'
import { User } from './components/User/User'
import { leaderboardApi } from '@/store/reducers/leaderbord-reducer'
import { CustomPageTitle } from '@/components/ui/CustomPageTitle/CustomPageTitle'

const USERS_PER_PAGE = 6

export const Leaderboard = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetchLeaderboard = useCallback(async (page: number) => {
    try {
      setLoading(true)
      const data = await leaderboardApi.getLeaderboard(
        page * USERS_PER_PAGE,
        USERS_PER_PAGE
      )

      if (data.length < USERS_PER_PAGE) {
        setHasMore(false)
      }

      if (page === 0) {
        setUsers(data)
      } else {
        setUsers(prev => [...prev, ...data])
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : 'Ошибка загрузки таблицы лидеров'
      )
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchLeaderboard(0)
  }, [fetchLeaderboard])

  const handleLoadMore = () => {
    const nextPage = currentPage + 1
    setCurrentPage(nextPage)
    fetchLeaderboard(nextPage)
  }

  if (error) {
    return (
      <div className="container leaderboard-page">
        <div className="leaderboard-error">
          <h2>Ошибка</h2>
          <p>{error}</p>
          <Button
            text="Попробовать снова"
            onClick={() => {
              setError(null)
              fetchLeaderboard(0)
            }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className={'row'}>
          <div className={'column col-16'}>
            <img
              className="leaderboard-page__logo"
              src={PromoLogo}
              alt="Tank wars"
            />
            <CustomPageTitle
              className={'leaderboard-page__title'}
              text={'Рекорды'}
            />
            <div className="records">
              {users.map((item, index) => (
                <User
                  key={`${item.data.id}-${index}`}
                  user={item.data}
                  rank={index + 1}
                />
              ))}
            </div>

            {loading && <Loader show={true} />}

            {!loading && hasMore && (
              <Button
                text="Загрузить еще"
                className="leaderboard-page__load-more"
                onClick={handleLoadMore}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
