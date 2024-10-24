import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Dashboard from './components/main/Dashboard'
import SkillTest from './components/main/SkillTest'
import Internship from './components/main/Internship'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route index element={<SkillTest />} />
          <Route path='internship' element={<Internship />} />
        </Route>
      </Routes>
    </>
  )
}

export default App