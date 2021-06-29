import axios from "axios/index";

export const CHECK_PRODUCT_REQUEST = 'CHECK_PRODUCT_REQUEST';
export const CHECK_PRODUCT_SUCCESS = 'CHECK_PRODUCT_SUCCESS';
export const CHECK_PRODUCT_FAILURE = 'CHECK_PRODUCT_FAILURE';

export const checkProductRequest = (pid) => ({
    type: CHECK_PRODUCT_REQUEST,
    pid: pid,
});

export const checkProductSuccess = (response, pid) => ({
    type: CHECK_PRODUCT_SUCCESS,
    pid: pid,
    isError: response.isError,
    isSuccess: response.success,
    message: response.message,
    errorType: response.errorType
});

export const checkProductFailure = (error, pid) => ({
    type: CHECK_PRODUCT_FAILURE,
    pid: pid,
    message: error,
});

export const checkProduct = (pid, quantity) => async dispatch => {
    dispatch(checkProductRequest(pid));
    
    await axios.post('/api/product/check', {
        pid: pid,
        quantity: quantity
    })
    .then(response => {
        console.log(response.data);
        dispatch(checkProductSuccess(response.data, pid));
    })
    .catch(error => {
        dispatch(checkProductFailure(error, pid));

    });
}

