import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LocationStep = ({ formData, updateFormData, errors }) => {
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleAddressChange = (e) => {
    updateFormData({ address: e.target.value });
  };

  const handleVenueNameChange = (e) => {
    updateFormData({ venueName: e.target.value });
  };

  const handleLocationNotesChange = (e) => {
    updateFormData({ locationNotes: e.target.value });
  };

  const handleGetCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Mock reverse geocoding
          const mockAddress = "123 Main Street, Your City, State 12345";
          updateFormData({ 
            address: mockAddress,
            latitude,
            longitude
          });
          setUseCurrentLocation(true);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  };

  const popularLocations = [
    { name: 'Central Park', address: '123 Park Ave, City, State' },
    { name: 'Community Center', address: '456 Community Dr, City, State' },
    { name: 'Riverside Trail', address: '789 River Rd, City, State' },
    { name: 'Local Gym', address: '321 Fitness St, City, State' }
  ];

  const handlePopularLocationSelect = (location) => {
    updateFormData({ 
      address: location.address,
      venueName: location.name
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Location Button */}
      <div className="bg-primary-50 rounded-lg p-4">
        <Button
          variant="primary"
          onClick={handleGetCurrentLocation}
          loading={isLoadingLocation}
          iconName="MapPin"
          iconPosition="left"
          className="w-full"
        >
          Use Current Location
        </Button>
        <p className="text-text-secondary text-sm mt-2 text-center">
          We'll help you find the exact address
        </p>
      </div>

      {/* Manual Address Input */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Address *
        </label>
        <Input
          type="text"
          placeholder="Enter street address, park name, or landmark"
          value={formData.address}
          onChange={handleAddressChange}
          className={errors.address ? 'border-error' : ''}
        />
        {errors.address && (
          <p className="text-error text-sm mt-1">{errors.address}</p>
        )}
      </div>

      {/* Venue Name */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Venue/Location Name
        </label>
        <Input
          type="text"
          placeholder="e.g., Central Park, Community Gym, Basketball Court"
          value={formData.venueName}
          onChange={handleVenueNameChange}
        />
        <p className="text-text-tertiary text-sm mt-1">
          Help participants identify the specific location
        </p>
      </div>

      {/* Location Notes */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Meeting Point Details
        </label>
        <textarea
          placeholder="e.g., Meet at the main entrance, near the fountain, parking available on Oak Street..."
          value={formData.locationNotes}
          onChange={handleLocationNotesChange}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none font-body text-text-primary placeholder-text-tertiary"
        />
      </div>

      {/* Popular Locations */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Popular Locations
        </label>
        <div className="grid gap-2">
          {popularLocations.map((location, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handlePopularLocationSelect(location)}
              className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-border-secondary hover:bg-background-secondary transition-smooth text-left"
            >
              <div>
                <p className="font-body font-medium text-text-primary">
                  {location.name}
                </p>
                <p className="font-body text-sm text-text-secondary">
                  {location.address}
                </p>
              </div>
              <Icon name="ChevronRight" size={16} color="var(--color-text-tertiary)" />
            </button>
          ))}
        </div>
      </div>

      {/* Map Preview */}
      {formData.address && (
        <div className="bg-background-secondary rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Map" size={20} color="var(--color-primary)" />
            <span className="font-body font-medium text-text-primary">
              Location Preview
            </span>
          </div>
          <div className="w-full h-48 bg-background-tertiary rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Icon name="MapPin" size={32} color="var(--color-text-tertiary)" />
              <p className="font-body text-text-secondary mt-2">
                Map preview will appear here
              </p>
              <p className="font-body text-sm text-text-tertiary">
                {formData.address}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStep;