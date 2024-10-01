import { useEffect, useState } from 'react'

export const SvgSprite = () => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded === false) {
      fetch('/sprite.symbol.svg')
        .then(res => res.text())
        .then(svgContent => {
          const sprite = document.querySelector('#svg-sprite')

          if (!sprite) {
            const div = document.createElement('div')

            div.id = 'svg-sprite'
            div.style.display = 'none'
            div.innerHTML = svgContent

            document.body.appendChild(div)
            setIsLoaded(true)
          }
        })
    }
  }, [])

  return null
}
