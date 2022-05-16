import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore} from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { createContext } from 'react';

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
    console.log("ACTION_TYPE = ", action.type);
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

// export const StoreContext = createContext();
// console.log("StoreContext", StoreContext);
// class Provider extends React.Component {
//   render(){
//     const { store} = this.props;
//     return (
//       <StoreContext.Provider value={store}>
//         { this.props.children }
//       </StoreContext.Provider>
//     )
//   }
// }

// export function connect(callback){
//   return function (Component){
//     class ConnectedComponenet extends React.Component{
//       constructor(props){
//         super(props);
//         this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
//       }
//       componentWillUnmount(){
//         this.unsubscribe();
//       }
//       render(){
//         const { store } = this.props;
//         const dataToBePassed = callback(store.getState());
//         return(
//           <Component {...dataToBePassed} dispatch={store.dispatch} />
//         )
//       }
//     }

//     class ConnectedComponenetWrapper extends React.Component{
//       render(){
//         return(
//           <StoreContext.Consumer>
//             {
//               (store) => <ConnectedComponenet store={store} />
//             }
//           </StoreContext.Consumer>
//         )
//       }
//     }
//     return ConnectedComponenetWrapper;
//   }
// }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App  />
  </Provider>
);
