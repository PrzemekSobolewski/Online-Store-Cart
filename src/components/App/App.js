import React from 'react';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from 'redux-thunk';  
import './App.css';

const App = () => {

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        <li className="row">Patelnia, cena: 89,99zł</li>
      </ul>
    </div>
  );
};

export {
    App
};
