import React from 'react';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = review.profiles || {};
  const username = user?.username || 'Praise Dike';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
            <span className="text-lg font-bold text-gray-600">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-800">{username}</p>
            <p className="text-sm text-gray-500">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-yellow-400">
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review.review_text}</p>
      {review.isOwner && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onEdit(review)}
            className="text-sm text-blue-500 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(review.id)}
            className="text-sm text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
