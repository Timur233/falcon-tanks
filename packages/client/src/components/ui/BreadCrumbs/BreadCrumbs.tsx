import { Link } from 'react-router-dom'
import './BreadCrumbs.scss'

type BreadCrumb = {
  title: string
  href: string
}

interface BreadCrumbsProps {
  breadCrumbs: BreadCrumb[]
  className?: string
}

export const BreadCrumbs = (props: BreadCrumbsProps) => {
  const { breadCrumbs, className } = props

  return (
    <nav className={`breadcrumbs ${className}`}>
      {breadCrumbs.map((crumb, index) => (
        <Link className="breadcrumbs__item" key={index} to={crumb.href}>
          {crumb.title}
        </Link>
      ))}
    </nav>
  )
}
