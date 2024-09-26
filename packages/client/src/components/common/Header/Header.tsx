import { Link, NavLink } from 'react-router-dom'
import SiteLogo from '@/assets/images/site-logo.svg'
import './Header.scss'

type HeaderProps = {
  className: string
}

export const Header = (props: HeaderProps) => {
  const { className = '' } = props
  const isActiveNavLink = (isActive: boolean) =>
    isActive ? 'main-nav__link main-nav__link_active' : 'main-nav__link'

  return (
    <header className={`main-header ${className}`}>
      <div className="container-fluid main-header__container">
        <div className="main-header__logo-block logo-block">
          <Link className="logo-block__link" to="/">
            <img
              src={SiteLogo}
              className="logo-block__image"
              alt="Falcon Tanks Logo"
              draggable="false"
            />
          </Link>
        </div>
        <nav className="main-header__nav main-nav">
          <NavLink
            className={({ isActive }) => isActiveNavLink(isActive)}
            to="/">
            Главная
          </NavLink>
          <NavLink
            className={({ isActive }) => isActiveNavLink(isActive)}
            to="/leaderboard">
            Лидеры
          </NavLink>
          <NavLink
            className={({ isActive }) => isActiveNavLink(isActive)}
            to="/forum">
            Форум
          </NavLink>
          <NavLink
            className={({ isActive }) => isActiveNavLink(isActive)}
            to="/profile">
            Профиль
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
