import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './landing-page.css'
import App from './App.tsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
