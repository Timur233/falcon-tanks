import DestroyedTanksImage from '../../assets/images/destroyed-tanks.png'
import './Error.scss'

interface ErrorProps {
  code: number
  message: string
}

export const Error = (props: ErrorProps) => {
  return (
    <div className={'error-page'}>
      <div className={'error-page__info'}>
        <span>{props.code}</span>
        <h1>{props.message}</h1>
      </div>
      <img
        className={'error-page__destroyed-tanks'}
        src={DestroyedTanksImage}
        alt={'Destroyed tanks'}
      />
    </div>
  )
}
