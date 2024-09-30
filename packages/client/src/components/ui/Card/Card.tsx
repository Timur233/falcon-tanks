import './Card.scss'

interface CardProps {
  className?: string
  children: React.ReactNode
}

export const Card = (props: CardProps) => {
  const { className = '', children } = props
  return (
    <div className={'card'}>
      <div className={`card__content${className ? ` ${className}` : ''}`}>
        {children}
      </div>
    </div>
  )
}
