import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as getCartActions from '../../redux/actions/getCartActions'
import Product from '../Product/Product'
import { formatter } from '../Formatter/Formatter'
import { FadeLoader } from 'react-spinners'
import './App.css'

const App = () => {
  const getCartState = useSelector(state => state.getCart)
  const dispatch = useDispatch()
  const [productsInCart, setProductsInCart] = useState([])
  const [summary, setSummary] = useState(0)

  const handleSummaryChange = useCallback(
    (pid, price) => {
      const filteredProduct = productsInCart.find(
        product => product.pid === pid,
      )
      const newProduct = { ...filteredProduct, price: price }
      const filteredList = productsInCart.filter(product => product.pid !== pid)
      setProductsInCart([...filteredList, newProduct])
    },
    [productsInCart],
  )

  useEffect(() => {
    dispatch(getCartActions.getCart())
  }, [])

  useEffect(() => {
    if (getCartState.isSuccess) {
      setProductsInCart(getCartState.products)
    } else {
      setSummary(0)
    }
  }, [getCartState])

  useEffect(() => {
    setSummary(
      formatter.format(
        productsInCart.reduce((total, product) => {
          return total + parseFloat(product.price)
        }, 0),
      ),
    )
  }, [productsInCart])

  const mapProducts = (product, index) => {
    return (
      <li className="product">
        <Product
          handleSummaryChange={handleSummaryChange}
          product={product}
          key={index}
        />
      </li>
    )
  }

  if (getCartState.isError) {
    return (
      <div className="container">
        <div className="cart__error">Ups coś poszło nie tak</div>
      </div>
    )
  } else if (getCartState.isSuccess) {
    return (
      <div className="container">
        <h3>Lista produktów</h3>
        <ul>{getCartState.products.map(mapProducts)}</ul>
        <div>
          <h3>Suma produktów: {summary}</h3>
        </div>
      </div>
    )
  } else {
    return (
      <div className="container">
        <div className="cart__loader">
          <FadeLoader color={'#000000'} loading={true} size={150} />
        </div>
      </div>
    )
  }
}

export { App }
