import axios from 'axios';
import { Routes, Route } from 'react-router'
import { useEffect, useState} from 'react';
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3000/api/cart-items?expand=product') // get the cart data.   ?expand=product: adds the product details to the response
            .then((response)=> {
                setCart(response.data);    //set cart once response has data  
            });
    },[]);

    return (
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/> {/* index = path="/"*/}
      <Route path="/checkout" element={<CheckoutPage cart={cart}/>}/>
      <Route path="/orders" element={<OrdersPage/>}/>
    </Routes>
  )
}

export default App
