import { useState } from 'react'
import { DEFAULT_RATE, acquisitionFees, plan } from '../lib/finance'
import { fmt } from '../lib/listings'
import { Calculator } from './Icons'

/** Simulateur de financement affiché sur chaque fiche de bien à la vente. */
export default function Mortgage({ price }: { price: number }) {
  const [apport, setApport] = useState(20)
  const [years, setYears] = useState(20)
  const [rate, setRate] = useState(DEFAULT_RATE)
  const p = plan(price, apport, years, rate)
  const fees = acquisitionFees(price)
  return (
    <div className="card card-pad">
      <div className="eyebrow row" style={{ gap: 8, marginBottom: 6 }}><Calculator size={15} /> Financer ce bien</div>
      <div className="h-card">Votre mensualité estimée</div>
      <div className="serif num" style={{ fontSize: 40, color: 'var(--blue-ink)', marginTop: 10, lineHeight: 1 }}>
        {fmt(p.monthly)} <span style={{ fontSize: 18, color: 'var(--muted)', fontFamily: 'var(--font-body)' }}>DT / mois</span>
      </div>
      <div className="col mt-24" style={{ gap: 18 }}>
        <label>
          <div className="row between small"><span className="muted">Apport</span><strong className="num">{apport} % · {fmt(p.apport)} DT</strong></div>
          <input type="range" className="range" min={0} max={60} step={5} value={apport} onChange={(e) => setApport(Number(e.target.value))} />
        </label>
        <label>
          <div className="row between small"><span className="muted">Durée</span><strong className="num">{years} ans</strong></div>
          <input type="range" className="range" min={5} max={25} step={1} value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </label>
        <label>
          <div className="row between small"><span className="muted">Taux annuel</span><strong className="num">{rate.toFixed(2)} %</strong></div>
          <input type="range" className="range" min={5} max={12} step={0.25} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
      </div>
      <dl className="kv mt-24">
        <dt>Montant emprunté</dt><dd className="num">{fmt(p.borrowed)} DT</dd>
        <dt>Coût total des intérêts</dt><dd className="num">{fmt(p.interest)} DT</dd>
        <dt>Revenu net conseillé (40 %)</dt><dd className="num">{fmt(p.income)} DT / mois</dd>
        <dt>Frais d'acquisition estimés</dt><dd className="num">{fmt(fees.total)} DT</dd>
      </dl>
      <p className="small muted mt-16">Simulation indicative. Notre conseiller financement compare les offres de nos banques partenaires et négocie le taux pour vous.</p>
    </div>
  )
}
