import axios from "axios/index";

export const GET_CART_REQUEST = 'GET_CART_REQUEST';
export const GET_CART_SUCCESS = 'GET_CART_SUCCESS';
export const GET_CART_FAILURE = 'GET_CART_FAILURE';

export const getCartRequest = () => ({
    type: GET_CART_REQUEST,
});

export const getCartSuccess = (response) => ({
    type: GET_CART_SUCCESS,
    products: response,
});

export const getCartFailure = () => ({
    type: GET_CART_FAILURE,
})

export const getCart = () => async dispatch => {
    dispatch(getCartRequest());
    
    await axios.get('/api/cart')
    .then(response => {
        dispatch(getCartSuccess(response.data));
    })
    .catch(err => {
        dispatch(getCartFailure());
    });
}

