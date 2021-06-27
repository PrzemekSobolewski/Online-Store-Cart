import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as getCartActions from "../../redux/actions/getCartActions";
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";
import './App.css';

const App = () => {
  const getCartState = useSelector(state => state.getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartActions.getCart());
  }, [])

  const formatter = new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: 'PLN',
  });

  const mapProducts = (product, index) => {
    return (
      <li className="product" key={index}>
        <div className="product__content">
          <div className="product__name">{product.name}</div>
          <div className="product__price">{formatter.format(product.price)}</div>
          <ProductQuantity pid={product.pid} min={product.min} max={product.max} isBlocked={product.isBlocked} />
        </div>
      </li>
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
