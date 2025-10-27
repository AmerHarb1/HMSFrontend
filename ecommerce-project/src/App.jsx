import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import './App.css'

function App() {
    return (
    <Routes>
      <Route index element={<HomePage/>}/> {/* index = path="/"*/}
      <Route path="/checkout" element={<CheckoutPage/>}/>
    </Routes>
  )
}

export default App
