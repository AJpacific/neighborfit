import React from 'react';

import Icon from '../../../components/AppIcon';

const SocialRegistration = ({ onSocialRegister }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100',
      description: 'Continue with Google'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100',
      description: 'Continue with Facebook'
    }
  ];

  const handleSocialLogin = (provider) => {
    // Mock social registration
    const mockUserData = {
      firstName: provider === 'google' ? 'John' : 'Jane',
      lastName: provider === 'google' ? 'Doe' : 'Smith',
      email: provider === 'google' ? 'john.doe@gmail.com' : 'jane.smith@facebook.com',
      provider: provider,
      isVerified: true
    };
    
    onSocialRegister(mockUserData);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-heading font-semibold text-text-primary mb-2">
          Quick Registration
        </h4>
        <p className="font-body text-sm text-text-secondary">
          Get started faster with your existing account
        </p>
      </div>

      <div className="space-y-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.id}
            onClick={() => handleSocialLogin(provider.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all ${provider.color}`}
          >
            <div className="flex items-center justify-center space-x-3">
              <Icon name={provider.icon} size={20} />
              <span className="font-body font-medium">{provider.description}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface text-text-tertiary font-body">
            or register with email
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialRegistration;