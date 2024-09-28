import './Loader.scss'
import LoaderGif from '@/assets/images/loader.png'

type LoaderPropsType = {
  show?: boolean
}

export const Loader = (props: LoaderPropsType) => {
  const { show } = props

  return (
    <div className={`preloader ${show ? 'preloader_show' : ''}`}>
      <div className="preloader__road">
        <img className="preloader__image" src={LoaderGif} alt="loader" />
      </div>
    </div>
  )
}
