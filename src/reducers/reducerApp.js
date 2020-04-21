import Cookies from 'universal-cookie';

const cookies = new Cookies();

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

export default reducerApp;