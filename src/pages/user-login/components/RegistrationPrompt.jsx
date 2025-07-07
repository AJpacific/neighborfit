import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationPrompt = () => {
  const communityFeatures = [
    {
      icon: 'Users',
      title: 'Find Workout Partners',
      description: 'Connect with neighbors who share your fitness goals'
    },
    {
      icon: 'MapPin',
      title: 'Discover Local Activities',
      description: 'Join fitness events happening right in your area'
    },
    {
      icon: 'Calendar',
      title: 'Schedule Together',
      description: 'Coordinate group workouts that fit everyone\'s schedule'
    },
    {
      icon: 'Trophy',
      title: 'Achieve Goals',
      description: 'Stay motivated with community challenges and support'
    }
  ];

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Icon name="Heart" size={28} color="white" />
        </div>
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
          Join the NeighborFit Community
        </h3>
        <p className="font-body text-text-secondary">
          Connect with local fitness enthusiasts and build lasting wellness relationships
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {communityFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <Icon name={feature.icon} size={16} color="var(--color-primary)" />
            </div>
            <div>
              <h4 className="font-body font-semibold text-sm text-text-primary mb-1">
                {feature.title}
              </h4>
              <p className="font-caption text-xs text-text-secondary">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center space-y-3">
        <Link to="/user-registration">
          <Button
            variant="primary"
            fullWidth
            iconName="UserPlus"
            iconPosition="left"
          >
            Create Free Account
          </Button>
        </Link>
        
        <p className="font-caption text-xs text-text-tertiary">
          Join thousands of neighbors already staying fit together
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 pt-4 border-t border-primary-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-heading font-bold text-lg text-primary">2.5K+</p>
            <p className="font-caption text-xs text-text-tertiary">Active Members</p>
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-secondary">150+</p>
            <p className="font-caption text-xs text-text-tertiary">Weekly Activities</p>
          </div>
          <div>
            <p className="font-heading font-bold text-lg text-accent">95%</p>
            <p className="font-caption text-xs text-text-tertiary">Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPrompt;