import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore} from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

// function logger(obj, next, action)
// logger(obj)(next)(action)
// const logger = function ({dispatch, getState}){
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log("APPLY_TYPE = ", action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch, getState}) => next => action =>{
  // middleware code
  if(typeof action !== 'function'){
    console.log("APPLY_TYPE = ", action.type);
  }
  next(action);
}

// const thunk = ({dispatch, getState}) => next => action =>{
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("store", store);
// console.log("State", store.getState());

// store.dispatch({
//   type: 'ADD_MOVIES',
//   movies: [{ name: 'Super Man'}]
// });
// console.log("State", store.getState());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);
