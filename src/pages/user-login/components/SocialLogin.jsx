import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const SocialLogin = () => {
  const navigate = useNavigate();
  const [loadingProvider, setLoadingProvider] = useState(null);

  const handleSocialLogin = async (provider) => {
    setLoadingProvider(provider);
    
    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful social login
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', `user@${provider}.com`);
      localStorage.setItem('loginProvider', provider);
      
      navigate('/community-dashboard');
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      alert(`${provider} login failed. Please try again.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border-secondary" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-surface font-body text-text-tertiary">
            Or continue with
          </span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => handleSocialLogin(provider.name.toLowerCase())}
            disabled={loadingProvider !== null}
            className={`
              flex items-center justify-center space-x-3 px-4 py-3 
              border-2 ${provider.borderColor} rounded-lg 
              bg-surface ${provider.bgColor} 
              transition-all duration-normal
              hover:shadow-elevation-1
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
            `}
          >
            {loadingProvider === provider.name.toLowerCase() ? (
              <div className="w-5 h-5 border-2 border-text-tertiary border-t-transparent rounded-full animate-spin" />
            ) : (
              <Icon 
                name={provider.icon} 
                size={20} 
                className={provider.color}
              />
            )}
            <span className="font-body font-medium text-text-primary">
              {loadingProvider === provider.name.toLowerCase() 
                ? 'Connecting...' 
                : provider.name
              }
            </span>
          </button>
        ))}
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-accent-50 border border-accent-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} color="var(--color-accent)" className="mt-0.5 flex-shrink-0" />
          <p className="font-caption text-xs text-accent-700">
            Your data is protected with enterprise-grade security. We never store your social media passwords.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;