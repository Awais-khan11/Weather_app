import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { City } from './components/City'
import { WeatherProvider } from './context/WeatherContext'

const App = () => {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/city' element={<City></City>} />
        </Routes>
      </BrowserRouter>
    </WeatherProvider>

  )
}

export default App