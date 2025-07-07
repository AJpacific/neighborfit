import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ formData, onUpdate, onNext, onBack }) => {
  const [locationMethod, setLocationMethod] = useState(formData.locationMethod || 'auto');
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleLocationMethodChange = (method) => {
    setLocationMethod(method);
    onUpdate({ locationMethod: method });
    setLocationError('');
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Simulate reverse geocoding to get city/state
        const mockLocation = {
          latitude,
          longitude,
          city: 'San Francisco',
          state: 'CA',
          zipCode: '94102'
        };
        
        onUpdate({ 
          location: mockLocation,
          locationPermissionGranted: true 
        });
        setIsGettingLocation(false);
      },
      (error) => {
        let errorMessage = 'Unable to get your location';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleZipCodeChange = (zipCode) => {
    onUpdate({ 
      zipCode,
      location: zipCode.length === 5 ? {
        zipCode,
        city: 'Sample City',
        state: 'CA'
      } : null
    });
  };

  const handleNext = () => {
    if (locationMethod === 'auto' && formData.location) {
      onNext();
    } else if (locationMethod === 'manual' && formData.zipCode?.length === 5) {
      onNext();
    }
  };

  const canProceed = 
    (locationMethod === 'auto' && formData.location) ||
    (locationMethod === 'manual' && formData.zipCode?.length === 5);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
          Where are you located?
        </h3>
        <p className="font-body text-text-secondary">
          We'll help you find fitness activities and neighbors in your area
        </p>
      </div>

      {/* Location Method Selection */}
      <div className="space-y-4">
        <h4 className="font-heading font-semibold text-text-primary">
          How would you like to share your location?
        </h4>

        {/* Auto Location Option */}
        <button
          onClick={() => handleLocationMethodChange('auto')}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            locationMethod === 'auto' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mt-1 ${
              locationMethod === 'auto' ? 'bg-primary text-primary-foreground' : 'bg-background-secondary text-text-tertiary'
            }`}>
              <Icon name="MapPin" size={18} />
            </div>
            <div className="flex-1">
              <h5 className="font-body font-semibold mb-1">Use my current location</h5>
              <p className="font-body text-sm opacity-80">
                Get precise location for better activity recommendations
              </p>
            </div>
            {locationMethod === 'auto' && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" strokeWidth={3} />
              </div>
            )}
          </div>
        </button>

        {/* Manual Location Option */}
        <button
          onClick={() => handleLocationMethodChange('manual')}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
            locationMethod === 'manual' ?'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mt-1 ${
              locationMethod === 'manual' ? 'bg-primary text-primary-foreground' : 'bg-background-secondary text-text-tertiary'
            }`}>
              <Icon name="Edit3" size={18} />
            </div>
            <div className="flex-1">
              <h5 className="font-body font-semibold mb-1">Enter ZIP code manually</h5>
              <p className="font-body text-sm opacity-80">
                Share your general area without precise location
              </p>
            </div>
            {locationMethod === 'manual' && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" strokeWidth={3} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Location Input Based on Method */}
      {locationMethod === 'auto' && (
        <div className="space-y-4">
          {!formData.location && (
            <div className="bg-background-secondary rounded-xl p-6 text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="MapPin" size={24} color="var(--color-primary)" />
              </div>
              <h5 className="font-body font-semibold text-text-primary mb-2">
                Location Access
              </h5>
              <p className="font-body text-sm text-text-secondary mb-4">
                We'll only use your location to show nearby activities and won't share it with other users without your permission.
              </p>
              <Button
                variant="primary"
                onClick={getCurrentLocation}
                loading={isGettingLocation}
                iconName="MapPin"
                iconPosition="left"
                className="w-full"
              >
                {isGettingLocation ? 'Getting Location...' : 'Allow Location Access'}
              </Button>
            </div>
          )}

          {formData.location && (
            <div className="bg-success-50 rounded-xl p-4 border border-success-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="Check" size={18} color="white" strokeWidth={3} />
                </div>
                <div>
                  <h5 className="font-body font-semibold text-success-700">Location Found</h5>
                  <p className="font-body text-sm text-success-600">
                    {formData.location.city}, {formData.location.state} {formData.location.zipCode}
                  </p>
                </div>
              </div>
            </div>
          )}

          {locationError && (
            <div className="bg-error-50 rounded-xl p-4 border border-error-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-error rounded-lg flex items-center justify-center">
                  <Icon name="AlertCircle" size={18} color="white" />
                </div>
                <div>
                  <h5 className="font-body font-semibold text-error-700">Location Error</h5>
                  <p className="font-body text-sm text-error-600 mb-3">{locationError}</p>
                  <Button
                    variant="outline"
                    onClick={() => handleLocationMethodChange('manual')}
                    size="sm"
                  >
                    Enter ZIP code instead
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {locationMethod === 'manual' && (
        <div className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Enter your ZIP code"
              value={formData.zipCode || ''}
              onChange={(e) => handleZipCodeChange(e.target.value)}
              maxLength={5}
              pattern="[0-9]{5}"
            />
            <p className="mt-2 text-sm text-text-tertiary">
              We'll use your ZIP code to find activities in your area
            </p>
          </div>

          {formData.zipCode?.length === 5 && (
            <div className="bg-success-50 rounded-xl p-4 border border-success-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <Icon name="Check" size={18} color="white" strokeWidth={3} />
                </div>
                <div>
                  <h5 className="font-body font-semibold text-success-700">ZIP Code Valid</h5>
                  <p className="font-body text-sm text-success-600">
                    {formData.location?.city}, {formData.location?.state} {formData.zipCode}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Privacy Notice */}
      <div className="bg-accent-50 rounded-xl p-4 border border-accent-200">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={16} color="white" />
          </div>
          <div>
            <h5 className="font-body font-semibold text-accent-700 mb-1">Privacy Protected</h5>
            <p className="font-body text-sm text-accent-600">
              Your exact location is never shared with other users. We only show your general area and let you control what information is visible in your profile.
            </p>
          </div>
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
          Please {locationMethod === 'auto' ? 'allow location access' : 'enter a valid ZIP code'} to continue
        </p>
      )}
    </div>
  );
};

export default LocationStep;