// src/redux/reducer.js
import { ADD_REFUEL_EVENT, REMOVE_REFUEL_EVENT, ADD_CAR, REMOVE_CAR } from './actions';

// Initial state: Load cars data from localStorage
const initialState = {
  carsData: JSON.parse(localStorage.getItem('carsData')) || {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REFUEL_EVENT:
      return {
        ...state,
        carsData: action.payload,
      };
    case REMOVE_REFUEL_EVENT:
      return {
        ...state,
        carsData: action.payload,
      };
    case ADD_CAR:
      return {
        ...state,
        carsData: action.payload,
      };
    case REMOVE_CAR:
      return {
        ...state,
        carsData: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
