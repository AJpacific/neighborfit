import React from 'react';
import Icon from '../../../components/AppIcon';

const SafetyInfo = ({ activity }) => {
  const safetyFeatures = [
    {
      icon: 'Shield',
      title: 'Verified Organizer',
      description: 'Background checked and community verified',
      color: 'text-success'
    },
    {
      icon: 'MapPin',
      title: 'Public Location',
      description: 'Activity takes place in a public, well-lit area',
      color: 'text-primary'
    },
    {
      icon: 'Users',
      title: 'Group Activity',
      description: 'Multiple participants for added safety',
      color: 'text-accent'
    },
    {
      icon: 'Phone',
      title: 'Emergency Contacts',
      description: 'Required for all participants',
      color: 'text-warning'
    }
  ];

  const emergencyInfo = {
    organizer: {
      name: activity.organizer.name,
      phone: '+1 (555) 123-4567'
    },
    local: {
      police: '911',
      medical: '911',
      nonEmergency: '311'
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} color="var(--color-success)" />
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Safety Information
        </h3>
      </div>

      {/* Safety Features */}
      <div className="space-y-4 mb-6">
        {safetyFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-background-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature.icon} size={16} className={feature.color} />
            </div>
            <div>
              <h4 className="font-body font-medium text-text-primary">
                {feature.title}
              </h4>
              <p className="font-body text-sm text-text-secondary">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Safety Guidelines */}
      <div className="mb-6">
        <h4 className="font-body font-medium text-text-primary mb-3">
          Safety Guidelines
        </h4>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={14} color="var(--color-success)" className="mt-1 flex-shrink-0" />
            <span className="font-body text-sm text-text-secondary">
              Arrive on time and check in with the organizer
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={14} color="var(--color-success)" className="mt-1 flex-shrink-0" />
            <span className="font-body text-sm text-text-secondary">
              Inform someone of your plans and expected return time
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={14} color="var(--color-success)" className="mt-1 flex-shrink-0" />
            <span className="font-body text-sm text-text-secondary">
              Bring water and any necessary personal items
            </span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="Check" size={14} color="var(--color-success)" className="mt-1 flex-shrink-0" />
            <span className="font-body text-sm text-text-secondary">
              Follow all safety instructions from the organizer
            </span>
          </li>
        </ul>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-error-50 border border-error-200 rounded-lg p-4">
        <h4 className="font-body font-medium text-error-700 mb-3 flex items-center space-x-2">
          <Icon name="Phone" size={16} />
          <span>Emergency Contacts</span>
        </h4>
        
        <div className="space-y-3">
          <div>
            <p className="font-body text-sm font-medium text-error-700">
              Organizer: {emergencyInfo.organizer.name}
            </p>
            <p className="font-body text-sm text-error-600">
              {emergencyInfo.organizer.phone}
            </p>
          </div>
          
          <div className="border-t border-error-200 pt-3">
            <p className="font-body text-sm font-medium text-error-700 mb-2">
              Emergency Services:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-body font-medium text-error-700">Police/Medical:</span>
                <span className="font-body text-error-600 ml-2">911</span>
              </div>
              <div>
                <span className="font-body font-medium text-error-700">Non-Emergency:</span>
                <span className="font-body text-error-600 ml-2">311</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Issues */}
      <div className="mt-4 pt-4 border-t border-border">
        <button className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth">
          <Icon name="Flag" size={16} />
          <span className="font-body text-sm">Report safety concerns</span>
        </button>
      </div>
    </div>
  );
};

export default SafetyInfo;