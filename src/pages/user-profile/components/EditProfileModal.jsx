import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    interests: profile?.interests || [],
    fitnessLevel: profile?.fitnessLevel || 'Beginner',
    goals: profile?.goals || [],
    availability: profile?.availability || {
      weekdays: [],
      weekends: [],
      timePreference: 'Morning'
    }
  });

  const [activeStep, setActiveStep] = useState(0);

  const fitnessLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const availableInterests = ['Yoga', 'Running', 'Hiking', 'Swimming', 'Cycling', 'Gym', 'Tennis', 'Basketball', 'Soccer', 'Dancing', 'Martial Arts', 'Boxing'];
  const availableGoals = ['Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'Strength', 'Balance', 'Stress Relief', 'Social Connection'];
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const weekends = ['Saturday', 'Sunday'];
  const timePreferences = ['Morning', 'Afternoon', 'Evening', 'Flexible'];

  const steps = [
    { title: 'Basic Info', icon: 'User' },
    { title: 'Interests', icon: 'Heart' },
    { title: 'Goals', icon: 'Target' },
    { title: 'Availability', icon: 'Clock' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayToggle = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleAvailabilityChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: type === 'timePreference' ? value : 
          prev.availability[type].includes(value)
            ? prev.availability[type].filter(item => item !== value)
            : [...prev.availability[type], value]
      }
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-heading font-bold text-xl text-text-primary">
            Edit Profile
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 ${
                  index === activeStep ? 'text-primary' : 
                  index < activeStep ? 'text-success' : 'text-text-tertiary'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === activeStep ? 'bg-primary text-white' :
                  index < activeStep ? 'bg-success text-white' : 'bg-background-secondary'
                }`}>
                  {index < activeStep ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step.icon} size={16} />
                  )}
                </div>
                <span className="font-medium text-sm hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeStep === 0 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full p-3 bg-background-secondary border border-border-secondary rounded-lg focus:outline-none focus:border-primary"
                  placeholder="Tell us about yourself..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Location
                </label>
                <Input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Fitness Level
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {fitnessLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => handleInputChange('fitnessLevel', level)}
                      className={`p-3 rounded-lg border transition-smooth ${
                        formData.fitnessLevel === level
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  Select your interests
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleArrayToggle('interests', interest)}
                      className={`p-3 rounded-lg border transition-smooth ${
                        formData.interests.includes(interest)
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  What are your fitness goals?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableGoals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => handleArrayToggle('goals', goal)}
                      className={`p-3 rounded-lg border transition-smooth text-left ${
                        formData.goals.includes(goal)
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  Available Weekdays
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {weekdays.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleAvailabilityChange('weekdays', day)}
                      className={`p-3 rounded-lg border transition-smooth ${
                        formData.availability.weekdays.includes(day)
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  Available Weekends
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {weekends.map((day) => (
                    <button
                      key={day}
                      onClick={() => handleAvailabilityChange('weekends', day)}
                      className={`p-3 rounded-lg border transition-smooth ${
                        formData.availability.weekends.includes(day)
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-4">
                  Preferred Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {timePreferences.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleAvailabilityChange('timePreference', time)}
                      className={`p-3 rounded-lg border transition-smooth ${
                        formData.availability.timePreference === time
                          ? 'border-primary bg-primary-50 text-primary' :'border-border-secondary hover:border-border'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-6">
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={activeStep === 0 ? onClose : handlePrevious}
              iconName={activeStep === 0 ? "X" : "ChevronLeft"}
            >
              {activeStep === 0 ? "Cancel" : "Previous"}
            </Button>
            
            <Button
              variant="primary"
              onClick={activeStep === steps.length - 1 ? handleSave : handleNext}
              iconName={activeStep === steps.length - 1 ? "Check" : "ChevronRight"}
              iconPosition={activeStep === steps.length - 1 ? "left" : "right"}
            >
              {activeStep === steps.length - 1 ? "Save Changes" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;