import CallApi from "../../api/api";
import * as types from './auth.types';

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: types.FETCH_REQUEST_AUTH
  });
  CallApi.get("/account", {
    params: {
      session_id: session_id
    }
  })
    .then(user => {
      dispatch(updateUser(user))
    })
    .catch(error => {
      dispatch({
        type: types.FETCH_ERROR_AUTH,
        payload: error
      })
    })
};

export const updateUser = payload => {
  return {
    type: types.UPDATE_USER,
    payload
  }
};

export const updateSessionId = payload => {
  return {
    type: types.UPDATE_SESSION_ID,
    payload
  }
};

export const onLogout = () => {
  return {
    type: types.LOGOUT
  }
};

export const fetchFavoriteMovies = (user, session_id) => dispatch => {
  return CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(updateFavoriteMovies(data.results))
  })
};

export const updateFavoriteMovies = payload => {
  return {
    type: types.UPDATE_FAVORITE_MOVIES,
    payload
  }
};

export const fetchWatchListMovies = (user, session_id) => dispatch => {
  return CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(updateWatchListMovies(data.results))
  })
};

export const updateWatchListMovies = payload => {
  return {
    type: types.UPDATE_WATCH_LIST_MOVIES,
    payload
  }
};

export const toggleModal = () => {
  return {
    type: types.TOGGLE_MODAL
  }
};
