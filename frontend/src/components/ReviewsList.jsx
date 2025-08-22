import React, { useState, useEffect } from 'react';
import { getDrinkReviews, deleteReview } from '../services/api';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { useAuth } from '../contexts/AuthContext';

const ReviewsList = ({ drinkId }) => {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getDrinkReviews(drinkId);
      if (data) {
        const reviewsWithOwnership = data.map((review) => ({
          ...review,
          isOwner: review.user_id === user?.id,
        }));
        setReviews(reviewsWithOwnership);
      } else {
        setReviews([]);
      }
    } catch (err) {
      setError('Error fetching reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (drinkId) {
      fetchReviews();
    }
  }, [drinkId, user]);

  const handleReviewAdded = (newReview) => {
    setReviews((prev) => [
      { ...newReview, isOwner: true },
      ...prev.filter((r) => r.id !== newReview.id),
    ]);
    setShowForm(false);
    setEditingReview(null);
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setShowForm(true);
  };

  const handleDelete = async (reviewId) => {
    const originalReviews = [...reviews];
    setReviews((prev) => prev.filter((review) => review.id !== reviewId));
    try {
      await deleteReview(reviewId, user.id);
    } catch (error) {
      setError('Failed to delete review.');
      setReviews(originalReviews);
    }
  };

  return (
    <div className="bg-gray-50 p-4 sm:p-8 my-8 rounded-lg">
      <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
      {error && <p className="text-red-500">{error}</p>}

      {user && !showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-6"
        >
          Write a Review
        </button>
      )}

      {showForm && (
        <ReviewForm
          drinkId={drinkId}
          initialReview={editingReview}
          onReviewAdded={handleReviewAdded}
          onCancel={() => {
            setShowForm(false);
            setEditingReview(null);
          }}
          userId={user?.id}
        />
      )}

      <div className="space-y-6 mt-6">
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>Be the first to review this product!</p>
        )}
      </div>
    </div>
  );
};

export default ReviewsList;
