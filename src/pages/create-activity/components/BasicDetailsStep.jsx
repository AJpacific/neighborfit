import React from 'react';
import Input from '../../../components/ui/Input';
import ActivityTypeCard from './ActivityTypeCard';

const BasicDetailsStep = ({ formData, updateFormData, errors }) => {
  const activityTypes = [
    'Running', 'Cycling', 'Yoga', 'Gym', 'Swimming', 
    'Walking', 'Tennis', 'Basketball', 'Soccer', 'Other'
  ];

  const handleTypeSelect = (type) => {
    updateFormData({ activityType: type });
  };

  const handleTitleChange = (e) => {
    updateFormData({ title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 500) {
      updateFormData({ description: value });
    }
  };

  return (
    <div className="space-y-6">
      {/* Activity Type Selection */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Activity Type *
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {activityTypes.map((type) => (
            <ActivityTypeCard
              key={type}
              type={type}
              isSelected={formData.activityType === type}
              onSelect={handleTypeSelect}
            />
          ))}
        </div>
        {errors.activityType && (
          <p className="text-error text-sm mt-2">{errors.activityType}</p>
        )}
      </div>

      {/* Activity Title */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Activity Title *
        </label>
        <Input
          type="text"
          placeholder="e.g., Morning Jog in Central Park"
          value={formData.title}
          onChange={handleTitleChange}
          className={errors.title ? 'border-error' : ''}
        />
        {errors.title && (
          <p className="text-error text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Description
        </label>
        <div className="relative">
          <textarea
            placeholder="Describe your activity, what to expect, and any special requirements..."
            value={formData.description}
            onChange={handleDescriptionChange}
            rows={4}
            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none font-body text-text-primary placeholder-text-tertiary"
          />
          <div className="absolute bottom-3 right-3 text-xs text-text-tertiary">
            {formData.description.length}/500
          </div>
        </div>
        {errors.description && (
          <p className="text-error text-sm mt-1">{errors.description}</p>
        )}
      </div>

      {/* Custom Activity Type Input */}
      {formData.activityType === 'Other' && (
        <div>
          <label className="block font-body font-medium text-text-primary mb-2">
            Custom Activity Type *
          </label>
          <Input
            type="text"
            placeholder="Enter your activity type"
            value={formData.customActivityType || ''}
            onChange={(e) => updateFormData({ customActivityType: e.target.value })}
            className={errors.customActivityType ? 'border-error' : ''}
          />
          {errors.customActivityType && (
            <p className="text-error text-sm mt-1">{errors.customActivityType}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BasicDetailsStep;