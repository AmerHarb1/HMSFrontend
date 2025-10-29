import dayjs from 'dayjs';
import axios from 'axios';
import { formatMoney } from '../../utils/money';

export function DeliveryOptions({cartItem, deliveryOptions, loadCart}) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {deliveryOptions.map((deliveryOption) => {
                let shippingPrice = 'Free Shipping';
                if (deliveryOption.priceCents > 0) {
                    shippingPrice = `${formatMoney(deliveryOption.priceCents)} - Shipping`;
                }

                const updateDeliveryOption = async() => {
                    await axios.put(`http://localhost:3000/api/cart-items/${cartItem.productId}`, {
                        deliveryOptionId: deliveryOption.id
                    });
                    await loadCart();
                };

                return (
                    <div key={deliveryOptions.id} className="delivery-option" onClick={updateDeliveryOption}>
                        <input type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
                            onChange={()=>{}}
                            className="delivery-option-input"
                            name={`delivery-option-${cartItem.productId}`} />
                        <div>
                            <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                            </div>
                            <div className="delivery-option-price">
                                {shippingPrice}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}