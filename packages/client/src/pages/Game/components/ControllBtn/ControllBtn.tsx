import './ControllBtn.scss'

type ControllBtnPropsType = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  onMouseDown?: () => void
  onMouseUp?: () => void
}

export const ControllBtn = (props: ControllBtnPropsType) => {
  const { className, ...rest } = props

  return (
    <button className={`controll-btn ${className}`} {...rest}>
      {rest.children}
    </button>
  )
}
