import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PropertyDetailPage = () => {
  const { listingName } = useParams();
  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Fetch property details from mock backend
  const fetchPropertyDetails = async () => {
    try {
      const res = await fetch(`https://flex-backend-s6b5.onrender.com/api/reviews/${encodeURIComponent(listingName)}`);
      const data = await res.json();
      if (data.status === 'success') {
        setProperty(data.result);
        // Only show reviews that were added to site
        const addedReviews = data.result.reviews?.filter(r => r.addedToSite) || [];
        setReviews(addedReviews);
      }
    } catch (err) {
      console.error('Error fetching property details:', err);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [listingName]);

  if (!property) {
    return <div className="text-center py-20 text-gray-500">Loading property details...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Property Header */}
      <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
      <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
        {property.guests && <span>{property.guests} guests</span>}
        {property.bedrooms && <span>{property.bedrooms} bedroom(s)</span>}
        {property.bathrooms && <span>{property.bathrooms} bathroom(s)</span>}
      </div>
      <p className="text-gray-700 mb-4">{property.description}</p>

      {/* Amenities */}
      <h2 className="text-xl font-semibold mb-2">Amenities</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {property.amenities?.map((amenity, i) => (
          <span
            key={i}
            className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm"
          >
            {amenity}
          </span>
        ))}
      </div>

      {/* Reviews Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Guest Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews have been added to the website yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{review.guestName}</h3>
                  <div className="flex space-x-1 text-yellow-400">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => {
                        const rating = review.reviewCategory?.[0]?.rating ?? 0;
                        return (
                          <svg
                            key={i}
                            className="w-4 h-4"
                            fill={i < rating / 2 ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 17l-5.878 3.09L5.5 13.545 1 9.545l6.061-.545L12 2l4.939 7 6.061.545-4.5 4-1.622 6.545L12 17z"
                            />
                          </svg>
                        );
                      })}
                  </div>
                </div>

                <p className="text-gray-700 mb-2">{review.publicReview}</p>

                <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-2">
                  {review.reviewCategory?.map((cat, index) => (
                    <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                      {cat.category}: {cat.rating ?? 'N/A'}
                    </span>
                  ))}
                </div>

                <p className="text-gray-400 text-sm">
                  {review.submittedAt
                    ? new Date(review.submittedAt).toLocaleDateString()
                    : 'N/A'}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetailPage;
