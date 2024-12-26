import React from 'react'
import './Button.scss'
import './CompactButton.scss'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset' | undefined
}) => {
  const {
    text,
    className = '',
    useFixWidth = false,
    onClick,
    type = 'button',
  } = props
  return (
    <button
      className={`custom-button ${className} ${
        useFixWidth ? 'custom-button_fix-width' : ''
      }`}
      onClick={onClick}
      disabled={props.disabled}
      type={type}>
      <span>{text}</span>
    </button>
  )
}
