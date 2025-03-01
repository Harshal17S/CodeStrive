import React from 'react'
import ParentComponent from './components/Harox/ParentComponent'; // Adjust the path as necessary
import Navbar from './components/Navbar/Navbar';

import { NavBarDemo } from './components/ui/Demo'
import { ThemeProvider } from './components/ui/theme-provider'

const App = () => {
  return (
    <>
    {/* <ThemeProvider>
    <NavBarDemo />
    </ThemeProvider> */}
      <Navbar/>
      <ParentComponent />
    </>
  )
}

export default App