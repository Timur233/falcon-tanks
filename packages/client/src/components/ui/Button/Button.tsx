import { Link } from 'react-router-dom'
import './Button.scss'
import React from 'react'

export const Button = (props: {
  text: string
  className?: string | undefined
  useFixWidth?: boolean | undefined
  href?: string | undefined
  onClick?:
    | ((
        event:
          | React.MouseEvent<HTMLButtonElement>
          | React.FormEvent<HTMLFormElement>
      ) => void)
    | (() => Promise<void>)
}) => {
  const { text, className, useFixWidth = false, href = '/', onClick } = props
  return (
    <>
      {onClick && typeof onClick === 'function' ? (
        <button
          className={`custom-button ${className} ${
            useFixWidth ? 'custom-button_fix-width' : ''
          }`}
          onClick={onClick}>
          <span>{text}</span>
        </button>
      ) : (
        <Link
          to={href}
          className={`custom-button ${className} ${
            useFixWidth ? 'custom-button_fix-width' : ''
          }`}>
          <span>{text}</span>
        </Link>
      )}
    </>
  )
}
