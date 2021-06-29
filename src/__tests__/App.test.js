import React from 'react';
import ReactDOM from 'react-dom';
import { getQueriesForElement } from '@testing-library/dom';
import "@testing-library/jest-dom/extend-expect";
import { App } from '../components/App/App.js';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';

const formatter = new Intl.NumberFormat('pl', {
    style: 'currency',
    currency: 'PLN',
});

const products = [
    {
        pid: "8e5e1248-c799-4937-9acc-2b3ab0e034ff",
        name: "Patelnia",
        price: "89.99",
        max: 10,
        min: 1
    },
    {
        pid: "51630312-2166-4cae-9590-ad77fd9f4a55",
        name: "Ręcznik kuchenny",
        price: "5.00",
        max: 20,
        min: 1
    },
    {
        pid: "14cc426d-8db0-46c4-b579-3f61ff3568ca",
        name: "React (ebook)",
        price: "34.99",
        max: 1,
        min: 1,
        isBlocked: true
    },
    {
        pid: "8a6a63f0-0605-4340-a7f5-aff3a592eb5a",
        name: "Kuchnia tradycyjna (ebook)",
        price: "24.99",
        max: 1,
        min: 1,
        isBlocked: true
    }
];
test("render App with success state", () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
        getCart: {
            products: products,
            isLoading: false,
            isSuccess: true,
            isError: false
        },
        checkProduct: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            message: '',
            errorType: ''
        }
    })
    const root = document.createElement('div');
    ReactDOM.render( 
    <Provider store={store}>  
        <App />
    </Provider>, root);

    const { getByText } = getQueriesForElement(root);

    expect(getByText('Lista produktów')).not.toBeNull();
    const sum = products.reduce((sum, product) => sum + product.price, 0);
    expect(getByText(formatter.format(sum))).not.toBeNull();
});

test("render App in loading state", () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
        getCart: {
            products: [],
            isLoading: true,
            isSuccess: false,
            isError: false
        },
        checkProduct: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            message: '',
            errorType: ''
        }
    })
    const root = document.createElement('div');
    ReactDOM.render( 
    <Provider store={store}>  
        <App />
    </Provider>, root);

    expect(root.querySelectorAll('.cart__loader')).toHaveLength(1);
});

test("render App in error state", () => {
    const mockStore = configureMockStore([thunk]);
    const store = mockStore({
        getCart: {
            products: [],
            isLoading: false,
            isSuccess: false,
            isError: true
        },
        checkProduct: {
            isLoading: false,
            isError: false,
            isSuccess: false,
            message: '',
            errorType: ''
        }
    })
    const root = document.createElement('div');
    ReactDOM.render( 
    <Provider store={store}>  
        <App />
    </Provider>, root);

    expect(root.querySelectorAll('.cart__error')).toHaveLength(1);
});





