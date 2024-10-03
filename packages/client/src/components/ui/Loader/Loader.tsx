import './Loader.scss'
import LoaderGif from '@/assets/images/loader.png'

type LoaderPropsType = {
  show: boolean
  onClose?: () => void
}

export const Loader = (props: LoaderPropsType) => {
  const { show, onClose } = props

  return (
    <div className={`preloader ${show ? 'preloader_show' : ''}`}>
      <div className="preloader__road">
        <img className="preloader__image" src={LoaderGif} alt="loader" />
      </div>
      <button className="preloader__close-btn" onClick={onClose}>
        Закрыть
      </button>
    </div>
  )
}
