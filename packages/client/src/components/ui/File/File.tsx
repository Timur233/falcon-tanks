import './File.scss'

interface FileProps {
  className?: string
}

export const File = (props: FileProps) => {
  const { className = '' } = props
  return (
    <button className={`file${className ? ' className' : ''}`}>
      Прикрепить файл
    </button>
  )
}
