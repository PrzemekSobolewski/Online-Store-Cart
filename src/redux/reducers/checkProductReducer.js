import {
  CHECK_PRODUCT_REQUEST,
  CHECK_PRODUCT_SUCCESS,
  CHECK_PRODUCT_FAILURE,
} from '../actions/checkProductActions'

const initialState = {
  pid: '',
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  errorType: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_PRODUCT_REQUEST:
      return {
        ...state,
        pid: action.pid,
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: '',
        errorType: '',
      }
    case CHECK_PRODUCT_SUCCESS:
      return {
        ...state,
        pid: action.pid,
        isLoading: false,
        isError: action.isError,
        isSuccess: action.isSuccess,
        message: action.message,
        errorType: action.errorType,
      }
    case CHECK_PRODUCT_FAILURE:
      return {
        ...state,
        pid: action.pid,
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.message,
        errorType: '',
      }
    default:
      return state
  }
}
