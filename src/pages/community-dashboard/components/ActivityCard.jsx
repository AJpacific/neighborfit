import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ activity, onJoin, onLike, onComment }) => {
  const [isLiked, setIsLiked] = useState(activity.isLiked || false);
  const [likeCount, setLikeCount] = useState(activity.likes || 0);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setLikeCount(prev => newLikedState ? prev + 1 : prev - 1);
    onLike?.(activity.id, newLikedState);
  };

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

  const getProximityColor = (distance) => {
    if (distance <= 0.5) return 'text-success';
    if (distance <= 1) return 'text-warning';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 p-4 hover:shadow-elevation-3 transition-smooth">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Image
            src={activity.organizer.avatar}
            alt={activity.organizer.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-body font-semibold text-text-primary">
              {activity.organizer.name}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="font-caption text-xs text-text-secondary">
                {activity.timeAgo}
              </span>
              <span className="w-1 h-1 bg-text-tertiary rounded-full"></span>
              <span className={`font-caption text-xs ${getProximityColor(activity.distance)}`}>
                {activity.distance}km away
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name={getActivityIcon(activity.type)} size={16} color="var(--color-primary)" />
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent">
            {activity.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mb-4">
        <h4 className="font-heading font-bold text-lg text-text-primary mb-2">
          {activity.title}
        </h4>
        <p className="font-body text-text-secondary text-sm mb-3">
          {activity.description}
        </p>

        {/* Activity Details */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} color="var(--color-text-tertiary)" />
            <span className="font-caption text-xs text-text-secondary">
              {activity.date}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} color="var(--color-text-tertiary)" />
            <span className="font-caption text-xs text-text-secondary">
              {activity.time}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} color="var(--color-text-tertiary)" />
            <span className="font-caption text-xs text-text-secondary">
              {activity.location}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={14} color="var(--color-text-tertiary)" />
            <span className="font-caption text-xs text-text-secondary">
              {activity.participants}/{activity.maxParticipants} joined
            </span>
          </div>
        </div>

        {/* Participants Preview */}
        {activity.participantAvatars && activity.participantAvatars.length > 0 && (
          <div className="flex items-center space-x-2 mb-3">
            <div className="flex -space-x-2">
              {activity.participantAvatars.slice(0, 3).map((avatar, index) => (
                <Image
                  key={index}
                  src={avatar}
                  alt={`Participant ${index + 1}`}
                  className="w-6 h-6 rounded-full border-2 border-surface"
                />
              ))}
              {activity.participantAvatars.length > 3 && (
                <div className="w-6 h-6 bg-background-tertiary rounded-full border-2 border-surface flex items-center justify-center">
                  <span className="font-caption text-xs font-medium text-text-secondary">
                    +{activity.participantAvatars.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="font-caption text-xs text-text-secondary">
              and {activity.participants - Math.min(3, activity.participantAvatars.length)} others joined
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border-secondary">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 transition-smooth ${
              isLiked ? 'text-error' : 'text-text-tertiary hover:text-error'
            }`}
          >
            <Icon name={isLiked ? 'Heart' : 'Heart'} size={16} fill={isLiked ? 'currentColor' : 'none'} />
            <span className="font-caption text-xs">{likeCount}</span>
          </button>
          <button
            onClick={() => onComment?.(activity.id)}
            className="flex items-center space-x-1 text-text-tertiary hover:text-text-primary transition-smooth"
          >
            <Icon name="MessageCircle" size={16} />
            <span className="font-caption text-xs">{activity.comments || 0}</span>
          </button>
          <button className="flex items-center space-x-1 text-text-tertiary hover:text-text-primary transition-smooth">
            <Icon name="Share2" size={16} />
            <span className="font-caption text-xs">Share</span>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Link to="/activity-details-registration" state={{ activity }}>
            <Button variant="ghost" size="sm">
              Details
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onJoin?.(activity.id)}
            disabled={activity.participants >= activity.maxParticipants}
            iconName="UserPlus"
            iconPosition="left"
          >
            {activity.participants >= activity.maxParticipants ? 'Full' : 'Join'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;