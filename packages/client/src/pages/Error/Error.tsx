import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import DestroyedTanksImage from '../../assets/images/destroyed-tanks.png'
import './Error.scss'
import { Header } from '@/components/common/Header/Header'

export const Error = () => {
  const error = useRouteError()

  let status
  let statusText

  if (isRouteErrorResponse(error)) {
    status = error.status
    statusText = error.statusText
  } else {
    statusText = 'Something went wrong, we are already correcting the error'
  }

  return (
    <div className="error-page-layout">
      <Header className="error-page-layout__header" />
      <div className="error-page-layout__body">
        <div className={'error-page'}>
          <div className={'error-page__info'}>
            <span>{status || 'Oops!'}</span>
            <h1>{statusText}</h1>
          </div>
          <img
            className={'error-page__destroyed-tanks'}
            src={DestroyedTanksImage}
            alt={'Destroyed tanks'}
          />
        </div>
      </div>
    </div>
  )
}
