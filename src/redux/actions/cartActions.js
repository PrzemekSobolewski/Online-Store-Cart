import axios from "axios/index";

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';

export const CHECK_PRODUCT_REQUEST = 'CHECK_PRODUCTS_REQUEST';
export const CHECK_PRODUCT_SUCCESS = 'CHECK_PRODUCTS_SUCCESS';
export const CHECK_PRODUCT_FAILURE = 'CHECK_PRODUCT_FAILURE';

export const getProductsRequest = () => ({
    type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (response) => ({
   type: GET_PRODUCTS_SUCCESS,
   response: response,
});

export const getProductsFailure = () => ({
    type: GET_PRODUCTS_FAILURE,
})


export const checkProductRequest = () => ({
    type: CHECK_PRODUCT_REQUEST,
});

export const checkProductSuccess = (response) => ({
    type: CHECK_PRODUCT_SUCCESS,
    response: response,
});

export const checkProductFailure = () => ({
    type: CHECK_PRODUCT_FAILURE,
});


export const getProducts = () => async dispatch => {
    dispatch(getProductsRequest());
    
    await axios.get('/api/cart')
    .then(response => response.json())
    .then(json => {
        console.log(json);
        dispatch(getProductsSuccess(json))
    })
    .catch(err => console.log(err));
}

export const checkProduct = (pid, quantity) => async dispatch => {
    dispatch(checkProductsRequest());
    
    await axios.post('/api/product/check', {
        pid: pid,
        quantity: quantity
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        dispatch(checkProductsSuccess(json))
    })
    .catch(err => console.log(err));
}

