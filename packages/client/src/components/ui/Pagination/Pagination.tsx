import { Button } from '../Button/Button'
import './Pagination.scss'

interface PaginationProps {
  total: number
  className?: string
}

export const Pagination = (props: PaginationProps) => {
  const { total, className = '' } = props

  const getClassName = (index: number) => {
    return `pagination__item compact-button${
      index !== 0 ? ' compact-button_white' : ''
    }`
  }

  return (
    <div className={`pagination${className ? ` ${className}` : ''}`}>
      {Array.from({ length: total }).map((_, index) => {
        return (
          <Button
            key={index}
            className={getClassName(index)}
            href={'/game'}
            text={(++index).toString()}
            useFixWidth={false}></Button>
        )
      })}
      <Button
        className="compact-button compact-button_white"
        href={'/game'}
        text="Вперед"
        useFixWidth={false}></Button>
    </div>
  )
}
