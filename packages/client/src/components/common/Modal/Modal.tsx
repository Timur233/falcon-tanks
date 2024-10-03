import { Icon } from '@/components/ui/Icon/Icon'
import './Modal.scss'
import ReactDOM from 'react-dom'
import { useEffect } from 'react'

type ModalPropsType = {
  show: boolean
  onClose: () => void
  width?: number | null
  height?: number | null
  children: React.ReactNode
}

export const Modal = (props: ModalPropsType) => {
  const { children, onClose, show = false, width = null, height = null } = props
  const modalRoot = document.getElementById('modal-root') || document.body

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      event.preventDefault()

      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <div className={`modal ${show ? 'modal_show' : ''}`} onClick={onClose}>
      <div
        className="modal__content"
        onClick={e => e.stopPropagation()}
        style={{
          width: width ? `${width}px` : '',
          height: height ? `${height}px` : '',
        }}>
        <div className="modal__decor"></div>
        <button className="modal__close-btn" onClick={onClose}>
          <Icon id="close-icon" width={18} height={18} />
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  )
}
