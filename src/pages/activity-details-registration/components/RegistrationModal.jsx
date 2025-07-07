import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const RegistrationModal = ({ 
  isOpen, 
  onClose, 
  activity, 
  onConfirm,
  isProcessing 
}) => {
  const [formData, setFormData] = useState({
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: '',
    fitnessLevel: 'intermediate',
    specialRequests: '',
    agreeToTerms: false,
    agreeToWaiver: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'Emergency contact is required';
    }
    
    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency phone number is required';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    if (!formData.agreeToWaiver) {
      newErrors.agreeToWaiver = 'You must sign the liability waiver';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onConfirm(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative h-full flex items-end lg:items-center justify-center p-4">
        <div className="bg-surface rounded-t-2xl lg:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-elevation-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="font-heading font-semibold text-xl text-text-primary">
                Complete Registration
              </h2>
              <p className="font-body text-sm text-text-secondary mt-1">
                {activity.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-140px)]">
            <div className="p-6 space-y-6">
              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="font-heading font-medium text-text-primary">
                  Emergency Contact Information
                </h3>
                
                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Emergency Contact Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="Full name of emergency contact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    className={errors.emergencyContact ? 'border-error' : ''}
                  />
                  {errors.emergencyContact && (
                    <p className="mt-1 text-sm text-error">{errors.emergencyContact}</p>
                  )}
                </div>
                
                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Emergency Contact Phone *
                  </label>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.emergencyPhone}
                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                    className={errors.emergencyPhone ? 'border-error' : ''}
                  />
                  {errors.emergencyPhone && (
                    <p className="mt-1 text-sm text-error">{errors.emergencyPhone}</p>
                  )}
                </div>
              </div>

              {/* Medical Information */}
              <div className="space-y-4">
                <h3 className="font-heading font-medium text-text-primary">
                  Health & Fitness Information
                </h3>
                
                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Fitness Level
                  </label>
                  <select
                    value={formData.fitnessLevel}
                    onChange={(e) => handleInputChange('fitnessLevel', e.target.value)}
                    className="w-full p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                
                <div>
                  <label className="block font-body text-sm font-medium text-text-primary mb-2">
                    Medical Conditions or Injuries
                  </label>
                  <textarea
                    placeholder="Please list any medical conditions, injuries, or limitations we should know about (optional)"
                    value={formData.medicalConditions}
                    onChange={(e) => handleInputChange('medicalConditions', e.target.value)}
                    className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block font-body text-sm font-medium text-text-primary mb-2">
                  Special Requests or Questions
                </label>
                <textarea
                  placeholder="Any special accommodations or questions for the organizer? (optional)"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={3}
                />
              </div>

              {/* Payment Info */}
              {activity.price > 0 && (
                <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="CreditCard" size={20} color="var(--color-warning)" />
                    <div>
                      <h4 className="font-body font-medium text-warning-700">
                        Payment Required
                      </h4>
                      <p className="font-body text-sm text-warning-600 mt-1">
                        This activity costs ${activity.price}. You'll be redirected to secure payment after completing this form.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <h3 className="font-heading font-medium text-text-primary">
                  Terms & Conditions
                </h3>
                
                <div className="space-y-3">
                  <label className="flex items-start space-x-3">
                    <Input
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="font-body text-sm text-text-secondary">
                      I agree to the{' '}
                      <button type="button" className="text-accent hover:text-accent-700 underline">
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" className="text-accent hover:text-accent-700 underline">
                        Community Guidelines
                      </button>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-error ml-6">{errors.agreeToTerms}</p>
                  )}
                  
                  <label className="flex items-start space-x-3">
                    <Input
                      type="checkbox"
                      checked={formData.agreeToWaiver}
                      onChange={(e) => handleInputChange('agreeToWaiver', e.target.checked)}
                      className="mt-1"
                    />
                    <span className="font-body text-sm text-text-secondary">
                      I acknowledge the risks involved in physical activity and agree to the{' '}
                      <button type="button" className="text-accent hover:text-accent-700 underline">
                        Liability Waiver
                      </button>
                    </span>
                  </label>
                  {errors.agreeToWaiver && (
                    <p className="text-sm text-error ml-6">{errors.agreeToWaiver}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-border bg-background-secondary">
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isProcessing}
                  className="flex-1"
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  {activity.price > 0 ? `Pay $${activity.price} & Join` : 'Complete Registration'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;