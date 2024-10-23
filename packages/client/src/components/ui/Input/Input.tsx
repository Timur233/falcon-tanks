import './Input.scss'
import React, { ChangeEventHandler, FocusEventHandler, CSSProperties } from 'react'

interface InputProps {
  placeholder?: string
  name?: string
  className?: string
  disabled?: boolean
  value?: string
  type?: string
  label?: string
  onChange?: ChangeEventHandler | undefined
  onBlur?: FocusEventHandler | undefined
  onFocus?: FocusEventHandler | undefined
  style?: CSSProperties | undefined
}

export const Input = (props: InputProps) => {
  const { value, name, className, label, disabled, onChange, onBlur, onFocus, style } = props
  return (
    <div className={'input-wrapper'}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...props}
        name={name}
        value={value}
        className={`input-default ${className}`}
        disabled={disabled}
        onChange={onChange}
        style={style}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </div>
  )
}
