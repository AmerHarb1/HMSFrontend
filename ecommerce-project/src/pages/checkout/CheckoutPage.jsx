import axios from 'axios';
import { useEffect, useState} from 'react';
import { PaymentSummary } from './PaymentSummary';
import { OrderSummary } from './OrderSummary';
import './checkout-header.css'
import './CheckoutPage.css'

export function CheckoutPage({cart, loadCart}) {
    const [paymentSummary, setPaymentSummary] = useState(null); //null is used because paymentSummary is an object and it's easier to test null rather than empty array
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    useEffect(()=>{
        const fetchCheckoutData = async()=>{
            let response = await axios.get('http://localhost:3000/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);    //set deliveryOptions once response has data 
            
            response = await axios.get('http://localhost:3000/api/payment-summary');
            setPaymentSummary(response.data);
        };
        fetchCheckoutData();
    },[cart]); //rerun functions inside useEffect when cart changes

    return (
        <>
            <title>Checkout</title>
            
            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart}/>

                    <PaymentSummary paymentSummary={paymentSummary}/>
                </div>
            </div>
        </>
    );
}