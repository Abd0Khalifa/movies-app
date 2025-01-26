import { applyMiddleware, createStore } from "redux";
import favReducer from "./Reducers";
import { thunk } from "redux-thunk";


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(favReducer,applyMiddleware(thunk));
// const store = createStore(favReducer, composeEnhancers());

export default store;
