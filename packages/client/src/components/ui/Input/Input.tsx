import './Input.scss'
import React, { ChangeEventHandler, CSSProperties } from 'react'

interface InputProps {
  placeholder?: string
  name?: string
  className?: string
  disabled?: boolean
  value?: string
  type?: string
  onChange?: ChangeEventHandler | undefined
  style?: CSSProperties | undefined
}

export const Input = (props: InputProps) => {
  const { value, className, disabled, onChange, style } = props
  return (
    <input
      value={value}
      className={className}
      disabled={disabled}
      onChange={onChange}
      style={style}
      {...props}
    />
  )
}
