import axios from 'axios';
import { useEffect, useState} from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({cart}){
    const [products, setProducts] = useState([]);  //useState has two props the first is a varial and the second is a function to update the variable
    
    useEffect(()=>{
        const getHomeData = async () => {
            const response = await axios.get('http://localhost:3000/api/products'); // we place this code inside useEffect to make it run once, useEffect controls how many time a code inside it would run
            setProducts(response.data);    //set products once response has data 
        };
        getHomeData();        
    },[]);  //[] this array controls the run frequenccy, empty means run once
    

    return (
        <>
            <title>Ecommers Project</title>

            <Header cart = {cart}/>

            <div className="home-page">
                <ProductsGrid products={products}/>
            </div>
        </>
    );
}