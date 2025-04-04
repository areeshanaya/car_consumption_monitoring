// src/redux/actions.js

export const ADD_REFUEL_EVENT = 'ADD_REFUEL_EVENT';
export const REMOVE_REFUEL_EVENT = 'REMOVE_REFUEL_EVENT';
export const ADD_CAR = 'ADD_CAR';
export const REMOVE_CAR = 'REMOVE_CAR';

// Helper function to save to localStorage
const saveToLocalStorage = (carsData) => {
  localStorage.setItem('carsData', JSON.stringify(carsData));
};

// Action to add a new car
export const addCar = (carId) => {
  return (dispatch, getState) => {
    const carsData = getState().carsData;
    // Add new car with an empty array of refuel events
    const updatedCarsData = { ...carsData, [carId]: [] };
    saveToLocalStorage(updatedCarsData);

    dispatch({
      type: ADD_CAR,
      payload: updatedCarsData,
    });
  };
};

// Action to add a refuel event to a specific car
export const addRefuelEvent = (carId, event) => {
  return (dispatch, getState) => {
    const carsData = getState().carsData;

    const updatedCarsData = {
      ...carsData,
      [carId]: [...(carsData[carId] || []), event],
    };

    saveToLocalStorage(updatedCarsData);

    dispatch({
      type: ADD_REFUEL_EVENT,
      payload: updatedCarsData,
    });
  };
};

// Action to remove a refuel event from a specific car
export const removeRefuelEvent = (carId, index) => {
  return (dispatch, getState) => {
    const carsData = getState().carsData;

    const updatedCarsData = {
      ...carsData,
      [carId]: carsData[carId].filter((_, i) => i !== index),
    };

    saveToLocalStorage(updatedCarsData);

    dispatch({
      type: REMOVE_REFUEL_EVENT,
      payload: updatedCarsData,
    });
  };
};

// Action to remove a car (and its refuel events)
export const removeCar = (carId) => {
  return (dispatch, getState) => {
    const carsData = getState().carsData;

    const { [carId]: removed, ...updatedCarsData } = carsData;

    saveToLocalStorage(updatedCarsData);

    dispatch({
      type: REMOVE_CAR,
      payload: updatedCarsData,
    });
  };
};
