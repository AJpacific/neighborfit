import React from 'react';
import Icon from '../../../components/AppIcon';

const ReviewsTab = ({ reviews }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < rating ? 'text-warning' : 'text-text-tertiary'}
      />
    ));
  };

  const getAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    if (!reviews || reviews.length === 0) return {};
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();
  const totalReviews = reviews?.length || 0;
  const averageRating = getAverageRating();

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Rating Summary
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-heading font-bold text-text-primary mb-2">
              {averageRating}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars(Math.round(averageRating))}
            </div>
            <div className="text-text-tertiary text-sm">
              Based on {totalReviews} reviews
            </div>
          </div>
          
          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating] || 0;
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              
              return (
                <div key={rating} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-text-secondary">
                      {rating}
                    </span>
                    <Icon name="Star" size={12} className="text-warning" />
                  </div>
                  <div className="flex-1 h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-warning rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-text-tertiary w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews && reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface rounded-lg shadow-elevation-1 p-6"
            >
              <div className="flex items-start space-x-4">
                {/* Reviewer Avatar */}
                <img
                  src={review.reviewer.avatar}
                  alt={review.reviewer.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-heading font-medium text-text-primary">
                        {review.reviewer.name}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <div className="text-text-tertiary text-sm">
                      {formatDate(review.date)}
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-3">
                    {review.comment}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-sm text-text-tertiary">
                    <Icon name="Calendar" size={14} />
                    <span>{review.activity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-surface rounded-lg shadow-elevation-1 p-8 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="font-heading font-medium text-lg text-text-secondary mb-2">
              No reviews yet
            </h3>
            <p className="text-text-tertiary">
              Reviews from other community members will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsTab;