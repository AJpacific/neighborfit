import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StepIndicator from './components/StepIndicator';
import BasicDetailsStep from './components/BasicDetailsStep';
import SchedulingStep from './components/SchedulingStep';
import LocationStep from './components/LocationStep';
import DetailsStep from './components/DetailsStep';
import ActivityPreview from './components/ActivityPreview';

const CreateActivity = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    // Basic Details
    activityType: '',
    customActivityType: '',
    title: '',
    description: '',
    
    // Scheduling
    date: '',
    time: '',
    duration: '',
    isRecurring: false,
    recurrenceType: 'weekly',
    
    // Location
    address: '',
    venueName: '',
    locationNotes: '',
    latitude: null,
    longitude: null,
    
    // Details
    maxParticipants: '',
    skillLevel: 'all',
    cost: '',
    equipment: '',
    privacy: 'public',
    weatherPolicy: 'weather-dependent'
  });

  const steps = [
    { id: 1, title: 'Basic Details', component: BasicDetailsStep },
    { id: 2, title: 'Schedule', component: SchedulingStep },
    { id: 3, title: 'Location', component: LocationStep },
    { id: 4, title: 'Details', component: DetailsStep }
  ];

  useEffect(() => {
    // Auto-save draft to localStorage
    const draftKey = 'neighborfit_activity_draft';
    const savedDraft = localStorage.getItem(draftKey);
    
    if (savedDraft && Object.keys(formData).every(key => !formData[key] || formData[key] === '' || formData[key] === false)) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Save draft whenever formData changes
    const draftKey = 'neighborfit_activity_draft';
    localStorage.setItem(draftKey, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (updates) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors when field is updated
    const updatedFields = Object.keys(updates);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedFields.forEach(field => {
        delete newErrors[field];
      });
      return newErrors;
    });
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.activityType) {
          newErrors.activityType = 'Please select an activity type';
        }
        if (formData.activityType === 'Other' && !formData.customActivityType) {
          newErrors.customActivityType = 'Please specify your activity type';
        }
        if (!formData.title.trim()) {
          newErrors.title = 'Activity title is required';
        } else if (formData.title.length < 5) {
          newErrors.title = 'Title must be at least 5 characters';
        }
        break;

      case 2:
        if (!formData.date) {
          newErrors.date = 'Please select a date';
        } else {
          const selectedDate = new Date(formData.date);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate <= today) {
            newErrors.date = 'Please select a future date';
          }
        }
        if (!formData.time) {
          newErrors.time = 'Please select a time';
        }
        if (!formData.duration) {
          newErrors.duration = 'Please specify duration';
        } else if (formData.duration < 15 || formData.duration > 480) {
          newErrors.duration = 'Duration must be between 15 and 480 minutes';
        }
        break;

      case 3:
        if (!formData.address.trim()) {
          newErrors.address = 'Please provide an address or location';
        }
        break;

      case 4:
        if (!formData.maxParticipants) {
          newErrors.maxParticipants = 'Please specify maximum participants';
        } else if (formData.maxParticipants < 2 || formData.maxParticipants > 50) {
          newErrors.maxParticipants = 'Participants must be between 2 and 50';
        }
        if (!formData.skillLevel) {
          newErrors.skillLevel = 'Please select a skill level';
        }
        if (!formData.privacy) {
          newErrors.privacy = 'Please select privacy setting';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length) {
        setCurrentStep(currentStep + 1);
      } else {
        setShowPreview(true);
      }
    }
  };

  const handlePrevious = () => {
    if (showPreview) {
      setShowPreview(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Your progress will be saved as a draft.')) {
      navigate('/community-dashboard');
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('neighborfit_activity_draft');
      
      // Navigate to success page or activity details
      navigate('/community-dashboard', { 
        state: { 
          message: 'Activity created successfully!',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error creating activity:', error);
      setIsSubmitting(false);
    }
  };

  const getCurrentStepComponent = () => {
    const StepComponent = steps[currentStep - 1]?.component;
    if (!StepComponent) return null;
    
    return (
      <StepComponent
        formData={formData}
        updateFormData={updateFormData}
        errors={errors}
      />
    );
  };

  const isFormComplete = () => {
    return formData.activityType && 
           formData.title && 
           formData.date && 
           formData.time && 
           formData.duration && 
           formData.address && 
           formData.maxParticipants && 
           formData.skillLevel && 
           formData.privacy;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 pb-20 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Mobile Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="X" size={20} />
              <span className="font-body">Cancel</span>
            </button>
            
            <h1 className="font-heading font-bold text-xl text-text-primary">
              Create Activity
            </h1>
            
            <div className="w-16" /> {/* Spacer */}
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading font-bold text-3xl text-text-primary mb-2">
                Create New Activity
              </h1>
              <p className="font-body text-text-secondary">
                Organize a fitness activity and connect with your community
              </p>
            </div>
            
            <Button
              variant="ghost"
              onClick={handleCancel}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {!showPreview ? (
                <>
                  {/* Step Indicator */}
                  <StepIndicator
                    currentStep={currentStep}
                    totalSteps={steps.length}
                    steps={steps}
                  />

                  {/* Form Content */}
                  <div className="bg-surface rounded-xl border border-border shadow-elevation-1 p-6">
                    {getCurrentStepComponent()}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      disabled={currentStep === 1}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>

                    <div className="flex items-center space-x-3">
                      {/* Save Draft Button */}
                      <Button
                        variant="outline"
                        iconName="Save"
                        iconPosition="left"
                        onClick={() => {
                          // Draft is auto-saved, just show confirmation
                          alert('Draft saved successfully!');
                        }}
                      >
                        Save Draft
                      </Button>

                      <Button
                        variant="primary"
                        onClick={handleNext}
                        iconName={currentStep === steps.length ? "Eye" : "ChevronRight"}
                        iconPosition="right"
                      >
                        {currentStep === steps.length ? 'Preview' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Preview Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="font-heading font-bold text-2xl text-text-primary">
                        Activity Preview
                      </h2>
                      <p className="font-body text-text-secondary">
                        Review your activity before publishing
                      </p>
                    </div>
                  </div>

                  {/* Preview Content */}
                  <ActivityPreview formData={formData} />

                  {/* Preview Navigation */}
                  <div className="flex items-center justify-between mt-6">
                    <Button
                      variant="ghost"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Back to Edit
                    </Button>

                    <Button
                      variant="primary"
                      onClick={handlePublish}
                      loading={isSubmitting}
                      disabled={!isFormComplete()}
                      iconName="Send"
                      iconPosition="left"
                    >
                      Publish Activity
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Desktop Preview Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
                    Live Preview
                  </h3>
                  <p className="font-body text-sm text-text-secondary">
                    See how your activity will appear to others
                  </p>
                </div>
                
                <ActivityPreview formData={formData} />
                
                {/* Progress Indicator */}
                <div className="mt-6 p-4 bg-background-secondary rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-body font-medium text-text-primary">
                      Completion
                    </span>
                    <span className="font-body text-sm text-text-secondary">
                      {Math.round((Object.values(formData).filter(value => 
                        value !== '' && value !== null && value !== false
                      ).length / Object.keys(formData).length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-background-tertiary rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-normal"
                      style={{
                        width: `${Math.round((Object.values(formData).filter(value => 
                          value !== '' && value !== null && value !== false
                        ).length / Object.keys(formData).length) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default CreateActivity;
