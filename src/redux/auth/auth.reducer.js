import * as types from './auth.types';
import {cookies} from '../../utils/cookies'

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
      return {...state, session_id: action.payload};
    case types.LOGOUT:
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
    case types.TOGGLE_MODAL:
      return {...state, showLoginModal: !state.showLoginModal};
    default:
      return state
  }
};

export default authReducer;