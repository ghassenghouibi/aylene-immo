import { useState, type ReactNode } from 'react'

/** Image avec repli : si le visuel ne charge pas, on garde un fond dégradé doux. */
export default function Photo({ src, alt = '', tone = '', className = '', children, style, eager = false }: {
  src?: string; alt?: string; tone?: '' | 'ph-warm' | 'ph-dark'; className?: string; children?: ReactNode; style?: React.CSSProperties; eager?: boolean
}) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`ph ${tone} ${className}`} style={style}>
      {src && !failed && <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />}
      {children}
    </div>
  )
}
