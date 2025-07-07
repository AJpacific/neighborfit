import React from 'react';
import Icon from '../../../components/AppIcon';

const AboutTab = ({ profile }) => {
  const getFitnessLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success';
      case 'Intermediate': return 'text-warning';
      case 'Advanced': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getGoalIcon = (goal) => {
    const icons = {
      'Weight Loss': 'TrendingDown',
      'Muscle Gain': 'TrendingUp',
      'Endurance': 'Zap',
      'Flexibility': 'Rotate3d',
      'Strength': 'Dumbbell',
      'Balance': 'Scale'
    };
    return icons[goal] || 'Target';
  };

  const formatAvailability = (availability) => {
    const weekdays = availability?.weekdays?.join(', ') || 'None';
    const weekends = availability?.weekends?.join(', ') || 'None';
    return { weekdays, weekends };
  };

  const availabilityData = formatAvailability(profile?.availability);

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Fitness Level
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="Activity" size={16} className={getFitnessLevelColor(profile?.fitnessLevel)} />
              <span className={`font-medium ${getFitnessLevelColor(profile?.fitnessLevel)}`}>
                {profile?.fitnessLevel}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1">
              Community Level
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span className="font-medium text-primary">
                {profile?.stats?.level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Goals */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Fitness Goals
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {profile?.goals?.map((goal, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name={getGoalIcon(goal)} size={16} className="text-white" />
              </div>
              <span className="font-medium text-text-primary">{goal}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Availability
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Weekdays
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-tertiary" />
              <span className="text-text-primary">
                {availabilityData.weekdays}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Weekends
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-text-tertiary" />
              <span className="text-text-primary">
                {availabilityData.weekends}
              </span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Preferred Time
            </label>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-text-tertiary" />
              <span className="text-text-primary">
                {profile?.availability?.timePreference}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Preferences */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Activity Preferences
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {profile?.interests?.map((interest, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 p-3 bg-background-secondary rounded-lg text-center"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Activity" size={18} className="text-white" />
              </div>
              <span className="text-sm font-medium text-text-primary">
                {interest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;