import { Link, NavLink } from 'react-router-dom'
import SiteLogo from '@/assets/images/site-logo.svg'
import './Header.scss'
import { updateTheme } from '@/store/reducers/theme-reducer'
import { RootState, store } from '@/store'
import { ChristmasToggle } from '@/components/ui/ChristmasToggle/ChristmasToggle'
import { useSelector } from 'react-redux'

type HeaderProps = {
  className?: string
}

export const Header = (props: HeaderProps) => {
  const { className = '' } = props
  const getNavLinkClassName = (isActive: boolean) =>
    isActive ? 'main-nav__link main-nav__link_active' : 'main-nav__link'
  const themeAlias = useSelector<RootState, string>(
    state => state.themeReducer.themeAlias
  )

  const toggleTheme = (isChecked: boolean) => {
    store
      .dispatch(updateTheme(isChecked ? 'christmas' : 'standart'))
      .unwrap()
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <header className={`main-header ${className}`}>
      <div className="container-fluid">
        <div className="main-header__container">
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
              className={({ isActive }) => getNavLinkClassName(isActive)}
              to="/">
              Главная
            </NavLink>
            <NavLink
              className={({ isActive }) => getNavLinkClassName(isActive)}
              to="/leaderboard">
              Лидеры
            </NavLink>
            <NavLink
              className={({ isActive }) => getNavLinkClassName(isActive)}
              to="/forum">
              Форум
            </NavLink>
            <NavLink
              className={({ isActive }) => getNavLinkClassName(isActive)}
              to="/profile">
              Профиль
            </NavLink>
            <ChristmasToggle
              checked={themeAlias === 'christmas'}
              onChange={toggleTheme}
            />
          </nav>
        </div>
      </div>
    </header>
  )
}
