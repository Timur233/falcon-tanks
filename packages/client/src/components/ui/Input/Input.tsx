import './Input.scss'
import React, { ChangeEventHandler, CSSProperties } from 'react'

interface InputProps {
  placeholder?: string
  name?: string
  className?: string
  disabled?: boolean
  value?: string
  type?: string
  label?: string
  onChange?: ChangeEventHandler | undefined
  onFocus?: ChangeEventHandler | undefined
  onBlur?: ChangeEventHandler | undefined
  style?: CSSProperties | undefined
}

export const Input = (props: InputProps) => {
  const {
    value,
    name,
    className,
    label,
    disabled,
    onChange,
    onFocus,
    onBlur,
    style,
  } = props
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
        onFocus={onFocus}
        onBlur={onBlur}
        style={style}
      />
    </div>
  )
}
