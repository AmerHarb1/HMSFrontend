import { it, expect, describe, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event'; 
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { Product } from './Product';

vi.mock('axios');   //this would mock axios when it's encountered in the tested code 

describe('Product componenet', () => {
    let product;
    let loadCart;

    beforeEach(() => {  //beforeEach is a test hook that resets the variables used in tests for every test.
        product = {id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                    rating: {
                    stars: 4.5,
                    count: 87
                    },
                    priceCents: 1090,
                    keywords: ["socks", "sports", "apparel"]};

        loadCart = vi.fn();   //mock function
    });

    it('display the product details correctly', () => {
        
        render(<Product product={product} loadCart={loadCart}/>);

        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-stars-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');

        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
    });

    it('add product to cart', async () => {
        
        render(<Product product={product} loadCart={loadCart}/>);

        const user = userEvent.setup();
        
        const addToCartButton = screen.getByTestId('add-to-cart-button');

        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            'http://localhost:3000/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );
        expect(loadCart).toHaveBeenCalled();
    });
});