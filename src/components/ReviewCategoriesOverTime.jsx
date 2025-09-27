import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for Review Categories Over Time
const reviewCategoriesData = [
  { date: '2025-08-21', cleanliness: 9.5, communication: 9.0, respect_house_rules: 9.3 },
  { date: '2025-08-22', cleanliness: 9.0, communication: 9.2, respect_house_rules: 8.8 },
  { date: '2025-08-23', cleanliness: 9.3, communication: 9.1, respect_house_rules: 9.0 },
  { date: '2025-08-24', cleanliness: 8.9, communication: 8.8, respect_house_rules: 9.2 },
  { date: '2025-08-25', cleanliness: 9.4, communication: 9.0, respect_house_rules: 9.1 },
  { date: '2025-08-26', cleanliness: 9.2, communication: 9.1, respect_house_rules: 9.4 },
  { date: '2025-08-27', cleanliness: 9.0, communication: 8.9, respect_house_rules: 9.0 },
];

const ReviewCategoriesOverTime = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="font-semibold mb-4">Review Categories Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={reviewCategoriesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="cleanliness" stroke="#8884d8" />
          <Line type="monotone" dataKey="communication" stroke="#82ca9d" />
          <Line type="monotone" dataKey="respect_house_rules" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReviewCategoriesOverTime;
