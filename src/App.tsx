import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Property from './pages/Property'
import Estimer from './pages/Estimer'
import Accompagnement from './pages/Accompagnement'
import SurMesure from './pages/SurMesure'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/acheter" element={<Listings rubrique="acheter" />} />
            <Route path="/louer" element={<Listings rubrique="louer" />} />
            <Route path="/favoris" element={<Listings rubrique="acheter" favoritesOnly />} />
            <Route path="/bien/:id" element={<Property />} />
            <Route path="/estimer" element={<Estimer />} />
            <Route path="/accompagnement" element={<Accompagnement />} />
            <Route path="/recherche-sur-mesure" element={<SurMesure />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
