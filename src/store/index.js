import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'

import ReduxThunk from 'redux-thunk';

import heroes from '../components/heroesList/heroesSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleware = (store) => (dispatch) => (action) => {
  if (typeof action === 'string') {
    return dispatch({
      type: action
    });
  }
  return dispatch(action);
};

// const enhancer = (createStore) => (...arg) => {
//   const store = createStore(...arg);

//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return oldDispatch({
//         type: action
//       });
//     }
//     return oldDispatch(action);
//   }
//   return store;
// }

// const store = createStore(
//     combineReducers({heroes, filters}),
//     compose(
//       applyMiddleware(ReduxThunk, stringMiddleware),
//       window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     )

//     // compose(
//     //   enhancer,
//     //   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     // )
// );

const store = configureStore({
  reducer: {heroes, filters},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;