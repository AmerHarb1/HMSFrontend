import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import './App.css'

function App() {
    return (
    <Routes>
      <Route index element={<HomePage/>}/> {/* index = path="/"*/}
      <Route path="/checkout" element={<HomePage/>}/>
    </Routes>
  )
}

export default App
