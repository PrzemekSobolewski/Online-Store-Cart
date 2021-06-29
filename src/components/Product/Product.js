import React, { useState, useEffect } from "react";
import ProductQuantity from "../ProductQuantity/ProductQuantity";
import { formatter } from "../Formatter/Formatter";
import "./Product.css";

const Product = (props) => {
    const [quantity, setQuantity] = useState(props.product.min);
    const [price, setPrice] = useState(props.product.price);

    useEffect(() => {
        setPrice(props.product.price * quantity)
    }, [quantity]);

    useEffect(() => {
        props.handleSummaryChange(props.product.pid, price);
    }, [price]);

    return (
        <li className="product" >
        <div className="product__content">
          <div className="product__name">{props.product.name}</div>
          <div className="product__price">{formatter.format(price)}</div>
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} pid={props.product.pid} min={props.product.min} max={props.product.max} isBlocked={props.product.isBlocked} />
        </div>
      </li>
    )
}

export default Product;