import React from 'react'
import { render, waitFor, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { App } from '../../components/App/App.js'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import products from '../../__mock__/cart.json'

test('render App with success state', () => {
  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    getCart: {
      products: products,
      isLoading: false,
      isSuccess: true,
      isError: false,
    },
    checkProduct: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      errorType: '',
    },
  })

  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByText('Lista produktów')).toBeInTheDocument()
  expect(getByText('Patelnia')).toBeInTheDocument()
  expect(getByTestId('cart-summary')).toHaveTextContent(
    Math.round(
      products.reduce((total, product) => {
        return total + parseFloat(product.price)
      }, 0) * 100,
    ) / 100,
  )
})

test('update cart summary', async () => {
  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    getCart: {
      products: products,
      isLoading: false,
      isSuccess: true,
      isError: false,
    },
    checkProduct: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      errorType: '',
    },
  })

  const { getByTestId, getAllByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  let cartValue =
    Math.round(
      products.reduce((total, product) => {
        return total + parseFloat(product.price)
      }, 0) * 100,
    ) / 100
  expect(getByTestId('cart-summary')).toHaveTextContent(cartValue)

  fireEvent.click(getAllByTestId('add-button')[0])

  cartValue =
    Math.round((cartValue + parseFloat(products[0].price)) * 100) / 100
  await waitFor(() =>
    expect(getByTestId('cart-summary')).toHaveTextContent(cartValue),
  )
})

test('render App in loading state', () => {
  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    getCart: {
      products: [],
      isLoading: true,
      isSuccess: false,
      isError: false,
    },
    checkProduct: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      errorType: '',
    },
  })

  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByTestId('cart-loader')).toBeInTheDocument()
})

test('render App in error state', () => {
  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    getCart: {
      products: [],
      isLoading: false,
      isSuccess: false,
      isError: true,
    },
    checkProduct: {
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: '',
      errorType: '',
    },
  })

  const { getByTestId } = render(
    <Provider store={store}>
      <App />
    </Provider>,
  )

  expect(getByTestId('cart-error')).toBeInTheDocument()
})
