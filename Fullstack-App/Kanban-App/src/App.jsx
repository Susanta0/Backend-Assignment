import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AllRouter } from './Router/AllRouter'
import { Navbar } from './Navbar/Navbar'

function App() {
  

  return (
    <>
    <Navbar/>
      <AllRouter/>
    </>
  )
}

export default App
