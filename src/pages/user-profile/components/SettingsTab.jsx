import React, { useState } from 'react';

import Button from '../../../components/ui/Button';


const SettingsTab = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onSave(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData(settings);
    setHasChanges(false);
  };

  const handleAccountDeletion = () => {
    // Handle account deletion
    console.log('Account deletion requested');
  };

  const handleDataExport = () => {
    // Handle data export
    console.log('Data export requested');
  };

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Privacy Settings
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Profile Visibility
            </label>
            <select
              value={formData?.privacy?.profileVisibility || 'public'}
              onChange={(e) => handleChange('privacy', 'profileVisibility', e.target.value)}
              className="w-full bg-background-secondary border border-border-secondary rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            >
              <option value="public">Public - Everyone can see my profile</option>
              <option value="community">Community Only - Only NeighborFit members</option>
              <option value="connections">Connections Only - Only my connections</option>
              <option value="private">Private - Only me</option>
            </select>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-text-primary">Show Email</label>
                <p className="text-sm text-text-tertiary">Allow others to see your email address</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData?.privacy?.showEmail || false}
                  onChange={(e) => handleChange('privacy', 'showEmail', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-text-primary">Show Phone</label>
                <p className="text-sm text-text-tertiary">Allow others to see your phone number</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData?.privacy?.showPhone || false}
                  onChange={(e) => handleChange('privacy', 'showPhone', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-text-primary">Show Location</label>
                <p className="text-sm text-text-tertiary">Allow others to see your location</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData?.privacy?.showLocation || false}
                  onChange={(e) => handleChange('privacy', 'showLocation', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Notification Settings
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-text-primary">Activity Invites</label>
              <p className="text-sm text-text-tertiary">Get notified when someone invites you to an activity</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData?.notifications?.activityInvites || false}
                onChange={(e) => handleChange('notifications', 'activityInvites', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-text-primary">Messages</label>
              <p className="text-sm text-text-tertiary">Get notified when you receive new messages</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData?.notifications?.messages || false}
                onChange={(e) => handleChange('notifications', 'messages', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-text-primary">Weekly Digest</label>
              <p className="text-sm text-text-tertiary">Get a weekly summary of community activities</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData?.notifications?.weeklyDigest || false}
                onChange={(e) => handleChange('notifications', 'weeklyDigest', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-text-primary">Promotions</label>
              <p className="text-sm text-text-tertiary">Get notified about special offers and promotions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData?.notifications?.promotions || false}
                onChange={(e) => handleChange('notifications', 'promotions', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-background-secondary rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
          </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          App Preferences
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Language
            </label>
            <select
              value={formData?.preferences?.language || 'en'}
              onChange={(e) => handleChange('preferences', 'language', e.target.value)}
              className="w-full bg-background-secondary border border-border-secondary rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Timezone
            </label>
            <select
              value={formData?.preferences?.timezone || 'America/Los_Angeles'}
              onChange={(e) => handleChange('preferences', 'timezone', e.target.value)}
              className="w-full bg-background-secondary border border-border-secondary rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            >
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/New_York">Eastern Time</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Units
            </label>
            <select
              value={formData?.preferences?.units || 'metric'}
              onChange={(e) => handleChange('preferences', 'units', e.target.value)}
              className="w-full bg-background-secondary border border-border-secondary rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
            >
              <option value="metric">Metric (km, kg)</option>
              <option value="imperial">Imperial (miles, lbs)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-6">
        <h3 className="font-heading font-bold text-lg text-text-primary mb-4">
          Account Management
        </h3>
        
        <div className="space-y-4">
          <Button
            variant="outline"
            onClick={handleDataExport}
            className="w-full justify-start"
            iconName="Download"
          >
            Export My Data
          </Button>
          
          <Button
            variant="outline"
            onClick={handleAccountDeletion}
            className="w-full justify-start text-error border-error hover:bg-error-50"
            iconName="Trash2"
          >
            Delete Account
          </Button>
        </div>
      </div>

      {/* Save Changes */}
      {hasChanges && (
        <div className="bg-surface rounded-lg shadow-elevation-1 p-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">You have unsaved changes</span>
            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsTab;