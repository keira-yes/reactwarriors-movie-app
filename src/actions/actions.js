export const updateUser = (payload) => {
  return {
    type: 'UPDATE_USER',
    payload
  }
};

export const updateSessionId = (payload) => {
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