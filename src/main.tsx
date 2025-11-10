import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'  // ← KEEP THIS
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ← NEED THIS */}
      <App />
      <Analytics />
    </BrowserRouter>  {/* ← NEED THIS */}
  </React.StrictMode>,
)