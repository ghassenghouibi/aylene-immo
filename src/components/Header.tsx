import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Heart, Menu, X } from './Icons'
import { useFavorites } from '../hooks/useFavorites'
import './Header.css'

const NAV = [
  { to: '/acheter', label: 'Acheter' },
  { to: '/louer', label: 'Louer' },
  { to: '/estimer', label: 'Estimer' },
  { to: '/quartiers', label: 'Quartiers' },
  { to: '/accompagnement', label: 'Notre méthode' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { count } = useFavorites()
  const { pathname } = useLocation()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`hdr${scrolled ? ' hdr-scrolled' : ''}`}>
      <div className="container hdr-row">
        <Logo height={22} />
        <nav className="hdr-nav hide-mobile">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}</NavLink>)}
        </nav>
        <div className="row" style={{ gap: 10 }}>
          <Link to="/favoris" className="btn btn-outline btn-sm hdr-fav" aria-label="Favoris">
            <Heart size={16} filled={count > 0} /><span className="hide-mobile">{count > 0 ? count : 'Favoris'}</span>
          </Link>
          <Link to="/recherche-sur-mesure" className="btn btn-primary btn-sm hide-mobile">Recherche sur-mesure</Link>
          <button className="btn btn-outline btn-icon btn-sm show-mobile" onClick={() => setOpenAt(open ? null : pathname)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && (
        <div className="hdr-mobile">
          {NAV.map((n) => <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? 'active' : '')}>{n.label}</NavLink>)}
          <Link to="/recherche-sur-mesure" className="btn btn-primary btn-block mt-16">Recherche sur-mesure</Link>
        </div>
      )}
    </header>
  )
}
