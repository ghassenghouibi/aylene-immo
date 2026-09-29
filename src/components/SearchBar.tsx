import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from './Icons'
import { BUDGETS_LOCATION, BUDGETS_VENTE, CATEGORIES, ZONES, fmt, type Rubrique } from '../lib/listings'
import './SearchBar.css'

export default function SearchBar() {
  const nav = useNavigate()
  const [tab, setTab] = useState<Rubrique>('acheter')
  const [zone, setZone] = useState('')
  const [type, setType] = useState('')
  const [budget, setBudget] = useState('')
  const [complet, setComplet] = useState(false)
  const budgets = tab === 'louer' ? BUDGETS_LOCATION : BUDGETS_VENTE

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (zone) q.set('zone', zone)
    if (type) q.set('type', type)
    if (budget) q.set('budget', budget)
    if (complet) q.set('dossier', '1')
    nav(`/${tab}${q.toString() ? `?${q}` : ''}`)
  }

  return (
    <form className="sb" onSubmit={submit}>
      <div className="seg sb-seg" role="tablist">
        {(['acheter', 'louer'] as Rubrique[]).map((k) => (
          <button type="button" key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => { setTab(k); setBudget('') }}>
            {k === 'acheter' ? 'Acheter' : 'Louer'}
          </button>
        ))}
      </div>
      <div className="sb-fields">
        <label className="field sb-field">
          <span className="label">Quartier</span>
          <select className="select" value={zone} onChange={(e) => setZone(e.target.value)}>
            <option value="">Tout le Grand Tunis</option>
            {ZONES.map((z) => <option key={z.slug} value={z.slug}>{z.name}</option>)}
          </select>
        </label>
        <label className="field sb-field">
          <span className="label">Type</span>
          <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Tous les types</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="field sb-field">
          <span className="label">Budget</span>
          <select className="select" value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Tous les budgets</option>
            {budgets.map((b) => <option key={b} value={b}>Jusqu'à {fmt(b)} DT{tab === 'louer' ? ' / mois' : ''}</option>)}
          </select>
        </label>
        <button type="submit" className="btn btn-primary sb-submit"><Search size={17} /> Rechercher</button>
      </div>
      <label className="check sb-check">
        <input type="checkbox" checked={complet} onChange={(e) => setComplet(e.target.checked)} />
        Uniquement les biens au dossier complet
      </label>
    </form>
  )
}
