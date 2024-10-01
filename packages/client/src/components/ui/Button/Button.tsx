import { Link } from 'react-router-dom'
import './Button.scss'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  href?: string | undefined
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onClick?: (() => Promise<void>) | (() => any) | undefined
}) => {
  const { text, className, useFixWidth = false, href = '/', onClick } = props
  return (
    <button
      className={`custom-button ${className} ${
        useFixWidth ? 'custom-button_fix-width' : ''
      }`}
      onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}
