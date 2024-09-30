import { Button } from '../Button/Button'
import './Pagination.scss'

interface PaginationProps {
  total: number
  className?: string
}

export const Pagination = (props: PaginationProps) => {
  const { total, className = '' } = props

  return (
    <div className={`pagination${className ? ` ${className}` : ''}`}>
      {Array.from({ length: total }).map((_, index) => {
        return (
          <Button
            key={index}
            className="pagination__item"
            href={'/game'}
            text={(++index).toString()}
            useFixWidth={false}></Button>
        )
      })}
      <Button
        className="pagination__next"
        href={'/game'}
        text="Вперед"
        useFixWidth={false}></Button>
    </div>
  )
}
