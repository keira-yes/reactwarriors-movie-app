import CallApi from "../../api/api";

export const fetchAuth = session_id => dispatch => {
  dispatch({
    type: 'FETCH_REQUEST_AUTH'
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
        type: 'FETCH_ERROR_AUTH',
        payload: error
      })
    })
};

export const updateUser = payload => {
  return {
    type: 'UPDATE_USER',
    payload
  }
};

export const updateSessionId = payload => {
  return {
    type: 'UPDATE_SESSION_ID',
    payload
  }
};

export const onLogout = () => {
  return {
    type: 'LOGOUT'
  }
};

export const fetchFavoriteMovies = (user, session_id) => dispatch => {
  CallApi.get(`/account/${user.id}/favorite/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(updateFavoriteMovies(data.results))
  })
};

export const updateFavoriteMovies = payload => {
  return {
    type: 'UPDATE_FAVORITE_MOVIES',
    payload
  }
};

export const fetchWatchListMovies = (user, session_id) => dispatch => {
  CallApi.get(`/account/${user.id}/watchlist/movies`, {
    params: {
      session_id: session_id
    }
  }).then(data => {
    dispatch(updateWatchListMovies(data.results))
  })
};

export const updateWatchListMovies = payload => {
  return {
    type: 'UPDATE_WATCH_LIST_MOVIES',
    payload
  }
};

export const toggleModal = () => {
  return {
    type: 'TOGGLE_MODAL'
  }
};
