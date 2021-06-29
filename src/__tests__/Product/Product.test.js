import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react'
import { getQueriesForElement } from '@testing-library/dom';
import "@testing-library/jest-dom/extend-expect";
import Product from '../../components/Product/Product.js';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

test("calling render with Product component on the same container", () => {

    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
        checkProduct: {
            isLoading: false,
            isError: false,
            isSuccess: true,
            message: '',
            errorType: ''
        }
    });

    let product =
    {
        pid: "8e5e1248-c799-4937-9acc-2b3ab0e034ff",
        name: "Patelnia",
        price: "89.99",
        max: 10,
        min: 1
    };

    const { rerender } = render(<Provider store={store}><Product product={product} /></Provider>)
    expect(screen.querySelector('.product__name').innerText).toBe('Patelnia');

    product =
    {
        pid: "51630312-2166-4cae-9590-ad77fd9f4a55",
        name: "Ręcznik kuchenny",
        price: "5.00",
        max: 20,
        min: 1
    };

    rerender(<Provider store={store}><Product product={product} /></Provider>);
    expect(screen.querySelector('.product__name').innerText).toBe('Ręcznik kuchenny');

});
