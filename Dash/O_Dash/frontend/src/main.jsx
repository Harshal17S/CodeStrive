import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={"pk_test_c3dlZXQtZG9nZmlzaC0xOC5jbGVyay5hY2NvdW50cy5kZXYk"}>
      <App />
    </ClerkProvider>
  </StrictMode>
)
