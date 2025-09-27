import React, { useState } from 'react';

const FilterBar = ({ onFilterChange, onSortChange }) => {
    const [filters, setFilters] = useState({
        rating: '',
        category: '',
        channel: '',
        time: ''
    });

    const [sortBy, setSortBy] = useState('');

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => {
            const updatedFilters = { ...prev, [name]: value };
            onFilterChange(updatedFilters);
            return updatedFilters;
        });
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSortBy(value);
        onSortChange(value);  // Pass sort value to parent component
    };

    return (
        <div className="flex flex-wrap space-x-4 p-4 border-b border-gray-300 mb-6">
            <div className="flex flex-col">
                <label htmlFor="rating" className="text-sm font-medium">Rating</label>
                <select name="rating" value={filters.rating} onChange={handleFilterChange} className="mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">All Ratings</option>
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select name="category" value={filters.category} onChange={handleFilterChange} className="mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">All Categories</option>
                    <option value="cleanliness">Cleanliness</option>
                    <option value="communication">Communication</option>
                    <option value="respect_house_rules">Respect House Rules</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="channel" className="text-sm font-medium">Channel</label>
                <select name="channel" value={filters.channel} onChange={handleFilterChange} className="mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">All Channels</option>
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium">Time</label>
                <select name="time" value={filters.time} onChange={handleFilterChange} className="mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">All Time</option>
                    <option value="last_week">Last Week</option>
                    <option value="last_month">Last Month</option>
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="sort" className="text-sm font-medium">Sort By</label>
                <select value={sortBy} onChange={handleSortChange} className="mt-2 p-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                    <option value="">Sort By</option>
                    <option value="rating">Rating</option>
                    <option value="date">Date</option>
                </select>
            </div>
        </div>
    );
};

export default FilterBar;
