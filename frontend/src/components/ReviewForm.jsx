import React, { useState, useEffect } from 'react';
import { createReview, updateReview } from '../services/api';

const ReviewForm = ({ drinkId, onReviewAdded, initialReview, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialReview) {
      setRating(initialReview.rating);
      setReviewText(initialReview.review_text);
    }
  }, [initialReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      setError('Rating must be between 1 and 5.');
      return;
    }
    if (reviewText.trim().length < 10) {
      setError('Review must be at least 10 characters long.');
      return;
    }
    setError('');
    try {
      if (initialReview) {
        await updateReview(initialReview.id, rating, reviewText);
      } else {
        await createReview(drinkId, rating, reviewText);
      }
      onReviewAdded();
    } catch (err) {
      setError('Error submitting review.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-8"
    >
      <h4 className="text-xl font-bold mb-4">
        {initialReview ? 'Edit Your Review' : 'Write a Review'}
      </h4>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
          Rating
        </label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
          Review
        </label>
        <textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 border border-gray-300 rounded-md"
          rows="4"
        />
      </div>
      <div className="flex justify-end space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          {initialReview ? 'Update Review' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
