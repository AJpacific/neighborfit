import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AdvancedFilters = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange,
  onApplyFilters,
  onResetFilters 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const filterSections = [
    {
      id: 'sports',
      title: 'Specific Sports',
      icon: 'Activity',
      options: [
        'Running', 'Yoga', 'Basketball', 'Cycling', 'Swimming', 'Tennis', 
        'Hiking', 'Gym Workout', 'Pilates', 'Boxing', 'Dance', 'Martial Arts'
      ]
    },
    {
      id: 'groupSize',
      title: 'Group Size',
      icon: 'Users',
      options: ['1-3 people', '4-8 people', '9-15 people', '16+ people']
    },
    {
      id: 'cost',
      title: 'Cost Range',
      icon: 'DollarSign',
      options: ['Free', '$1-10', '$11-25', '$26-50', '$50+']
    },
    {
      id: 'accessibility',
      title: 'Accessibility',
      icon: 'Heart',
      options: ['Wheelchair Accessible', 'Beginner Friendly', 'All Ages Welcome', 'Equipment Provided']
    }
  ];

  const handleFilterToggle = (sectionId, option) => {
    setLocalFilters(prev => ({
      ...prev,
      [sectionId]: prev[sectionId]?.includes(option)
        ? prev[sectionId].filter(item => item !== option)
        : [...(prev[sectionId] || []), option]
    }));
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
    onApplyFilters?.();
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({});
    onResetFilters?.();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 lg:z-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Filter Panel */}
      <div className="relative h-full flex items-end lg:items-center justify-center lg:justify-end p-4">
        <div className="bg-surface rounded-t-2xl lg:rounded-2xl w-full max-w-lg lg:max-w-md max-h-[90vh] overflow-hidden shadow-elevation-4 lg:mr-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-2">
              <Icon name="SlidersHorizontal" size={20} color="var(--color-primary)" />
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Advanced Filters
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Filter Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6 space-y-6">
            {/* Distance Range */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="MapPin" size={18} />
                <span>Distance Range</span>
              </h3>
              <div className="space-y-2">
                <Input
                  type="range"
                  min="1"
                  max="25"
                  value={localFilters.maxDistance || 10}
                  onChange={(e) => setLocalFilters(prev => ({ ...prev, maxDistance: e.target.value }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-text-secondary">
                  <span>1 mile</span>
                  <span className="font-medium text-text-primary">
                    {localFilters.maxDistance || 10} miles
                  </span>
                  <span>25 miles</span>
                </div>
              </div>
            </div>

            {/* Time Preferences */}
            <div>
              <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
                <Icon name="Clock" size={18} />
                <span>Time Preferences</span>
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {['Morning', 'Afternoon', 'Evening', 'Weekend'].map((time) => (
                  <button
                    key={time}
                    onClick={() => handleFilterToggle('timePreferences', time)}
                    className={`p-3 rounded-lg border text-sm font-body transition-smooth ${
                      localFilters.timePreferences?.includes(time)
                        ? 'bg-primary-50 border-primary-200 text-primary' :'bg-background-secondary border-border-secondary text-text-secondary hover:text-text-primary hover:border-border'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Sections */}
            {filterSections.map((section) => (
              <div key={section.id}>
                <h3 className="font-heading font-semibold text-text-primary mb-3 flex items-center space-x-2">
                  <Icon name={section.icon} size={18} />
                  <span>{section.title}</span>
                </h3>
                <div className="space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background-secondary transition-smooth cursor-pointer"
                    >
                      <Input
                        type="checkbox"
                        checked={localFilters[section.id]?.includes(option) || false}
                        onChange={() => handleFilterToggle(section.id, option)}
                        className="w-4 h-4"
                      />
                      <span className="font-body text-text-primary">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-background-secondary">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleReset}
                className="flex-1"
                iconName="RotateCcw"
                iconPosition="left"
              >
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={handleApply}
                className="flex-1"
                iconName="Check"
                iconPosition="left"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;