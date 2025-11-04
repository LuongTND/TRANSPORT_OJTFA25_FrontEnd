import React from 'react';

/**
 * Component hiển thị rating trung bình với sao
 * @param {number} rating - Điểm rating (0-5)
 * @param {number} totalReviews - Tổng số đánh giá (optional)
 * @param {string} size - Kích thước: 'sm', 'md', 'lg' (default: 'md')
 * @param {boolean} showText - Hiển thị số rating (default: true)
 */
const RatingDisplay = ({ 
  rating = 0, 
  totalReviews = null, 
  size = 'md', 
  showText = true 
}) => {
  const numericRating = parseFloat(rating) || 0;
  const filledStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  const starSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center gap-2 ${sizeClasses[size]}`}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          if (star <= filledStars) {
            // Filled star
            return (
              <span key={star} className={`text-yellow-500 ${starSizeClasses[size]}`}>
                ★
              </span>
            );
          } else if (star === filledStars + 1 && hasHalfStar) {
            // Half star
            return (
              <span key={star} className={`text-yellow-500 ${starSizeClasses[size]}`}>
                ★
              </span>
            );
          } else {
            // Empty star
            return (
              <span key={star} className={`text-gray-300 ${starSizeClasses[size]}`}>
                ★
              </span>
            );
          }
        })}
      </div>
      
      {/* Rating text */}
      {showText && (
        <div className="flex items-center gap-1">
          <span className="font-semibold text-gray-900">{numericRating.toFixed(1)}</span>
          {totalReviews !== null && (
            <span className="text-gray-500 text-xs">
              ({totalReviews} {totalReviews === 1 ? 'đánh giá' : 'đánh giá'})
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default RatingDisplay;

