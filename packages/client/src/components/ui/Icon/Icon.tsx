type IconPropsType = {
  id: string
  width?: number
  height?: number
  className?: string
}

export const Icon = (props: IconPropsType) => {
  const { id, width = 24, height = 24, className = '' } = props

  return (
    <svg className={className} width={width} height={height}>
      <use href={`#${id}`} />
    </svg>
  )
}
