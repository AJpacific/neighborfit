import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityCard = ({ 
  activity, 
  onJoin, 
  onViewDetails, 
  isJoined = false 
}) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = async () => {
    setIsJoining(true);
    try {
      await onJoin?.(activity.id);
      setTimeout(() => setIsJoining(false), 1000);
    } catch (error) {
      setIsJoining(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'text-success bg-success-50';
      case 'intermediate': return 'text-warning bg-warning-50';
      case 'advanced': return 'text-error bg-error-50';
      default: return 'text-accent bg-accent-50';
    }
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'Running': 'Zap',
      'Yoga': 'Heart',
      'Basketball': 'Circle',
      'Cycling': 'Bike',
      'Swimming': 'Waves',
      'Tennis': 'Circle',
      'Hiking': 'Mountain',
      'Gym': 'Dumbbell'
    };
    return iconMap[type] || 'Activity';
  };

  return (
    <div className="bg-surface rounded-xl border border-border hover:border-primary-200 shadow-elevation-1 hover:shadow-elevation-2 transition-all duration-normal group">
      {/* Activity Image */}
      <div className="relative h-48 overflow-hidden rounded-t-xl bg-background-secondary">
        <Image
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-slow"
        />
        
        {/* Activity Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="inline-flex items-center space-x-1 px-2 py-1 bg-surface bg-opacity-90 backdrop-blur-sm rounded-full">
            <Icon name={getActivityIcon(activity.type)} size={14} color="var(--color-primary)" />
            <span className="font-caption text-xs font-medium text-text-primary">
              {activity.type}
            </span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
            {activity.difficulty}
          </span>
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="inline-flex items-center space-x-1 px-2 py-1 bg-black bg-opacity-50 backdrop-blur-sm rounded-full">
            <Icon name="MapPin" size={12} color="white" />
            <span className="font-caption text-xs font-medium text-white">
              {activity.distance}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title and Organizer */}
        <div className="mb-3">
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-1 line-clamp-1">
            {activity.title}
          </h3>
          <div className="flex items-center space-x-2">
            <Image
              src={activity.organizer.avatar}
              alt={activity.organizer.name}
              className="w-5 h-5 rounded-full"
            />
            <span className="font-body text-sm text-text-secondary">
              by {activity.organizer.name}
            </span>
            {activity.organizer.verified && (
              <Icon name="BadgeCheck" size={14} color="var(--color-success)" />
            )}
          </div>
        </div>

        {/* Activity Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Calendar" size={16} />
            <span className="font-body text-sm">{activity.date}</span>
            <Icon name="Clock" size={16} />
            <span className="font-body text-sm">{activity.time}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="MapPin" size={16} />
            <span className="font-body text-sm line-clamp-1">{activity.location}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-secondary">
              <Icon name="Users" size={16} />
              <span className="font-body text-sm">
                {activity.currentParticipants}/{activity.maxParticipants} joined
              </span>
            </div>
            
            {activity.price && (
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={16} color="var(--color-success)" />
                <span className="font-body font-medium text-success">
                  ${activity.price}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-background-tertiary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-normal"
              style={{ 
                width: `${Math.min((activity.currentParticipants / activity.maxParticipants) * 100, 100)}%` 
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="font-caption text-xs text-text-tertiary">
              {activity.maxParticipants - activity.currentParticipants} spots left
            </span>
            <span className="font-caption text-xs text-text-tertiary">
              {Math.round((activity.currentParticipants / activity.maxParticipants) * 100)}% full
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => onViewDetails?.(activity)}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            Details
          </Button>
          
          <Button
            variant={isJoined ? "success" : "primary"}
            onClick={handleJoin}
            loading={isJoining}
            disabled={isJoined || activity.currentParticipants >= activity.maxParticipants}
            className="flex-1"
            iconName={isJoined ? "Check" : "UserPlus"}
            iconPosition="left"
          >
            {isJoined ? 'Joined' : activity.currentParticipants >= activity.maxParticipants ? 'Full' : 'Join'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;