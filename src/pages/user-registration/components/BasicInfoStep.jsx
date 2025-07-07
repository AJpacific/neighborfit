import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ formData, onUpdate, onNext, errors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  const validateStep = () => {
    const stepErrors = {};
    
    if (!formData.firstName?.trim()) {
      stepErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName?.trim()) {
      stepErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email?.trim()) {
      stepErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password?.trim()) {
      stepErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      stepErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword?.trim()) {
      stepErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      stepErrors.confirmPassword = 'Passwords do not match';
    }

    return stepErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep();
    if (Object.keys(stepErrors).length === 0) {
      onNext();
    } else {
      onUpdate({ errors: stepErrors });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
          Let's get started!
        </h3>
        <p className="font-body text-text-secondary">
          Tell us a bit about yourself to create your NeighborFit profile
        </p>
      </div>

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              placeholder="First Name"
              value={formData.firstName || ''}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors?.firstName ? 'border-error' : ''}
            />
            {errors?.firstName && (
              <p className="mt-1 text-sm text-error font-body">{errors.firstName}</p>
            )}
          </div>
          <div>
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lastName || ''}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors?.lastName ? 'border-error' : ''}
            />
            {errors?.lastName && (
              <p className="mt-1 text-sm text-error font-body">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder="Email Address"
            value={formData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={errors?.email ? 'border-error' : ''}
          />
          {errors?.email && (
            <p className="mt-1 text-sm text-error font-body">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password (min. 8 characters)"
            value={formData.password || ''}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={errors?.password ? 'border-error' : ''}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          {errors?.password && (
            <p className="mt-1 text-sm text-error font-body">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={formData.confirmPassword || ''}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className={errors?.confirmPassword ? 'border-error' : ''}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-smooth"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
          {errors?.confirmPassword && (
            <p className="mt-1 text-sm text-error font-body">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-background-secondary rounded-lg p-4">
        <h4 className="font-body font-medium text-sm text-text-primary mb-2">
          Password Requirements:
        </h4>
        <ul className="space-y-1">
          <li className={`flex items-center space-x-2 text-sm ${
            formData.password?.length >= 8 ? 'text-success' : 'text-text-tertiary'
          }`}>
            <Icon 
              name={formData.password?.length >= 8 ? 'Check' : 'Circle'} 
              size={14} 
              strokeWidth={2.5}
            />
            <span>At least 8 characters</span>
          </li>
          <li className={`flex items-center space-x-2 text-sm ${
            formData.password && formData.confirmPassword && formData.password === formData.confirmPassword 
              ? 'text-success' : 'text-text-tertiary'
          }`}>
            <Icon 
              name={formData.password && formData.confirmPassword && formData.password === formData.confirmPassword ? 'Check' : 'Circle'} 
              size={14} 
              strokeWidth={2.5}
            />
            <span>Passwords match</span>
          </li>
        </ul>
      </div>

      {/* Next Button */}
      <Button
        variant="primary"
        onClick={handleNext}
        className="w-full"
        iconName="ArrowRight"
        iconPosition="right"
      >
        Continue
      </Button>
    </div>
  );
};

export default BasicInfoStep;