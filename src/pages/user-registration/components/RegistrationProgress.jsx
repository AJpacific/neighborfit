import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationProgress = ({ currentStep, totalSteps }) => {
  const steps = [
    { number: 1, title: 'Basic Info', icon: 'User' },
    { number: 2, title: 'Fitness Preferences', icon: 'Activity' },
    { number: 3, title: 'Location', icon: 'MapPin' },
    { number: 4, title: 'Availability', icon: 'Calendar' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading font-semibold text-lg text-text-primary">
          Step {currentStep} of {totalSteps}
        </h2>
        <span className="font-caption text-sm text-text-secondary">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-background-tertiary rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Step Indicators - Desktop */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center space-x-3 ${
              step.number <= currentStep ? 'text-primary' : 'text-text-tertiary'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                step.number <= currentStep 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-background-tertiary text-text-tertiary'
              }`}>
                {step.number < currentStep ? (
                  <Icon name="Check" size={16} strokeWidth={3} />
                ) : (
                  <Icon name={step.icon} size={16} />
                )}
              </div>
              <span className="font-body font-medium text-sm">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                step.number < currentStep ? 'bg-primary' : 'bg-background-tertiary'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Indicators - Mobile */}
      <div className="md:hidden flex items-center justify-center space-x-2">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`w-2 h-2 rounded-full transition-all ${
              step.number <= currentStep ? 'bg-primary' : 'bg-background-tertiary'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default RegistrationProgress;