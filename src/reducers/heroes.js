//////////////////
// // функция createSlice() заменила этот файл


import { createReducer } from "@reduxjs/toolkit";

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreated,
  heroDeleted
} from '../actions'


const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

// три варианта написания reducer

// 1
// только с JS, с TS работать не будет
const heroes = createReducer(initialState, {
  [heroesFetching]: state => {
    state.heroesLoadingStatus = 'loading'
  },
  [heroesFetched]: (state, action) => {
    state.heroesLoadingStatus = 'idle';
    state.heroes = action.payload;
  },
  [heroesFetchingError]: state => {
    state.heroesLoadingStatus = 'error';
  },
  [heroCreated]: (state, action) => {
    state.heroes.push(action.payload);
  },
  [heroDeleted]: (state, action) => {
    state.heroes = state.heroes.filter(elem => elem.id !== action.payload)
  }
  },
  [],
  state => state
);

// 2
// const heroes = createReducer(initialState, builder => {
//   builder
//     .addCase(heroesFetching, state => {
//       state.heroesLoadingStatus = 'loading';
//     })
//     .addCase(heroesFetched, (state, action) => {
//       state.heroesLoadingStatus = 'idle';
//       state.heroes = action.payload;
//     })
//     .addCase(heroesFetchingError, state => {
//       state.heroesLoadingStatus = 'error';
//     })
//     .addCase(heroCreated, (state, action) => {
//       state.heroes.push(action.payload);
//     })
//     .addCase(heroDeleted, (state, action) => {
//       state.heroes = state.heroes.filter(elem => elem.id !== action.payload)
//     })
//     .addDefaultCase(() => {})
// })

// 3
// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case 'HEROES_FETCHING':
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading'
//       }
//     case 'HEROES_FETCHED':
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle'
//       }
//     case 'HEROES_FETCHING_ERROR':
//       return {
//         ...state,
//         heroesLoadingStatus: 'error'
//       }
//     case 'HERO_DELETED':
//       return {
//         ...state,
//         heroes: state.heroes.filter(elem => elem.id !== action.payload)
//       }
//     case 'HERO_CREATED':
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       }
//     default: return state
//   }
// };

export default heroes;