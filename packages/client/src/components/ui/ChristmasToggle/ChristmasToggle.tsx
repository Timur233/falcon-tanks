import React, { useEffect, useState } from 'react'
import './ChristmasToggle.scss'

interface IosToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const ChristmasToggle: React.FC<IosToggleProps> = ({
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleToggle = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    if (onChange) onChange(newChecked)
  }

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  return (
    <div
      className={`christmas-toggle ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}>
      <div className="christmas-toggle__slider" />
    </div>
  )
}
