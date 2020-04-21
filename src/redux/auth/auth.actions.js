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

export const updateFavoriteMovies = payload => {
  return {
    type: 'UPDATE_FAVORITE_MOVIES',
    payload
  }
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
