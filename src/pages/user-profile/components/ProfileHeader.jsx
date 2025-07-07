import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ profile, isOwner, onEdit }) => {
  const formatMemberSince = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  };

  const getActivityTypeIcon = (type) => {
    const icons = {
      'Yoga': 'Heart',
      'Running': 'Zap',
      'Hiking': 'Mountain',
      'Swimming': 'Waves',
      'Cycling': 'Bike',
      'Gym': 'Dumbbell'
    };
    return icons[type] || 'Activity';
  };

  return (
    <div className="bg-surface rounded-lg shadow-elevation-1 overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="relative h-48 lg:h-64">
        <img
          src={profile?.coverImage}
          alt="Profile cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Edit Button */}
        {isOwner && (
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={onEdit}
            className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Avatar */}
          <div className="relative -mt-16 lg:-mt-20 mb-4 lg:mb-0">
            <img
              src={profile?.avatar}
              alt={profile?.name}
              className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-surface shadow-elevation-2"
            />
            {profile?.isOnline && (
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-2 border-surface" />
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-text-primary">
                {profile?.name}
              </h1>
              {profile?.verified && (
                <Icon name="CheckCircle" size={20} className="text-primary" />
              )}
            </div>
            
            <p className="text-text-secondary mb-2">{profile?.username}</p>
            
            <div className="flex items-center space-x-4 text-text-tertiary mb-4">
              <div className="flex items-center space-x-1">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{profile?.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span className="text-sm">
                  Member since {formatMemberSince(profile?.memberSince)}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-text-secondary mb-4 max-w-2xl">
              {profile?.bio}
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-4">
              {profile?.interests?.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-50 text-primary rounded-full text-sm"
                >
                  <Icon name={getActivityTypeIcon(interest)} size={14} />
                  <span>{interest}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border-secondary">
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-text-primary">
              {profile?.stats?.activitiesJoined}
            </div>
            <div className="text-text-tertiary text-sm">Activities Joined</div>
          </div>
          
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-text-primary">
              {profile?.stats?.eventsHosted}
            </div>
            <div className="text-text-tertiary text-sm">Events Hosted</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <span className="font-heading font-bold text-2xl text-text-primary">
                {profile?.stats?.rating}
              </span>
              <Icon name="Star" size={16} className="text-warning" />
            </div>
            <div className="text-text-tertiary text-sm">
              {profile?.stats?.totalRatings} reviews
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-heading font-bold text-2xl text-text-primary">
              {profile?.stats?.connections}
            </div>
            <div className="text-text-tertiary text-sm">Connections</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;