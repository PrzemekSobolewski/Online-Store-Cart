import React, { useState } from 'react';
import ProductQuantity from "../../components/ProductQuantity/ProductQuantity";

const Product = (props) => {
    const [quantity, setQuantity] = useState(props.product.min);

    const formatter = new Intl.NumberFormat('pl', {
        style: 'currency',
        currency: 'PLN',
    });

    return (
        <li className="product" >
        <div className="product__content">
          <div className="product__name">{props.product.name}</div>
          <div className="product__price">{formatter.format(quantity * props.product.price)}</div>
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} pid={props.product.pid} min={props.product.min} max={props.product.max} isBlocked={props.product.isBlocked} />
        </div>
      </li>
    )
}

export default Product;