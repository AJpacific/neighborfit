import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-normal ${
                isCompleted
                  ? 'bg-success border-success text-white'
                  : isActive
                  ? 'bg-primary border-primary text-white' :'bg-surface border-border text-text-tertiary'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} color="white" strokeWidth={2.5} />
                ) : (
                  <span className="font-caption font-medium text-sm">{stepNumber}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          {steps[currentStep - 1]?.title}
        </h3>
        <p className="font-body text-sm text-text-secondary mt-1">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default StepIndicator;