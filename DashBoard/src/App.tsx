import React from 'react'
import { NavBarDemo } from './components/ui/Demo'
import { ThemeProvider } from './components/ui/theme-provider'

const App = () => {
  return (
    <>
    <ThemeProvider>
    <NavBarDemo />
    </ThemeProvider>
    </>
  )
}

export default App