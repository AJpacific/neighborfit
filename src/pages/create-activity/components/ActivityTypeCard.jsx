import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTypeCard = ({ type, isSelected, onSelect }) => {
  const typeConfig = {
    'Running': { icon: 'Zap', color: 'primary', bgColor: 'primary-50' },
    'Cycling': { icon: 'Bike', color: 'accent', bgColor: 'accent-50' },
    'Yoga': { icon: 'Heart', color: 'secondary', bgColor: 'secondary-50' },
    'Gym': { icon: 'Dumbbell', color: 'warning', bgColor: 'warning-50' },
    'Swimming': { icon: 'Waves', color: 'accent', bgColor: 'accent-50' },
    'Walking': { icon: 'MapPin', color: 'success', bgColor: 'success-50' },
    'Tennis': { icon: 'Circle', color: 'primary', bgColor: 'primary-50' },
    'Basketball': { icon: 'Circle', color: 'warning', bgColor: 'warning-50' },
    'Soccer': { icon: 'Circle', color: 'success', bgColor: 'success-50' },
    'Other': { icon: 'Plus', color: 'text-secondary', bgColor: 'background-tertiary' }
  };

  const config = typeConfig[type] || typeConfig['Other'];

  return (
    <button
      type="button"
      onClick={() => onSelect(type)}
      className={`w-full p-4 rounded-xl border-2 transition-all duration-normal ${
        isSelected
          ? `border-${config.color} bg-${config.bgColor} shadow-elevation-2`
          : 'border-border hover:border-border-secondary hover:bg-background-secondary'
      }`}
    >
      <div className="flex flex-col items-center space-y-2">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isSelected ? `bg-${config.color}` : `bg-${config.bgColor}`
        }`}>
          <Icon 
            name={config.icon} 
            size={24} 
            color={isSelected ? 'white' : `var(--color-${config.color})`}
          />
        </div>
        <span className={`font-body font-medium ${
          isSelected ? `text-${config.color}` : 'text-text-primary'
        }`}>
          {type}
        </span>
      </div>
    </button>
  );
};

export default ActivityTypeCard;