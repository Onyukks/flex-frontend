import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for Per-Property Performance
const performanceData = [
  { property: "2B N1 A", rating: 9.5 },
  { property: "3B N1 B", rating: 8.8 },
  { property: "1A N2 C", rating: 9.0 },
  { property: "4C N1 D", rating: 8.7 },
  { property: "5A N2 E", rating: 9.2 },
  { property: "6B N1 F", rating: 8.9 },
];

const PerPropertyPerformance = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-4">Per-Property Performance</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="property" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerPropertyPerformance;
