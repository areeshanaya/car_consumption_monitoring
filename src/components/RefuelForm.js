// src/components/RefuelForm.js
import React, { useState } from 'react';

const RefuelForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: '',
    carKilometers: '',
    refueledLiters: '',
    pricePerLiter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Instead of calling onSubmit, directly call the passed dispatch function
    onSubmit(formData);
    setFormData({
      date: '',
      carKilometers: '',
      refueledLiters: '',
      pricePerLiter: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="refuel-form">
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="carKilometers">Car Kilometers</label>
        <input
          type="number"
          id="carKilometers"
          name="carKilometers"
          value={formData.carKilometers}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="refueledLiters">Refueled Liters</label>
        <input
          type="number"
          id="refueledLiters"
          name="refueledLiters"
          value={formData.refueledLiters}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="pricePerLiter">Price per Liter</label>
        <input
          type="number"
          id="pricePerLiter"
          name="pricePerLiter"
          value={formData.pricePerLiter}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default RefuelForm;
