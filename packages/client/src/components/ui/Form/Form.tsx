import './Form.scss'
import React from 'react'

interface FormProps {
  className?: string
  children?: React.ReactNode
  onSubmit?: () => void
}

export const Form = (props: FormProps) => {
  const { onSubmit, className, children } = props
  return (
    <form onSubmit={onSubmit} className={`form ${className}`}>
      {children}
    </form>
  )
}
