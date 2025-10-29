import axios from 'axios';
import { Routes, Route } from 'react-router'
import { useEffect, useState} from 'react';
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/orders/OrdersPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  const loadCart = async () => {
        const response = await axios.get('http://localhost:3000/api/cart-items?expand=product'); // get the cart data.   ?expand=product: adds the product details to the response
        setCart(response.data);    //set cart once response has data  
      };

    useEffect(()=>{      
      loadCart();  
    },[]);

    return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>}/> {/* index = path="/"*/}
      <Route path="/checkout" element={<CheckoutPage cart={cart} loadCart={loadCart}/>}/>
      <Route path="/orders" element={<OrdersPage cart={cart}/>}/>
    </Routes>
  )
}

export default App
