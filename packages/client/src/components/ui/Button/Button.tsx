import React from 'react'
import './Button.scss'
import './CompactButton.scss'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  type?: 'button' | 'submit'
}) => {
  const { text, className = '', useFixWidth = false, onClick, type = 'button' } = props
  return (
    <button
      type={type}
      className={`custom-button ${className} ${
        useFixWidth ? 'custom-button_fix-width' : ''
      }`}
      onClick={onClick}>
      <span>{text}</span>
    </button>
  )
}
