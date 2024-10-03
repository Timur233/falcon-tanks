interface ImageProps {
  src: string
  className?: string
  alt?: string
}

export const Image = (props: ImageProps) => {
  const { src, className, alt } = props
  return <img {...props} />
}
