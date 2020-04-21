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