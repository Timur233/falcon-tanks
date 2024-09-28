import { useEffect, useState } from 'react'
import { ButtonMid } from '../buttons/ButtonMid/ButtonMid'
import './Arrows.scss'

export const Arrows = () => {
  const [activeButtons, setActiveButtons] = useState({
    upButton: false,
    downButton: false,
    leftButton: false,
    rightButton: false,
  })

  const toggleButton = (buttonName: string, state: boolean) => {
    setActiveButtons({ ...activeButtons, [buttonName]: state })
  }

  const handleKey = (event: KeyboardEvent) => {
    console.log(activeButtons)

    switch (event.key) {
      case 'ArrowUp':
        toggleButton('upButton', event.type === 'keydown' ? true : false)
        break
      case 'ArrowDown':
        toggleButton('downButton', event.type === 'keydown' ? true : false)
        break
      case 'ArrowLeft':
        toggleButton('leftButton', event.type === 'keydown' ? true : false)
        break
      case 'ArrowRight':
        toggleButton('rightButton', event.type === 'keydown' ? true : false)
        break
      default:
        break
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKey)
    }
  })

  return (
    <div className="controll-arrows">
      <div className="controll-arrows__horizontal horizontal-arrows">
        <ButtonMid
          buttonName="leftButton"
          isPressed={activeButtons.leftButton}
          toggleButton={toggleButton}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0L30 33L3.5 16.5L30 0Z" fill="white" />
          </svg>
        </ButtonMid>
        <ButtonMid
          buttonName="rightButton"
          isPressed={activeButtons.rightButton}
          toggleButton={toggleButton}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 33V0L29.5 16.5L3 33Z" fill="white" />
          </svg>
        </ButtonMid>
      </div>
      <div className="controll-arrows__vertical vertical-arrows">
        <ButtonMid
          buttonName="leftButton"
          isPressed={activeButtons.leftButton}
          toggleButton={toggleButton}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M30 0L30 33L3.5 16.5L30 0Z" fill="white" />
          </svg>
        </ButtonMid>
        <ButtonMid
          buttonName="rightButton"
          isPressed={activeButtons.rightButton}
          toggleButton={toggleButton}>
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 33V0L29.5 16.5L3 33Z" fill="white" />
          </svg>
        </ButtonMid>
      </div>
    </div>
  )
}
