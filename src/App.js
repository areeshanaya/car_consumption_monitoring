// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RefuelForm from './components/RefuelForm';
import ConsumptionChart from './components/ConsumptionChart';
import LoginForm from './components/LoginForm';
import { addRefuelEvent, removeRefuelEvent, addCar, removeCar } from './redux/actions';

const App = () => {
  const carsData = useSelector((state) => state.carsData);
  const dispatch = useDispatch();

  const [selectedCarId, setSelectedCarId] = useState(Object.keys(carsData)[0] || '');
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  // Handle submission of new refueling data for the selected car
  const handleNewRefuelEvent = (newEvent) => {
    dispatch(addRefuelEvent(selectedCarId, newEvent));
  };

  // Handle removing a refuel event for the selected car
  const handleRemoveRefuelEvent = (index) => {
    dispatch(removeRefuelEvent(selectedCarId, index));
  };

  // Get the refuel events for the selected car
  const refuelEvents = carsData[selectedCarId] || [];

  // Calculate total kilometers, total cost, and average consumption
  const totalKilometers = refuelEvents.reduce((total, event) => total + parseFloat(event.carKilometers), 0);
  const totalCost = refuelEvents.reduce((total, event) => total + (parseFloat(event.refueledLiters) * parseFloat(event.pricePerLiter)), 0);
  const averageConsumption = refuelEvents.reduce(
    (total, event) => total + (parseFloat(event.refueledLiters) / parseFloat(event.carKilometers) * 100),
    0
  ) / refuelEvents.length;

  // Handle selecting a car
  const selectCar = (carId) => {
    setSelectedCarId(carId);
  };

  // Add a new car
  const addNewCar = (carId) => {
    dispatch(addCar(carId));
    setSelectedCarId(carId); // Automatically select the new car
  };

  return (
    <Router>
      <div className="App">
        <h1>Car Fuel Consumption Monitoring</h1>

        {!isAuthenticated ? (
          // Show login form if not authenticated
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            {/* Navigation links */}
            <nav>
              <ul>
                <li>
                  <Link to="/">Add Refuel Event</Link>
                </li>
                <li>
                  <Link to="/summary">View Refuel Events</Link>
                </li>
                <li>
                  <Link to="/chart">View Consumption Chart</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </nav>

            <Routes>
              {/* Route for Step-1: Refuel Form */}
              <Route path="/" element={<RefuelForm onSubmit={handleNewRefuelEvent} />} />

              {/* Route for Step-4: Refuel Events Summary */}
              <Route
                path="/summary"
                element={
                  <>
                    <h2>Refueling Events for {selectedCarId}</h2>
                    <ul>
                      {refuelEvents.map((event, index) => (
                        <li key={index}>
                          <div><strong>Date:</strong> {event.date}</div>
                          <div><strong>Car Kilometers:</strong> {event.carKilometers} km</div>
                          <div><strong>Refueled Liters:</strong> {event.refueledLiters} L</div>
                          <div><strong>Price per Liter:</strong> €{event.pricePerLiter}</div>
                          <div><strong>Cost:</strong> €{(parseFloat(event.refueledLiters) * parseFloat(event.pricePerLiter)).toFixed(2)}</div>
                          <div><strong>Consumption:</strong> {(parseFloat(event.refueledLiters) / parseFloat(event.carKilometers) * 100).toFixed(2)} L/100km</div>
                          <button onClick={() => handleRemoveRefuelEvent(index)}>Remove</button>
                        </li>
                      ))}
                    </ul>

                    <h3>Summary</h3>
                    <div><strong>Total Kilometers Driven:</strong> {totalKilometers} km</div>
                    <div><strong>Total Cost:</strong> €{totalCost.toFixed(2)}</div>
                    <div><strong>Average Consumption:</strong> {averageConsumption.toFixed(2)} L/100km</div>
                  </>
                }
              />

              {/* Route for the chart page */}
              <Route
                path="/chart"
                element={<ConsumptionChart refuelEvents={refuelEvents} />}
              />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
