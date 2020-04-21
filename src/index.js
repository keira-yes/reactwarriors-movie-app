import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
import {createStore} from "redux";
import "./stylesheets/index.css";
import App from "./components/App";

const cookies = new Cookies();

export const actionCreatorUpdateUser = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload
  }
};

export const actionCreatorUpdateSessionId = (payload) => {
  return {
    type: 'UPDATE_SESSION_ID',
    payload
  }
};

export const actionCreatorLogout = () => {
  return {
    type: 'LOGOUT'
  }
};

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, user: action.payload};
    case 'UPDATE_SESSION_ID':
      cookies.set('session_id', action.payload, {
        path: '/',
        maxAge: 2592000
      });
      return {
        ...state,
        session_id: action.payload
      };
    case 'LOGOUT':
      cookies.remove('session_id');
      return {
        ...state,
        user: null,
        session_id: null
      };
    default:
      return state
  }
};

const store = createStore(reducerApp);

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
