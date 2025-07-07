import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Discover', path: '/community-dashboard', icon: 'Search', tooltip: 'Find activities and workout partners' },
    { label: 'Search', path: '/activity-search-discovery', icon: 'MapPin', tooltip: 'Browse local fitness activities' },
    { label: 'Create', path: '/create-activity', icon: 'Plus', tooltip: 'Organize a new activity' },
    { label: 'Messages', path: '/messages-chat', icon: 'MessageCircle', tooltip: 'Chat with community members' },
    { label: 'Profile', path: '/user-profile', icon: 'User', tooltip: 'View and edit your profile' },
  ];

  const authItems = [
    { label: 'Login', path: '/user-login', icon: 'LogIn' },
    { label: 'Register', path: '/user-registration', icon: 'UserPlus' },
  ];

  const isAuthPage = location.pathname === '/user-login' || location.pathname === '/user-registration';
  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border shadow-elevation-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/community-dashboard" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center transition-smooth group-hover:bg-primary-700">
              <Icon name="Zap" size={20} color="white" className="lg:w-6 lg:h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg lg:text-xl text-text-primary">
                NeighborFit
              </span>
              <span className="font-caption text-xs text-text-secondary hidden sm:block">
                Community Fitness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-smooth ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
                }`}
                title={item.tooltip}
              >
                <Icon name={item.icon} size={18} />
                <span className="font-body font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthPage ? (
              <Link to="/community-dashboard">
                <Button variant="ghost" iconName="ArrowLeft" iconPosition="left">
                  Back to App
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/user-login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/user-registration">
                  <Button variant="primary">Join Community</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-smooth"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-surface">
            <div className="py-4 space-y-2">
              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary border border-primary-200' :'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <div>
                    <span className="font-body font-medium block">{item.label}</span>
                    <span className="font-caption text-xs text-text-tertiary">{item.tooltip}</span>
                  </div>
                </Link>
              ))}

              {/* Mobile Auth Actions */}
              <div className="pt-4 border-t border-border-secondary space-y-2">
                {isAuthPage ? (
                  <Link
                    to="/community-dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-smooth"
                  >
                    <Icon name="ArrowLeft" size={20} />
                    <span className="font-body font-medium">Back to App</span>
                  </Link>
                ) : (
                  <>
                    {authItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-smooth"
                      >
                        <Icon name={item.icon} size={20} />
                        <span className="font-body font-medium">{item.label}</span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;