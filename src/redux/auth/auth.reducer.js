import Cookies from 'universal-cookie';
import * as types from './auth.types';

const cookies = new Cookies();

const initialState = {
  user: null,
  session_id: cookies.get("session_id") || null,
  favoriteList: [],
  watchList: [],
  showLoginModal: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_USER:
      return {...state, user: action.payload};
    case types.UPDATE_SESSION_ID:
      cookies.set('session_id', action.payload, {
        path: '/',
        maxAge: 2592000
      });
      return {...state, session_id: action.payload};
    case types.LOGOUT:
      cookies.remove('session_id');
      return {
        ...state,
        user: null,
        session_id: null,
        favoriteList: [],
        watchList: []
      };
    case types.UPDATE_FAVORITE_MOVIES:
      return {...state, favoriteList: action.payload};
    case types.UPDATE_WATCH_LIST_MOVIES:
      return {...state, watchList: action.payload};
    default:
      return state
  }
};

export default authReducer;