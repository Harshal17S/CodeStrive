import React from 'react'
import HaroxCompWrapper from './components/Harox/HaroxCompWrapper'
import { NavBarDemo } from './components/ui/Demo'
import { ThemeProvider } from './components/ui/theme-provider'
import {Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <>
    <ThemeProvider>
    <Routes>
      <Route path="/" element={<NavBarDemo />} />
      <Route path="/winReward" element={<HaroxCompWrapper />} />
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App