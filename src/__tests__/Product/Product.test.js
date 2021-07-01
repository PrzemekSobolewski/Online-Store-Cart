import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Product from '../../components/Product/Product.js'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import products from '../../__mock__/cart.json'

const mockHandleSummaryChange = jest.fn()

const mockStore = configureMockStore([thunk])
const store = mockStore({
  checkProduct: {
    isLoading: false,
    isError: false,
    isSuccess: true,
    message: '',
    errorType: '',
  },
})

test('test Product component buttons', async () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <Product
        product={products[0]}
        handleSummaryChange={mockHandleSummaryChange}
      />
    </Provider>,
  )

  expect(getByText('Patelnia')).toBeInTheDocument()
  expect(getByTestId('product-quantity')).toHaveTextContent('1')
  expect(getByTestId('product-price')).toHaveTextContent(products[0].price)
  expect(getByTestId('substract-button')).toHaveClass('inactive')

  fireEvent.click(getByTestId('add-button'))
  expect(mockHandleSummaryChange).toHaveBeenCalled()
  await waitFor(() =>
    expect(getByTestId('substract-button')).not.toHaveClass('inactive'),
  )
  expect(getByTestId('product-quantity')).toHaveTextContent('2')
  expect(getByTestId('product-price')).toHaveTextContent(products[0].price * 2)

  fireEvent.click(getByTestId('substract-button'))
  expect(mockHandleSummaryChange).toHaveBeenCalled()
  await waitFor(() =>
    expect(getByTestId('substract-button')).toHaveClass('inactive'),
  )
  expect(getByTestId('product-quantity')).toHaveTextContent('1')
  expect(getByTestId('product-price')).toHaveTextContent(products[0].price)
})

test('calling render on Product with diffrent product', async () => {
  const { rerender, getByText } = render(
    <Provider store={store}>
      <Product
        product={products[0]}
        handleSummaryChange={mockHandleSummaryChange}
      />
    </Provider>,
  )
  expect(getByText('Patelnia')).toBeInTheDocument()
  rerender(
    <Provider store={store}>
      <Product
        product={products[1]}
        handleSummaryChange={mockHandleSummaryChange}
      />
    </Provider>,
  )
  expect(getByText('Garnek mały')).toBeInTheDocument()
})
