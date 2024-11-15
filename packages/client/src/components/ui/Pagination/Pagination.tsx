import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../Button/Button'
import './Pagination.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export const Pagination = (props: PaginationProps) => {
  const { currentPage, totalPages, onPageChange, className = '' } = props

  const navigate = useNavigate()
  const location = useLocation()

  const getClassName = (pageIndex: number) => {
    return `pagination__item compact-button${
      pageIndex === currentPage
        ? ' compact-button_active'
        : ' compact-button_white'
    }`
  }

  const handlePageClick = (pageIndex: number) => {
    onPageChange(pageIndex)
    navigate(`${location.pathname}?page=${pageIndex}`)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageClick(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageClick(currentPage + 1)
    }
  }

  return (
    <div className={`pagination${className ? ` ${className}` : ''}`}>
      <Button
        className="compact-button compact-button_white"
        onClick={handlePreviousPage}
        text="Назад"
        useFixWidth={false}
      />

      {Array.from({ length: totalPages }).map((_, index) => (
        <Button
          key={index}
          className={getClassName(index + 1)}
          onClick={() => handlePageClick(index + 1)}
          text={(index + 1).toString()}
          useFixWidth={false}
        />
      ))}

      <Button
        className="compact-button compact-button_white"
        onClick={handleNextPage}
        text="Вперед"
        useFixWidth={false}
      />
    </div>
  )
}
