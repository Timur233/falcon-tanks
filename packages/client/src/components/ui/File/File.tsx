import { Icon } from '../Icon/Icon'
import './File.scss'

interface FileProps {
  className?: string
}

export const File = (props: FileProps) => {
  const { className = '' } = props
  return (
    <>
      {/* TODO: Implement the logic of the file upload component */}
      {/* <input type="file" /> */}
      <button className={`file${className ? ' className' : ''}`}>
        <Icon id="attach-icon" width={11} height={13} />
        Прикрепить файл
      </button>
    </>
  )
}
