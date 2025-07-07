import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContainer from '../../components/ui/AuthContainer';
import RegistrationProgress from './components/RegistrationProgress';
import SocialRegistration from './components/SocialRegistration';
import BasicInfoStep from './components/BasicInfoStep';
import FitnessPreferencesStep from './components/FitnessPreferencesStep';
import LocationStep from './components/LocationStep';
import AvailabilityStep from './components/AvailabilityStep';
import SuccessStep from './components/SuccessStep';

const UserRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    fitnessActivities: [],
    fitnessLevel: '',
    locationMethod: 'auto',
    location: null,
    zipCode: '',
    availableTimeSlots: [],
    availableDays: [],
    errors: {}
  });
  const [showSocialOptions, setShowSocialOptions] = useState(true);

  const totalSteps = 4;

  const updateFormData = (updates) => {
    setFormData(prev => ({
      ...prev,
      ...updates,
      errors: { ...prev.errors, ...updates.errors }
    }));
  };

  const handleSocialRegister = (socialData) => {
    updateFormData({
      firstName: socialData.firstName,
      lastName: socialData.lastName,
      email: socialData.email,
      provider: socialData.provider,
      isVerified: socialData.isVerified
    });
    setShowSocialOptions(false);
    setCurrentStep(2); // Skip basic info step for social registration
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Registration complete
      setCurrentStep(5); // Success step
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            errors={formData.errors}
          />
        );
      case 2:
        return (
          <FitnessPreferencesStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 3:
        return (
          <LocationStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 4:
        return (
          <AvailabilityStep
            formData={formData}
            onUpdate={updateFormData}
            onNext={handleNextStep}
            onBack={handlePrevStep}
          />
        );
      case 5:
        return <SuccessStep formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      {currentStep <= totalSteps ? (
        <AuthContainer
          title="Join NeighborFit"
          subtitle="Connect with your community through fitness"
          showBackButton={currentStep === 1}
        >
          {/* Progress Indicator */}
          <RegistrationProgress currentStep={currentStep} totalSteps={totalSteps} />

          {/* Social Registration - Only show on first step */}
          {currentStep === 1 && showSocialOptions && (
            <>
              <SocialRegistration onSocialRegister={handleSocialRegister} />
            </>
          )}

          {/* Current Step Content */}
          {renderCurrentStep()}

          {/* Footer Links - Only show on first step */}
          {currentStep === 1 && (
            <div className="mt-8 text-center">
              <p className="font-body text-text-secondary">
                Already have an account?{' '}
                <Link
                  to="/user-login"
                  className="text-accent hover:text-accent-700 font-medium transition-smooth"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          )}
        </AuthContainer>
      ) : (
        // Success Step - Full screen layout
        <div className="min-h-screen bg-gradient-to-br from-success-50 via-background to-primary-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-surface rounded-2xl shadow-elevation-3 p-8">
              <SuccessStep formData={formData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
