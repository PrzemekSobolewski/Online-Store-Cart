import React, { useState, useEffect } from 'react'
import ProductQuantity from '../ProductQuantity/ProductQuantity'
import { priceFormatter } from '../Formatter/Formatter'
import PropTypes from 'prop-types'
import './Product.css'

const Product = props => {
  const [quantity, setQuantity] = useState(props.product.min)
  const [price, setPrice] = useState(props.product.price)

  useEffect(() => {
    setPrice(props.product.price * quantity)
  }, [quantity])

  useEffect(() => {
    props.handleSummaryChange(props.product.pid, price)
  }, [price])

  return (
    <div className="product__content">
      <div className="product__name">{props.product.name}</div>
      <div className="product__price" data-testid="product-price">{priceFormatter.format(price)}</div>
      <ProductQuantity
        quantity={quantity}
        setQuantity={setQuantity}
        pid={props.product.pid}
        min={props.product.min}
        max={props.product.max}
        isBlocked={props.product.isBlocked}
      />
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
  handleSummaryChange: PropTypes.func.isRequired,
}

export default Product
