import {createStore} from "redux";
import reducerApp from "../reducers/reducerApp";

const store = createStore(reducerApp);

export default store;