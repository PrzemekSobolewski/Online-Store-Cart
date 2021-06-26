import { GET_CART_REQUEST, GET_CART_SUCCESS, GET_CART_FAILURE } from "../actions/getCartActions";

const initialState = {
    products: [],
    isLoading: false,
    isSuccess: false,
    isError: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_REQUEST:
            return {
                ...state,
                products: [],
                isLoading: true,
                isSuccess: false,
                isError: false
            };
        case GET_CART_SUCCESS:
            return {
                ...state,
                products: action.products,
                isLoading: false,
                isSuccess: true,
                isError: false
            }
        case GET_CART_FAILURE:
            return {
                ...state,
                products: [],
                isLoading: false,
                isSuccess: false,
                isFailure: true
            }
        default:
            return state;
    }
}

