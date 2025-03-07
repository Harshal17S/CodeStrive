import React from 'react'
import { MainRender } from './components/ui/MainRender'
import { ThemeProvider } from './components/ui/theme-provider'
import {Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <>
    <ThemeProvider>
    <Routes>
      <Route path="/" element={<MainRender />} />
    </Routes>
    </ThemeProvider>
    </>
  )
}

export default App