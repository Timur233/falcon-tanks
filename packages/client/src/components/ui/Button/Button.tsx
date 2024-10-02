import './Button.scss'
import React from 'react'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  onClick?: () => void
}) => {
  const { text, className, useFixWidth = false, onClick } = props
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
