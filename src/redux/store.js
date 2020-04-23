import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from "./rootReducer";
import {UPDATE_SESSION_ID, LOGOUT} from "./auth/auth.types";
import {cookies} from "../utils/cookies";

const updateCookies = store => next => action => {
  if (action.type === UPDATE_SESSION_ID) {
    cookies.set('session_id', action.payload, {
      path: '/',
      maxAge: 2592000
    });
  }
  if (action.type === LOGOUT) {
    cookies.remove('session_id');
  }
  return next(action)
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, updateCookies))
);

export default store;