import React from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'; 
import Users from './pages/Users'
import Update from './pages/Update'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          {/* <Route path="/add" element={<Add />} /> */}
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
