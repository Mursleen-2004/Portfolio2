import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Contact from './components/Contact'


const App = () => {
  return (
    <>
    
    <Routes>

       
    <Route path='/' element={<Home/>}   />
    <Route path='/contact' element={<Contact/>}   />
    
    
    </Routes>

    
    
    </>
  )
}

export default App