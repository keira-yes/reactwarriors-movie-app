import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import {createStore} from "redux";

export const actionCreatorUpdateUser = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload
  }
};

const initialState = {
  user: null
};

const reducerApp = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_USER':
      return {...state, user: action.payload};
    default:
      return state
  }
};

const store = createStore(reducerApp);

ReactDOM.render(<App store={store}/>, document.getElementById("root"));
