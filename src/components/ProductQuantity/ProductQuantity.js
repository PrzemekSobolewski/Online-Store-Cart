import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import * as checkProductActions from "../../redux/actions/checkProductActions";

import { FaPlus, FaMinus } from 'react-icons/fa';
import _ from "lodash";

import './ProductQuantity.css';
const ProductQuantity = (props) => {
    const addButton = useRef(null);
    const substractButton = useRef(null);
    const checkProductState = useSelector(state => state.checkProduct);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkProductActions.checkProduct(props.pid, props.quantity));
        if (props.isBlocked) {
            addButton.current.classList.add('inactive');
            substractButton.current.classList.add('inactive');
        } else if (props.min == props.quantity) {
            substractButton.current.classList.add('inactive');
        } else if(props.min < props.quantity) {
            substractButton.current.classList.remove('inactive');
        }

        if(props.max == props.quantity) {
            addButton.current.classList.add('inactive');
        }else if(props.max > props.quantity) {
            addButton.current.classList.remove('inactive');
        }
    }, [props.quantity]);

    useEffect(() => {
        if(checkProductState.isError) {
            props.setQuantity(1)
        }
    }, [checkProductState])

    const updateQuantity = _.debounce((value) => {
        props.setQuantity(value);
    }, 500);

    const substractProduct = () => {
        if (props.min < props.quantity) {
            updateQuantity(props.quantity - 1);
        }
    }

    const addProduct = () => {
        if (props.max > props.quantity) {
            updateQuantity(props.quantity + 1);
        }
    }

    return (
        <div className="product__quantity">
            <span>Obecnie masz <span className="product__quantity--number">{props.quantity}</span> sztuk produktu</span>
            <div className="product__quantity--buttons">
                <span className="product__quantity--minus" ref={substractButton} onClick={substractProduct}><FaMinus /></span>
                <span className="product__quantity--plus" ref={addButton} onClick={addProduct}><FaPlus /></span>
            </div>

        </div>
    )
}

export default ProductQuantity;