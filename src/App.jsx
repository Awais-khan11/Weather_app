import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { City} from './components/City'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path='/city' element={<City></City>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App