import { Icon } from '../Icon/Icon'
import './File.scss'

interface FileProps {
  className?: string
  onChange?: (file: File | null) => void
}

export const File = (props: FileProps) => {
  const { className = '', onChange } = props

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onChange?.(file)
    } else {
      onChange?.(null)
    }
  }

  return (
    <div className={`file${className ? ' ' + className : ''}`}>
      <input
        type="file"
        id="file-upload"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload" className="file__button">
        <Icon id="attach-icon" width={11} height={13} />
        Прикрепить файл
      </label>
    </div>
  )
}
