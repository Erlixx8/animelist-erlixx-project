import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Tambahkan import ini
import './index.css'
import App from './App.jsx'
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. Bungkus App dengan BrowserRouter */}
    <BrowserRouter>
      <App />

      <SpeedInsights />
    </BrowserRouter>
  </StrictMode>,
)