import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const AuthContainer = ({ children, title, subtitle, showBackButton = true }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        {showBackButton && (
          <div className="mb-6">
            <Link
              to="/community-dashboard"
              className="inline-flex items-center space-x-2 text-text-secondary hover:text-text-primary transition-smooth"
            >
              <Icon name="ArrowLeft" size={20} />
              <span className="font-body">Back to NeighborFit</span>
            </Link>
          </div>
        )}

        {/* Auth Card */}
        <div className="bg-surface rounded-2xl shadow-elevation-3 p-8">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-text-primary">
                  NeighborFit
                </span>
                <span className="font-caption text-sm text-text-secondary">
                  Community Fitness
                </span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-heading font-bold text-2xl text-text-primary mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="font-body text-text-secondary">
                {subtitle}
              </p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="font-caption text-sm text-text-tertiary">
            By continuing, you agree to our{' '}
            <Link to="#" className="text-accent hover:text-accent-700 transition-smooth">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="#" className="text-accent hover:text-accent-700 transition-smooth">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;