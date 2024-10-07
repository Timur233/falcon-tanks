import './ControllBtn.scss'

type ControllBtnPropsType = {
  children: React.ReactNode
  className?: string
  onClick: () => void
}

export const ControllBtn = (props: ControllBtnPropsType) => {
  const { children, className, onClick } = props

  return (
    <button className={`controll-btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}
