import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as getCartActions from "../../redux/actions/getCartActions";
import Product from "../../components/Product/Product";
import './App.css';

const App = () => {
  const getCartState = useSelector(state => state.getCart);
  const dispatch = useDispatch();
  const [productsInCart, setProductsInCart] = useState([]);
  const [summary, setSummary] = useState(0);

  const handleSummaryChange = (pid, price) => {
    const filteredProduct = getCartState.products.find(product => product.pid === pid)
    const newProduct = {...filteredProduct, price: price}
    const filteredList = getCartState.products.filter(product => product.pid !== pid);
    setProductsInCart([...filteredList, newProduct]);
  }

  useEffect(() => {
    dispatch(getCartActions.getCart());
  }, []);

  useEffect(() => {
    setProductsInCart(getCartState.products);
  }, [getCartState]);

  useEffect(() => {
    countCartSummary();
  }, [productsInCart]);

  const formatter = new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: 'PLN',
  });

  const mapProducts = (product, index) => {
    return (
      <Product handleSummaryChange={handleSummaryChange} product={product} key={index}/>
    );
  }
  
  const countCartSummary = () => {
    if(getCartState.isSuccess) {
      setSummary(formatter.format(productsInCart.reduce((total, product) => { return total + parseFloat(product.price)}, 0)));
    }else {
      setSummary(0);
    }
  }

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {getCartState.products.map(mapProducts)}
      </ul>
      <div>
      <h3>Suma produktów: {summary}</h3>
      </div>
    </div>
  );
};

export {
  App
};
