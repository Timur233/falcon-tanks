import { Link } from 'react-router-dom'
import './Button.scss'
import './CompactButton.scss'

export const Button = (props: {
  text: string
  className?: string
  useFixWidth?: boolean
  href?: string
}) => {
  const { text, className = '', useFixWidth = false, href = '/' } = props
  return (
    <Link
      to={href}
      className={`custom-button ${className} ${
        useFixWidth ? 'custom-button_fix-width' : ''
      }`}>
      <span>{text}</span>
    </Link>
  )
}
