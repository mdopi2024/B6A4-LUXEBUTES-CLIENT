import React from "react";

export interface ReviewData {
  id: string;
  userId: string;
  mealId: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

const ReviewCard = ({ reviews }: { reviews: ReviewData[] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 bg-gray-50 rounded-xl border">
        No review available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const formattedDate = new Date(review.createdAt).toLocaleDateString();

        return (
          <div
            key={review.id}
            className="bg-white shadow-md  rounded-xl p-6 border hover:shadow-lg transition duration-300"
          >
            {/* Header */}
            <div className="flex justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">
                User ID: <span className="text-gray-500">{review.userId}</span>
              </h3>
              <span className="text-xs text-gray-400">{formattedDate}</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-lg">
                  {index < review.rating ? "★" : "☆"}
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-600">
                ({review.rating}/5)
              </span>
            </div>

            {/* Comment */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewCard;