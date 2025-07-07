import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TodayActivitiesSection = ({ activities, onJoinActivity }) => {
  const getActivityIcon = (type) => {
    const iconMap = {
      'Running': 'Zap',
      'Yoga': 'Heart',
      'Cycling': 'Bike',
      'Swimming': 'Waves',
      'Gym': 'Dumbbell',
      'Walking': 'MapPin',
      'Tennis': 'Target',
      'Basketball': 'Circle'
    };
    return iconMap[type] || 'Activity';
  };

  const getTimeStatus = (time) => {
    const now = new Date();
    const activityTime = new Date(`${now.toDateString()} ${time}`);
    const diffMinutes = (activityTime - now) / (1000 * 60);
    
    if (diffMinutes < 0) return { text: 'In Progress', color: 'text-success', bg: 'bg-success-50' };
    if (diffMinutes < 60) return { text: `${Math.round(diffMinutes)}min`, color: 'text-warning', bg: 'bg-warning-50' };
    return { text: time, color: 'text-text-secondary', bg: 'bg-background-secondary' };
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="bg-surface rounded-xl shadow-elevation-2 p-6 text-center">
        <Icon name="Calendar" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-3" />
        <h3 className="font-heading font-semibold text-text-primary mb-2">
          No Activities Today
        </h3>
        <p className="font-body text-text-secondary mb-4">
          Be the first to organize something fun in your neighborhood!
        </p>
        <Link to="/create-activity">
          <Button variant="primary" iconName="Plus" iconPosition="left">
            Create Activity
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Today's Activities
        </h2>
        <Link 
          to="/activity-search-discovery"
          className="text-accent hover:text-accent-700 font-body text-sm transition-smooth"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2" style={{ width: 'max-content' }}>
          {activities.map((activity) => {
            const timeStatus = getTimeStatus(activity.time);
            
            return (
              <div
                key={activity.id}
                className="bg-surface rounded-xl shadow-elevation-2 p-4 w-72 flex-shrink-0 hover:shadow-elevation-3 transition-smooth"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
                      <Icon name={getActivityIcon(activity.type)} size={16} color="var(--color-primary)" />
                    </div>
                    <span className="font-caption text-xs font-medium text-primary">
                      {activity.type}
                    </span>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${timeStatus.bg} ${timeStatus.color}`}>
                    {timeStatus.text}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="font-heading font-bold text-lg text-text-primary mb-2">
                    {activity.title}
                  </h3>
                  <p className="font-body text-text-secondary text-sm mb-3 line-clamp-2">
                    {activity.description}
                  </p>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Icon name="MapPin" size={14} color="var(--color-text-tertiary)" />
                      <span className="font-caption text-xs text-text-secondary">
                        {activity.location} • {activity.distance}km away
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={14} color="var(--color-text-tertiary)" />
                      <span className="font-caption text-xs text-text-secondary">
                        {activity.participants}/{activity.maxParticipants} joined
                      </span>
                    </div>
                  </div>

                  {/* Organizer */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Image
                      src={activity.organizer.avatar}
                      alt={activity.organizer.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-caption text-xs text-text-secondary">
                      by {activity.organizer.name}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Link to="/activity-details-registration" state={{ activity }} className="flex-1">
                    <Button variant="ghost" size="sm" fullWidth>
                      Details
                    </Button>
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onJoinActivity?.(activity.id)}
                    disabled={activity.participants >= activity.maxParticipants}
                    iconName="UserPlus"
                    iconPosition="left"
                  >
                    {activity.participants >= activity.maxParticipants ? 'Full' : 'Join'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TodayActivitiesSection;