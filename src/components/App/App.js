import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as getCartActions from "../../redux/actions/getCartActions";
import Product from "../../components/Product/Product";
import './App.css';

const App = () => {
  const getCartState = useSelector(state => state.getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartActions.getCart());
  }, []);

  const formatter = new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: 'PLN',
  });


  const mapProducts = (product, index) => {
    return (
      <Product product={product} key={index}/>
    );
  }
  
  const getCartSummary = (products) => {
    if(getCartState.isSuccess) {
      const sum = products.reduce((total, product) => { return total + parseFloat(product.price)}, 0);
      return formatter.format(sum);
    }
  }

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {getCartState.products.map(mapProducts)}
      </ul>
      <div>
      <h3>Suma produktów: {getCartSummary(getCartState.products)}</h3>
      </div>
    </div>
  );
};

export {
  App
};
