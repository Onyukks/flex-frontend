import React from 'react';

const ReviewCard = ({ review, onSelect, isSelected }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h3 className="font-semibold">{review.guestName}</h3>
      <p>{review.publicReview}</p>
      <div className="flex space-x-2 mt-2">
        {review.reviewCategory?.map((r, index) => (
          <span key={index} className="text-sm">
            {r.category}: {r.rating}
          </span>
        ))}
      </div>
      <div className="mt-2 flex justify-between items-center">
        <span>{new Date(review.submittedAt).toLocaleDateString()}</span>
      <button
                  onClick={() => onSelect(review.id)}
             className={`text-sm ${isSelected ? 'text-green-500' : 'text-blue-500'} hover:underline`}
             >
            {isSelected ? '✔ Added to Website' : 'Select for Website'}
    </button>

      </div>
    </div>
  );
};

export default ReviewCard;
