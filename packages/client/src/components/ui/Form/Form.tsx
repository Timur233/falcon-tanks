import './Form.scss'
import React from 'react'

interface FormProps {
  className?: string
  children?: React.ReactNode
  onSubmit?: () => void
  name?: string
}

export const Form = (props: FormProps) => {
  const { onSubmit, className, children, name } = props
  return (
    <form name={name} onSubmit={onSubmit} className={`form-fields ${className}`}>
      {children}
    </form>
  )
}
