import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import Contact from './components/Contact'
import RecruiterDashboard from './pages/RecruiterDashboard'
import ProjectDetail from './pages/ProjectDetail'

const App = () => {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/recruiter' element={<RecruiterDashboard />} />
        <Route path='/projects/:id' element={<ProjectDetail />} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
