import { Link } from 'react-router-dom'
import logo from '../assets/logo.jpg'

/** Logo Aylene (fichier `logo.jpg` à la racine du dépôt, copié dans src/assets). */
export default function Logo({ height = 44, to = '/' }: { height?: number; to?: string }) {
  return (
    <Link to={to} aria-label="Aylene — accueil" style={{ display: 'inline-flex', alignItems: 'center' }}>
      <img src={logo} alt="Aylene" style={{ height, width: 'auto', mixBlendMode: 'multiply' }} />
    </Link>
  )
}
