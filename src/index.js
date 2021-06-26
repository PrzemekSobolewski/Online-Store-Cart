import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import getCartReducer from "./redux/reducers/getCartReducer";
import checkProductReducer from "./redux/reducers/checkProductReducer";

import { App } from './components/App/App';

const rootReducer = combineReducers({
    getCart: getCartReducer,
    checkProduct: checkProductReducer,
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
