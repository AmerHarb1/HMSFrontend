import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';

export function DeliveryOptions({cartItem, deliveryOptions}) {
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
                return (
                    <div key={deliveryOptions.id} className="delivery-option">
                        <input type="radio"
                            checked={deliveryOption.id === cartItem.deliveryOptionId}
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