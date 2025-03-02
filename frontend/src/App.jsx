import { ReactLenis, useLenis } from 'lenis/react'
import './App.css'
import LandingPage from './pages/LandingPage'
import {Routes,Route} from 'react-router-dom'
import UserProfileO from './components/UserProfileO'

function App() {

  return (
    <ReactLenis root options={
      {
        lerp: 0.05,
        syncTouch: true,
      }
      }>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<UserProfileO/>}/>
      </Routes>
      </ReactLenis>
  )
}

export default App
