import { Link } from 'react-router-dom'

export const Game = () => {
  return (
    <>
      Тут будет игра
      <Link to={'/forum'}>Forum</Link>
    </>
  )
}
