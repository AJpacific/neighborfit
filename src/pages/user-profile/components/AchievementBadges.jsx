import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'bg-success';
    if (progress >= 75) return 'bg-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-text-tertiary';
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-1 p-6 mb-6">
      <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
        Achievement Badges
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-lg border-2 transition-smooth ${
              achievement.progress >= 100
                ? 'border-success bg-success-50' :'border-border-secondary bg-background-secondary'
            }`}
          >
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                achievement.progress >= 100
                  ? 'bg-success text-white' :'bg-background-tertiary text-text-tertiary'
              }`}>
                <Icon
                  name={achievement.icon}
                  size={24}
                  className={achievement.progress >= 100 ? 'text-white' : achievement.color}
                />
              </div>
              
              <h4 className="font-heading font-medium text-text-primary mb-1">
                {achievement.title}
              </h4>
              
              <p className="text-xs text-text-tertiary mb-3">
                {achievement.description}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-background-tertiary rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(achievement.progress)}`}
                  style={{ width: `${achievement.progress}%` }}
                />
              </div>
              
              <div className="text-xs text-text-tertiary">
                {achievement.progress >= 100 ? (
                  <span className="text-success font-medium">
                    Unlocked {achievement.unlockedAt && formatDate(achievement.unlockedAt)}
                  </span>
                ) : (
                  <span>{achievement.progress}% Complete</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;