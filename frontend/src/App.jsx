import { ReactLenis, useLenis } from 'lenis/react'
import './App.css'
import LandingPage from './pages/LandingPage'

function App() {

  return (
    <ReactLenis root options={
      {
        lerp: 0.05,
        syncTouch: true,
      }
      }>
       <LandingPage/>
      </ReactLenis>
  )
}

export default App
