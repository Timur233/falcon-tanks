import React from 'react'
import './Button.scss'
import './CompactButton.scss'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  disabled?: boolean
}) => {
  const { text, className = '', useFixWidth = false, onClick } = props
  return (
    <button
      className={`custom-button ${className} ${
        useFixWidth ? 'custom-button_fix-width' : ''
      }`}
      onClick={onClick}
      disabled={props.disabled}>
      <span>{text}</span>
    </button>
  )
}
