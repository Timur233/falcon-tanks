import './KillsCounter.scss'

type KillsCounterPropsType = {
  kills: number
  className?: string
}

export const KillsCounter = (props: KillsCounterPropsType) => {
  const { kills, className = '' } = props

  return (
    <div className={`kills-counter ${className}`}>
      <span className="kills-counter__number">{kills}</span>
    </div>
  )
}
