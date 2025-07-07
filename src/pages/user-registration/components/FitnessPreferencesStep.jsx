import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FitnessPreferencesStep = ({ formData, onUpdate, onNext, onBack }) => {
  const fitnessActivities = [
    { id: 'running', name: 'Running', icon: 'Zap', color: 'bg-primary-50 text-primary' },
    { id: 'yoga', name: 'Yoga', icon: 'Heart', color: 'bg-secondary-50 text-secondary' },
    { id: 'strength', name: 'Strength Training', icon: 'Dumbbell', color: 'bg-accent-50 text-accent' },
    { id: 'cycling', name: 'Cycling', icon: 'Bike', color: 'bg-success-50 text-success' },
    { id: 'swimming', name: 'Swimming', icon: 'Waves', color: 'bg-warning-50 text-warning' },
    { id: 'hiking', name: 'Hiking', icon: 'Mountain', color: 'bg-primary-50 text-primary' },
    { id: 'dancing', name: 'Dancing', icon: 'Music', color: 'bg-secondary-50 text-secondary' },
    { id: 'martial-arts', name: 'Martial Arts', icon: 'Shield', color: 'bg-accent-50 text-accent' },
    { id: 'tennis', name: 'Tennis', icon: 'Circle', color: 'bg-success-50 text-success' },
    { id: 'basketball', name: 'Basketball', icon: 'Target', color: 'bg-warning-50 text-warning' },
    { id: 'pilates', name: 'Pilates', icon: 'Sparkles', color: 'bg-primary-50 text-primary' },
    { id: 'crossfit', name: 'CrossFit', icon: 'Flame', color: 'bg-secondary-50 text-secondary' }
  ];

  const fitnessLevels = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting my fitness journey' },
    { id: 'intermediate', name: 'Intermediate', description: 'Regular exercise routine' },
    { id: 'advanced', name: 'Advanced', description: 'Experienced and dedicated' }
  ];

  const handleActivityToggle = (activityId) => {
    const currentActivities = formData.fitnessActivities || [];
    const updatedActivities = currentActivities.includes(activityId)
      ? currentActivities.filter(id => id !== activityId)
      : [...currentActivities, activityId];
    
    onUpdate({ fitnessActivities: updatedActivities });
  };

  const handleLevelSelect = (level) => {
    onUpdate({ fitnessLevel: level });
  };

  const handleNext = () => {
    if ((formData.fitnessActivities?.length || 0) > 0 && formData.fitnessLevel) {
      onNext();
    }
  };

  const isActivitySelected = (activityId) => {
    return formData.fitnessActivities?.includes(activityId) || false;
  };

  const canProceed = (formData.fitnessActivities?.length || 0) > 0 && formData.fitnessLevel;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
          What activities interest you?
        </h3>
        <p className="font-body text-text-secondary">
          Select all that apply - we'll help you find like-minded neighbors
        </p>
      </div>

      {/* Fitness Activities */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Fitness Activities
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {fitnessActivities.map((activity) => (
            <button
              key={activity.id}
              onClick={() => handleActivityToggle(activity.id)}
              className={`p-4 rounded-xl border-2 transition-all text-center ${
                isActivitySelected(activity.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                isActivitySelected(activity.id) ? activity.color : 'bg-background-secondary text-text-tertiary'
              }`}>
                <Icon name={activity.icon} size={20} />
              </div>
              <span className="font-body font-medium text-sm">{activity.name}</span>
              {isActivitySelected(activity.id) && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-sm text-text-tertiary mt-2">
          Selected: {formData.fitnessActivities?.length || 0} activities
        </p>
      </div>

      {/* Fitness Level */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          What's your fitness level?
        </h4>
        <div className="space-y-3">
          {fitnessLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => handleLevelSelect(level.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                formData.fitnessLevel === level.id
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-body font-semibold">{level.name}</h5>
                  <p className="font-body text-sm opacity-80">{level.description}</p>
                </div>
                {formData.fitnessLevel === level.id && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue
        </Button>
      </div>

      {!canProceed && (
        <p className="text-sm text-warning text-center">
          Please select at least one activity and your fitness level to continue
        </p>
      )}
    </div>
  );
};

export default FitnessPreferencesStep;