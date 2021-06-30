import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as checkProductActions from '../../redux/actions/checkProductActions'
import { FaPlus, FaMinus } from 'react-icons/fa'
import debounce from 'lodash/debounce'
import { PulseLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import './ProductQuantity.css'

const ProductQuantity = props => {
  const addButton = useRef(null)
  const substractButton = useRef(null)
  const checkProductState = useSelector(state => state.checkProduct)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkProductActions.checkProduct(props.pid, props.quantity))
    if (props.isBlocked) {
      addButton.current.classList.add('inactive')
      substractButton.current.classList.add('inactive')
    } else if (props.min == props.quantity) {
      substractButton.current.classList.add('inactive')
    } else if (props.min < props.quantity) {
      substractButton.current.classList.remove('inactive')
    }

    if (props.max == props.quantity) {
      addButton.current.classList.add('inactive')
    } else if (props.max > props.quantity) {
      addButton.current.classList.remove('inactive')
    }
  }, [props.quantity])

  useEffect(() => {
    if (checkProductState.isError && checkProductState.pid == props.pid) {
      props.setQuantity(1)
    }
  }, [checkProductState])

  const updateQuantity = debounce(value => {
    props.setQuantity(value)
  }, 500)

  const substractProduct = () => {
    if (props.min < props.quantity && !checkProductState.isLoading) {
      updateQuantity(props.quantity - 1)
    }
  }

  const addProduct = () => {
    if (props.max > props.quantity && !checkProductState.isLoading) {
      updateQuantity(props.quantity + 1)
    }
  }

  return (
    <div className="product__quantity">
      <span>
        Obecnie masz{' '}
        <span className="product__quantity--number" data-testid="product-quantity">{props.quantity}</span>{' '}
        sztuk produktu
      </span>
      <div className="product__quantity--buttons">
        <span
          className="product__quantity--minus"
          ref={substractButton}
          onClick={substractProduct}
          data-testid="substract-button"
        >
          <FaMinus />
        </span>
        <span
          className="product__quantity--plus"
          ref={addButton}
          onClick={addProduct}
          data-testid="add-button"
        >
          <FaPlus />
        </span>
        {checkProductState.isLoading && checkProductState.pid == props.pid ? (
          <PulseLoader color={'#000000'} loading={true} size={9} />
        ) : null}
      </div>
    </div>
  )
}

ProductQuantity.propTypes = {
  pid: PropTypes.string.isRequired,
  max: PropTypes.number,
  min: PropTypes.number,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
  isBlocked: PropTypes.bool,
}
export default ProductQuantity
