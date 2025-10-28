import axios from 'axios';
import { useEffect, useState} from 'react';
import { Header } from '../components/Header';
import './HomePage.css';

export function HomePage(){
    const [products, setProducts] = useState([]);  //useState has two props the first is a varial and the second is a function to update the variable
    const [cart, setCart] = useState([]);
    
    useEffect(()=>{
        axios.get('http://localhost:3000/api/products') // we place this code inside useEffect to make it run once, useEffect controls how many time a code inside it would run
            .then((response)=> {
                setProducts(response.data);    //set products once response has data  
            });

        axios.get('http://localhost:3000/api/cart-items') // get the cart data
            .then((response)=> {
                setCart(response.data);    //set cart once response has data  
            });
    },[]);  //[] this array controls the run frequenccy, empty means run once
    

    return (
        <>
            <title>Ecommers Project</title>

            <Header cart = {cart}/>

            <div className="home-page">
                <div className="products-grid">
                    {products.map( product => {
                        return (<div key={product.id} className="product-container">
                                    <div className="product-image-container">
                                        <img className="product-image"
                                        src={product.image} />
                                    </div>

                                    <div className="product-name limit-text-to-2-lines">
                                        {product.name}
                                    </div>

                                    <div className="product-rating-container">
                                        <img className="product-rating-stars"
                                        src={`images/ratings/rating-${product.rating.stars * 10}.png`} />
                                        <div className="product-rating-count link-primary">
                                            {product.rating.count}
                                        </div>
                                    </div>

                                    <div className="product-price">
                                        ${(product.priceCents/100).toFixed(2)}
                                    </div>

                                    <div className="product-quantity-container">
                                        <select>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        </select>
                                    </div>

                                    <div className="product-spacer"></div>

                                    <div className="added-to-cart">
                                        <img src="images/icons/checkmark.png" />
                                        Added
                                    </div>

                                    <button className="add-to-cart-button button-primary">
                                        Add to Cart
                                    </button>
                                </div>);
                    })}

                </div>
            </div>
        </>
    );
}