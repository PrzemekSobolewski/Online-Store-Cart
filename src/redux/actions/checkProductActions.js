import axios from "axios/index";

export const CHECK_PRODUCT_REQUEST = 'CHECK_PRODUCT_REQUEST';
export const CHECK_PRODUCT_SUCCESS = 'CHECK_PRODUCT_SUCCESS';
export const CHECK_PRODUCT_FAILURE = 'CHECK_PRODUCT_FAILURE';

export const checkProductRequest = () => ({
    type: CHECK_PRODUCT_REQUEST,
});

export const checkProductSuccess = (response) => ({
    type: CHECK_PRODUCT_SUCCESS,
    isError: response.isError,
    isSuccess: response.success,
    message: response.message,
    errorType: response.errorType
});

export const checkProductFailure = (error) => ({
    type: CHECK_PRODUCT_FAILURE,
    message: error,
});

export const checkProduct = (pid, quantity) => async dispatch => {
    dispatch(checkProductsRequest());
    
    await axios.post('/api/product/check', {
        pid: pid,
        quantity: quantity
    })
    .then(response => response.json())
    .then(json => {
        console.log(json);
        dispatch(checkProductSuccess(json));
    })
    .catch(err => {
        console.log(err);
        dispatch(checkProductFailure(error));

    });
}
