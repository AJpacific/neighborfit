import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityPreview = ({ formData }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getActivityIcon = (type) => {
    const iconMap = {
      'Running': 'Zap',
      'Cycling': 'Bike',
      'Yoga': 'Heart',
      'Gym': 'Dumbbell',
      'Swimming': 'Waves',
      'Walking': 'MapPin',
      'Tennis': 'Circle',
      'Basketball': 'Circle',
      'Soccer': 'Circle',
      'Other': 'Plus'
    };
    return iconMap[type] || 'Plus';
  };

  const getSkillLevelColor = (level) => {
    const colorMap = {
      'beginner': 'success',
      'intermediate': 'warning',
      'advanced': 'error',
      'all': 'primary'
    };
    return colorMap[level] || 'primary';
  };

  const getPrivacyIcon = (privacy) => {
    const iconMap = {
      'public': 'Globe',
      'friends': 'Users',
      'invite': 'Lock'
    };
    return iconMap[privacy] || 'Globe';
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-elevation-2 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon 
                name={getActivityIcon(formData.activityType)} 
                size={24} 
                color="var(--color-primary)" 
              />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-text-primary">
                {formData.title || 'Activity Title'}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary">
                  {formData.activityType || 'Activity Type'}
                </span>
                {formData.privacy && (
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={getPrivacyIcon(formData.privacy)} 
                      size={12} 
                      color="var(--color-text-tertiary)" 
                    />
                    <span className="text-xs text-text-tertiary capitalize">
                      {formData.privacy}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {formData.cost > 0 && (
            <div className="text-right">
              <p className="font-heading font-bold text-lg text-primary">
                ${formData.cost}
              </p>
              <p className="text-xs text-text-tertiary">per person</p>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Description */}
        {formData.description && (
          <p className="font-body text-text-secondary">
            {formData.description}
          </p>
        )}

        {/* Key Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {formData.date && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                <Icon name="Calendar" size={18} color="var(--color-accent)" />
              </div>
              <div>
                <p className="font-caption text-xs text-text-tertiary">Date</p>
                <p className="font-body font-medium text-text-primary">
                  {formatDate(formData.date)}
                </p>
              </div>
            </div>
          )}

          {formData.time && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center">
                <Icon name="Clock" size={18} color="var(--color-secondary)" />
              </div>
              <div>
                <p className="font-caption text-xs text-text-tertiary">Time</p>
                <p className="font-body font-medium text-text-primary">
                  {formatTime(formData.time)}
                  {formData.duration && ` (${formData.duration} min)`}
                </p>
              </div>
            </div>
          )}

          {formData.address && (
            <div className="flex items-center space-x-3 sm:col-span-2">
              <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon name="MapPin" size={18} color="var(--color-primary)" />
              </div>
              <div className="flex-1">
                <p className="font-caption text-xs text-text-tertiary">Location</p>
                <p className="font-body font-medium text-text-primary">
                  {formData.venueName || formData.address}
                </p>
                {formData.venueName && formData.address && (
                  <p className="font-body text-sm text-text-secondary">
                    {formData.address}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="flex flex-wrap gap-2">
          {formData.maxParticipants && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-background-secondary rounded-full">
              <Icon name="Users" size={14} color="var(--color-text-secondary)" />
              <span className="font-body text-sm text-text-secondary">
                Max {formData.maxParticipants} people
              </span>
            </div>
          )}

          {formData.skillLevel && (
            <div className={`flex items-center space-x-1 px-3 py-1 bg-${getSkillLevelColor(formData.skillLevel)}-50 rounded-full`}>
              <Icon name="Target" size={14} color={`var(--color-${getSkillLevelColor(formData.skillLevel)})`} />
              <span className={`font-body text-sm text-${getSkillLevelColor(formData.skillLevel)} capitalize`}>
                {formData.skillLevel.replace('-', ' ')}
              </span>
            </div>
          )}

          {formData.isRecurring && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-accent-50 rounded-full">
              <Icon name="Repeat" size={14} color="var(--color-accent)" />
              <span className="font-body text-sm text-accent capitalize">
                {formData.recurrenceType}
              </span>
            </div>
          )}
        </div>

        {/* Equipment */}
        {formData.equipment && (
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Package" size={16} color="var(--color-text-secondary)" />
              <span className="font-body font-medium text-text-primary">Equipment Needed</span>
            </div>
            <p className="font-body text-sm text-text-secondary">
              {formData.equipment}
            </p>
          </div>
        )}

        {/* Location Notes */}
        {formData.locationNotes && (
          <div className="bg-background-secondary rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
              <span className="font-body font-medium text-text-primary">Meeting Point</span>
            </div>
            <p className="font-body text-sm text-text-secondary">
              {formData.locationNotes}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-background-secondary border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
              alt="Organizer"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-body font-medium text-text-primary text-sm">
                Organized by You
              </p>
              <p className="font-body text-xs text-text-tertiary">
                Activity organizer
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="font-body text-xs text-text-tertiary">
              Created {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPreview;