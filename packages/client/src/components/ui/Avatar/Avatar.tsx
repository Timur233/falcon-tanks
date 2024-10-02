import './Avatar.scss'
import React, { useState, useRef, useEffect } from 'react'
import { Image } from '@/components/ui/Image/Image'
import AvatarPlaceholder from '@/assets/images/avatar-placeholder.png'

export const AVATAR_SRC = import.meta.env.VITE_SRC_URL

export const Avatar = (props: {
  src: string
  containerClassName?: string
  imageClassName?: string
  onChange: (file: File) => void
}) => {
  const { src, containerClassName, imageClassName, onChange } = props
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
      onChange(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const displaySrc = previewUrl || src

  return (
    <div className={`avatar ${containerClassName}`}>
      {displaySrc ? (
        <Image
          src={displaySrc}
          className={`avatar__image ${imageClassName}`}
          alt="Avatar"
        />
      ) : (
        <Image
          src={AvatarPlaceholder}
          className={'avatar__image-placeholder'}
          alt="Avatar"
        />
      )}
      <div className="avatar__overlay">
        <button className={'avatar__change-button'} onClick={handleButtonClick}>
          {'Изменить аватар'}
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/gif"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
