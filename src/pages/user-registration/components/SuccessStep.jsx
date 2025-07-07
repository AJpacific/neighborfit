import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStep = ({ formData }) => {
  const profileCompletionItems = [
    { label: 'Basic Information', completed: true },
    { label: 'Fitness Preferences', completed: true },
    { label: 'Location', completed: true },
    { label: 'Availability', completed: true },
    { label: 'Profile Photo', completed: false },
    { label: 'Bio & Goals', completed: false }
  ];

  const completedItems = profileCompletionItems.filter(item => item.completed).length;
  const completionPercentage = Math.round((completedItems / profileCompletionItems.length) * 100);

  const nextSteps = [
    {
      title: 'Explore Activities',
      description: 'Browse local fitness activities in your area',
      icon: 'Search',
      action: 'Browse Now',
      link: '/activity-search-discovery'
    },
    {
      title: 'Join the Community',
      description: 'Connect with neighbors and fitness enthusiasts',
      icon: 'Users',
      action: 'View Dashboard',
      link: '/community-dashboard'
    },
    {
      title: 'Create an Activity',
      description: 'Organize your own fitness event',
      icon: 'Plus',
      action: 'Create Activity',
      link: '/create-activity'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Success Header */}
      <div className="text-center">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="Check" size={32} color="white" strokeWidth={3} />
        </div>
        <h3 className="font-heading font-bold text-2xl text-text-primary mb-2">
          Welcome to NeighborFit!
        </h3>
        <p className="font-body text-text-secondary">
          Your account has been created successfully. You're now part of our fitness community.
        </p>
      </div>

      {/* User Welcome */}
      <div className="bg-primary-50 rounded-xl p-6 border border-primary-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="font-heading font-bold text-xl text-primary-foreground">
              {formData.firstName?.[0]}{formData.lastName?.[0]}
            </span>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-primary-700">
              Hi {formData.firstName}!
            </h4>
            <p className="font-body text-sm text-primary-600">
              Ready to start your fitness journey with neighbors?
            </p>
          </div>
        </div>
      </div>

      {/* Profile Completion */}
      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading font-semibold text-text-primary">
            Profile Completion
          </h4>
          <span className="font-body font-semibold text-primary">
            {completionPercentage}%
          </span>
        </div>
        
        <div className="w-full bg-background-tertiary rounded-full h-2 mb-4">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="space-y-2">
          {profileCompletionItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                item.completed ? 'bg-success' : 'bg-background-tertiary'
              }`}>
                {item.completed ? (
                  <Icon name="Check" size={12} color="white" strokeWidth={3} />
                ) : (
                  <div className="w-2 h-2 bg-text-tertiary rounded-full" />
                )}
              </div>
              <span className={`font-body text-sm ${
                item.completed ? 'text-text-primary' : 'text-text-tertiary'
              }`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          What would you like to do first?
        </h4>
        <div className="space-y-3">
          {nextSteps.map((step, index) => (
            <Link
              key={index}
              to={step.link}
              className="block p-4 bg-surface rounded-xl border border-border hover:border-primary-200 hover:bg-primary-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-background-secondary group-hover:bg-primary-100 rounded-lg flex items-center justify-center transition-all">
                    <Icon name={step.icon} size={18} className="text-text-tertiary group-hover:text-primary" />
                  </div>
                  <div>
                    <h5 className="font-body font-semibold text-text-primary group-hover:text-primary">
                      {step.title}
                    </h5>
                    <p className="font-body text-sm text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-text-tertiary group-hover:text-primary">
                  <span className="font-body text-sm font-medium">{step.action}</span>
                  <Icon name="ArrowRight" size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Preview */}
      <div className="bg-gradient-to-r from-secondary-50 to-accent-50 rounded-xl p-6 border border-secondary-200">
        <div className="text-center mb-4">
          <h4 className="font-heading font-semibold text-text-primary mb-2">
            Join 2,500+ Active Members
          </h4>
          <p className="font-body text-sm text-text-secondary">
            Connect with fitness enthusiasts in your neighborhood
          </p>
        </div>
        
        <div className="flex justify-center -space-x-2 mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Image
              key={i}
              src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
              alt={`Community member ${i}`}
              className="w-10 h-10 rounded-full border-2 border-surface"
            />
          ))}
          <div className="w-10 h-10 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
            <span className="font-caption text-xs font-bold text-primary-foreground">+2K</span>
          </div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="pt-4">
        <Link to="/community-dashboard">
          <Button
            variant="primary"
            className="w-full"
            iconName="Zap"
            iconPosition="left"
          >
            Start Exploring NeighborFit
          </Button>
        </Link>
        
        <div className="text-center mt-4">
          <Link
            to="/user-login"
            className="font-body text-sm text-text-secondary hover:text-text-primary transition-smooth"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessStep;