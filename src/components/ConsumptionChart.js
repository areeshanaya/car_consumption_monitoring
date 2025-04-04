// src/components/ConsumptionChart.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ConsumptionChart = ({ refuelEvents }) => {
  // Prepare the data for the chart
  const chartData = refuelEvents.map((event, index) => ({
    date: event.date,
    consumption: (parseFloat(event.refueledLiters) / parseFloat(event.carKilometers) * 100).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="consumption" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ConsumptionChart;
