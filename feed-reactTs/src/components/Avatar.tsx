import styles from './Avatar.module.css'

interface AvatarProps{
  alt?: string
  hasBorder?: boolean
  src: string
}

export function Avatar({ hasBorder = true, src, alt }: AvatarProps) {
  return (
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      src={src} alt={alt}/>
  )
}
