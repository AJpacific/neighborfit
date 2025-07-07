import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const DetailsStep = ({ formData, updateFormData, errors }) => {
  const handleMaxParticipantsChange = (e) => {
    const value = parseInt(e.target.value) || '';
    updateFormData({ maxParticipants: value });
  };

  const handleSkillLevelChange = (e) => {
    updateFormData({ skillLevel: e.target.value });
  };

  const handleCostChange = (e) => {
    const value = parseFloat(e.target.value) || '';
    updateFormData({ cost: value });
  };

  const handleEquipmentChange = (e) => {
    updateFormData({ equipment: e.target.value });
  };

  const handlePrivacyChange = (e) => {
    updateFormData({ privacy: e.target.value });
  };

  const handleWeatherPolicyChange = (e) => {
    updateFormData({ weatherPolicy: e.target.value });
  };

  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: 'New to this activity' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience required' },
    { value: 'advanced', label: 'Advanced', description: 'High skill level expected' },
    { value: 'all', label: 'All Levels', description: 'Everyone welcome' }
  ];

  const privacyOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can find and join' },
    { value: 'friends', label: 'Friends Only', description: 'Only your connections can see' },
    { value: 'invite', label: 'Invite Only', description: 'You control who can join' }
  ];

  const weatherPolicies = [
    { value: 'rain-or-shine', label: 'Rain or Shine', description: 'Activity happens regardless' },
    { value: 'weather-dependent', label: 'Weather Dependent', description: 'May cancel for bad weather' },
    { value: 'indoor-backup', label: 'Indoor Backup', description: 'Move indoors if needed' }
  ];

  return (
    <div className="space-y-6">
      {/* Participant Limit */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Maximum Participants *
        </label>
        <Input
          type="number"
          placeholder="8"
          value={formData.maxParticipants}
          onChange={handleMaxParticipantsChange}
          min="2"
          max="50"
          className={errors.maxParticipants ? 'border-error' : ''}
        />
        {errors.maxParticipants && (
          <p className="text-error text-sm mt-1">{errors.maxParticipants}</p>
        )}
        <p className="text-text-tertiary text-sm mt-1">
          Recommended: 4-12 participants for most activities
        </p>
      </div>

      {/* Skill Level */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Skill Level Required *
        </label>
        <div className="space-y-2">
          {skillLevels.map((level) => (
            <label key={level.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-background-secondary transition-smooth cursor-pointer">
              <input
                type="radio"
                name="skillLevel"
                value={level.value}
                checked={formData.skillLevel === level.value}
                onChange={handleSkillLevelChange}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="font-body font-medium text-text-primary">
                  {level.label}
                </p>
                <p className="font-body text-sm text-text-secondary">
                  {level.description}
                </p>
              </div>
            </label>
          ))}
        </div>
        {errors.skillLevel && (
          <p className="text-error text-sm mt-1">{errors.skillLevel}</p>
        )}
      </div>

      {/* Cost */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Cost per Person (USD)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-text-secondary">$</span>
          </div>
          <Input
            type="number"
            placeholder="0.00"
            value={formData.cost}
            onChange={handleCostChange}
            min="0"
            step="0.01"
            className="pl-8"
          />
        </div>
        <p className="text-text-tertiary text-sm mt-1">
          Leave blank or enter 0 for free activities
        </p>
      </div>

      {/* Equipment */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Equipment Needed
        </label>
        <textarea
          placeholder="e.g., Bring your own yoga mat, water bottle recommended, tennis racket required..."
          value={formData.equipment}
          onChange={handleEquipmentChange}
          rows={3}
          className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none font-body text-text-primary placeholder-text-tertiary"
        />
      </div>

      {/* Privacy Settings */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Privacy Setting *
        </label>
        <div className="space-y-2">
          {privacyOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-background-secondary transition-smooth cursor-pointer">
              <input
                type="radio"
                name="privacy"
                value={option.value}
                checked={formData.privacy === option.value}
                onChange={handlePrivacyChange}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={option.value === 'public' ? 'Globe' : option.value === 'friends' ? 'Users' : 'Lock'} 
                    size={16} 
                    color="var(--color-text-secondary)" 
                  />
                  <p className="font-body font-medium text-text-primary">
                    {option.label}
                  </p>
                </div>
                <p className="font-body text-sm text-text-secondary ml-6">
                  {option.description}
                </p>
              </div>
            </label>
          ))}
        </div>
        {errors.privacy && (
          <p className="text-error text-sm mt-1">{errors.privacy}</p>
        )}
      </div>

      {/* Weather Policy */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Weather Policy
        </label>
        <div className="space-y-2">
          {weatherPolicies.map((policy) => (
            <label key={policy.value} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-background-secondary transition-smooth cursor-pointer">
              <input
                type="radio"
                name="weatherPolicy"
                value={policy.value}
                checked={formData.weatherPolicy === policy.value}
                onChange={handleWeatherPolicyChange}
                className="w-4 h-4 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={policy.value === 'rain-or-shine' ? 'Sun' : policy.value === 'weather-dependent' ? 'Cloud' : 'Home'} 
                    size={16} 
                    color="var(--color-text-secondary)" 
                  />
                  <p className="font-body font-medium text-text-primary">
                    {policy.label}
                  </p>
                </div>
                <p className="font-body text-sm text-text-secondary ml-6">
                  {policy.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsStep;