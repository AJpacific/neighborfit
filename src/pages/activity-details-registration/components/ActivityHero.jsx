import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActivityHero = ({ activity, onRegister, isRegistered, isRegistering }) => {
  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-success-100 text-success-700';
      case 'intermediate': return 'bg-warning-100 text-warning-700';
      case 'advanced': return 'bg-error-100 text-error-700';
      default: return 'bg-primary-100 text-primary-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'open': return 'bg-success-100 text-success-700';
      case 'full': return 'bg-error-100 text-error-700';
      case 'cancelled': return 'bg-error-100 text-error-700';
      default: return 'bg-primary-100 text-primary-700';
    }
  };

  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-64 lg:h-80 bg-background-secondary overflow-hidden rounded-lg">
        <Image
          src={activity.image}
          alt={activity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
            {activity.difficulty}
          </span>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
            {activity.status}
          </span>
        </div>

        {/* Share Button */}
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-surface/90 backdrop-blur-sm rounded-lg text-text-primary hover:bg-surface transition-smooth">
            <Icon name="Share2" size={20} />
          </button>
        </div>

        {/* Activity Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary text-primary-foreground">
              {activity.category}
            </span>
            <span className="text-sm opacity-90">
              Organized by {activity.organizer.name}
            </span>
          </div>
          <h1 className="font-heading font-bold text-2xl lg:text-3xl mb-2">
            {activity.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{activity.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} />
              <span>{activity.time}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={16} />
              <span>{activity.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-50 rounded-lg mx-auto mb-2">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <p className="font-body font-semibold text-text-primary">
            {activity.currentParticipants}/{activity.maxParticipants}
          </p>
          <p className="font-caption text-xs text-text-secondary">Participants</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary-50 rounded-lg mx-auto mb-2">
            <Icon name="DollarSign" size={20} color="var(--color-secondary)" />
          </div>
          <p className="font-body font-semibold text-text-primary">
            {activity.price === 0 ? 'Free' : `$${activity.price}`}
          </p>
          <p className="font-caption text-xs text-text-secondary">Cost</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-accent-50 rounded-lg mx-auto mb-2">
            <Icon name="Clock" size={20} color="var(--color-accent)" />
          </div>
          <p className="font-body font-semibold text-text-primary">
            {activity.duration}
          </p>
          <p className="font-caption text-xs text-text-secondary">Duration</p>
        </div>

        <div className="bg-surface border border-border rounded-lg p-4 text-center">
          <div className="flex items-center justify-center w-10 h-10 bg-warning-50 rounded-lg mx-auto mb-2">
            <Icon name="Star" size={20} color="var(--color-warning)" />
          </div>
          <p className="font-body font-semibold text-text-primary">
            {activity.rating}
          </p>
          <p className="font-caption text-xs text-text-secondary">Rating</p>
        </div>
      </div>

      {/* Registration Button */}
      <div className="mt-6">
        <Button
          variant={isRegistered ? "success" : "primary"}
          onClick={onRegister}
          loading={isRegistering}
          disabled={isRegistered || activity.status === 'full' || activity.status === 'cancelled'}
          fullWidth
          iconName={isRegistered ? "Check" : "UserPlus"}
          iconPosition="left"
          size="lg"
        >
          {isRegistered ? 'You\'re Registered!' : 
           activity.status === 'full' ? 'Activity Full' :
           activity.status === 'cancelled' ? 'Activity Cancelled' :
           activity.price === 0 ? 'Join Activity' : `Join for $${activity.price}`}
        </Button>
      </div>
    </div>
  );
};

export default ActivityHero;