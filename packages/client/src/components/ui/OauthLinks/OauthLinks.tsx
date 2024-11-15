import { ReactNode } from 'react'
import './OauthLinks.scss'

export const OauthLinks = (props: {
  className?: string | undefined
  children?: ReactNode | null
}) => {
  const { className = '', children = null } = props
  return <div className={`oauth-buttons ${className}`}>{children}</div>
}
