import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import KneelDiamonds from './components/KneelDiamonds.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KneelDiamonds />
  </StrictMode>,
)
