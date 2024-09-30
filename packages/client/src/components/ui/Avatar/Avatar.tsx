import React, { useState, useRef, useEffect } from 'react'
import { Image } from '@/components/ui/Image/Image'
import { Button } from '@/components/ui/Button/Button'

export const AVATAR_SRC = 'https://ya-praktikum.tech/api/v2/resources'

export const Avatar = (props: {
  src: string
  containerClassName?: string
  imageClassName?: string
  onAvatarChange: (file: File) => void
}) => {
  const { src, containerClassName, imageClassName, onAvatarChange } = props
  const [isHovered, setIsHovered] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)
      onAvatarChange(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const displaySrc = previewUrl || src

  return (
    <div
      className={`${containerClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {displaySrc ? (
        <Image src={displaySrc} className={imageClassName} alt="Avatar" />
      ) : (
        <div className="avatar-placeholder">
          {/* Здесь можно добавить иконку или текст для placeholder */}
        </div>
      )}
      {isHovered && (
        <div className="overlay">
          <Button
            text="Изменить аватар"
            className="change-button"
            useFixWidth={false}
            onClick={handleButtonClick}
          />
        </div>
      )}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
