import React, { useState, useEffect } from 'react';
import TrendCard from '../components/TrendCard';
import ReviewCard from '../components/ReviewCard';
import FilterBar from '../components/FilterBar';
import PerPropertyPerformance from '../components/PerPropertyPerformance';
import ReviewCategoriesOverTime from '../components/ReviewCategoriesOverTime';
import { useNavigate } from 'react-router-dom';
import { fetchReviews } from '../../services/api';
import PropertySelection from '../components/PropertySlection';

const trendData = [
  { date: '2025-08-21', rating: 9.5 },
  { date: '2025-08-22', rating: 8.8 },
  { date: '2025-08-23', rating: 9.0 },
  { date: '2025-08-24', rating: 8.7 },
  { date: '2025-08-25', rating: 9.2 },
  { date: '2025-08-26', rating: 9.0 },
  { date: '2025-08-27', rating: 8.8 },
];

const properties = [
  "2B N1 A - 29 Shoreditch Heights",
  "3B N1 B - 15 High Street",
  "1A N2 C - 17 Elm Road"
];

const DashboardPage = () => {
  const [propertyName, setPropertyName] = useState(properties[0]); // default first property
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedReviews, setSelectedReviewsState] = useState([]);
   const navigate = useNavigate();

  // Fetch reviews for a property
  const fetchPropertyReviews = async (listingName) => {
    try {
      const response = await fetch(`https://flex-backend-s6b5.onrender.com/api/reviews/${encodeURIComponent(listingName)}/all-reviews`);
      const data = await response.json();
      setReviews(data.result);
    } catch (error) {
      console.error('Error fetching property reviews:', error);
    }
  };

  // Load reviews + restore selected reviews when property changes
  useEffect(() => {
    if (!propertyName) return;

    fetchPropertyReviews(propertyName);
  }, [propertyName]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const filtered = reviews.filter(review => {
      return (
        (!newFilters.rating || review.reviewCategory.some(cat => cat.rating >= newFilters.rating)) &&
        (!newFilters.category || review.reviewCategory.some(cat => cat.category === newFilters.category)) &&
        (!newFilters.channel || review.channel.toLowerCase() === newFilters.channel.toLowerCase()) &&
        (!newFilters.time || new Date(review.submittedAt) >= new Date(newFilters.time))
      );
    });
    setReviews(filtered);
  };

  const handleSortChange = (sortBy) => {
    const sorted = [...reviews].sort((a, b) => {
      if (sortBy === 'rating') return b.reviewCategory[0].rating - a.reviewCategory[0].rating;
      if (sortBy === 'date') return new Date(b.submittedAt) - new Date(a.submittedAt);
      return 0;
    });
    setReviews(sorted);
  };

 
const handleAddToSite = async (reviewId) => {
  try {
    await fetch(`https://flex-backend-s6b5.onrender.com/api/reviews/${encodeURIComponent(propertyName)}/reviews/${reviewId}/add`, {
      method: 'PATCH',
    });

    setReviews(prev =>
      prev.map(r => r.id === reviewId ? { ...r, addedToSite: true } : r)
    );
  } catch (err) {
    console.error(err);
  }
};



  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* Property Selection */}
      <PropertySelection propertyName={propertyName} onSelectProperty={setPropertyName} />

      {/* Filter Bar */}
      <FilterBar onFilterChange={handleFilterChange} onSortChange={handleSortChange} />

      {/* Trends - Average Rating Over Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TrendCard title="Average Rating Over Time" trendData={trendData} />
        <PerPropertyPerformance />
        <ReviewCategoriesOverTime />
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {reviews.map(review => (
          <ReviewCard
            key={review.id}
            review={review}
            onSelect={handleAddToSite} 
            isSelected={review.addedToSite} 
          />
        ))}

        {propertyName && (
          <button
               className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
               onClick={() => navigate(`/property/${encodeURIComponent(propertyName)}`)}
               >
              View Property Details
            </button>
        )}
     </div>
    </div>
         );
};

export default DashboardPage;
