import './Loader.scss'
import { useEffect, useState } from 'react'
import LoaderGif from '@/assets/images/loader.png'

type LoaderPropsType = {
  show: boolean
  onClose?: () => void
}

export const Loader = (props: LoaderPropsType) => {
  const { show, onClose } = props
  const [showCloseButton, setShowCloseButton] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (show) {
      timer = setTimeout(() => {
        setShowCloseButton(true)
      }, 5000)
    } else {
      setShowCloseButton(false)
    }

    return () => clearTimeout(timer)
  }, [show])

  return (
    <div className={`preloader ${show ? 'preloader_show' : ''}`}>
      <div className="preloader__road">
        <img className="preloader__image" src={LoaderGif} alt="loader" />
      </div>
      {showCloseButton && (
        <button className="preloader__close-btn" onClick={onClose}>
          Закрыть
        </button>
      )}
    </div>
  )
}
