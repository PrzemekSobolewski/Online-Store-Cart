import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as getCartActions from "../../redux/actions/getCartActions";
import './App.css';

const App = () => {
  const getCartState = useSelector(state => state.getCart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartActions.getCart());
  }, [])

  const mapProducts = (product, index) => {
    return (
      <li key={index}>{product.name}, cena: {product.price}zł</li>
    );
  }

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {getCartState.products.map(mapProducts)}
      </ul>
    </div>
  );
};

export {
  App
};
