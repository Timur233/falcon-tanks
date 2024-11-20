import React, { useState } from 'react'
import './ChristmasToggle.scss'

interface IosToggleProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
}

export const ChristmasToggle: React.FC<IosToggleProps> = ({
  checked = false,
  onChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked)

  const handleToggle = () => {
    const newChecked = !isChecked
    setIsChecked(newChecked)
    if (onChange) onChange(newChecked)
  }

  return (
    <div
      className={`christmas-toggle ${isChecked ? 'checked' : ''}`}
      onClick={handleToggle}>
      <div className="christmas-toggle__slider" />
    </div>
  )
}
