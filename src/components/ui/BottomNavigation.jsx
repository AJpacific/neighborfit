import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navigationItems = [
    { 
      label: 'Discover', 
      path: '/community-dashboard', 
      icon: 'Home', 
      activeIcon: 'Home',
      tooltip: 'Community dashboard and activity feed' 
    },
    { 
      label: 'Search', 
      path: '/activity-search-discovery', 
      icon: 'Search', 
      activeIcon: 'Search',
      tooltip: 'Find local fitness activities' 
    },
    { 
      label: 'Create', 
      path: '/create-activity', 
      icon: 'Plus', 
      activeIcon: 'Plus',
      tooltip: 'Organize a new activity' 
    },
    { 
      label: 'Messages', 
      path: '/messages-chat', 
      icon: 'MessageCircle', 
      activeIcon: 'MessageCircle',
      tooltip: 'Chat with community members' 
    },
    { 
      label: 'Profile', 
      path: '/user-profile', 
      icon: 'User', 
      activeIcon: 'User',
      tooltip: 'View and edit your profile' 
    },
  ];

  const isActive = (path) => {
    if (path === '/user-profile') {
      return location.pathname === '/user-profile' || location.pathname.startsWith('/user-profile/');
    }
    return location.pathname === path;
  };

  const isAuthPage = location.pathname === '/user-login' || location.pathname === '/user-registration';

  // Hide bottom navigation on auth pages for cleaner experience
  if (isAuthPage) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-100 lg:hidden bg-surface border-t border-border shadow-elevation-2">
      <div className="flex items-center justify-around h-16 px-2">
        {navigationItems.map((item) => {
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-smooth ${
                active
                  ? 'text-primary' :'text-text-tertiary hover:text-text-secondary'
              }`}
              title={item.tooltip}
            >
              <div className={`p-1 rounded-lg transition-smooth ${
                active ? 'bg-primary-50' : 'hover:bg-background-secondary'
              }`}>
                <Icon 
                  name={active ? item.activeIcon : item.icon} 
                  size={22} 
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
              <span className={`font-caption text-xs mt-1 transition-smooth ${
                active ? 'font-medium' : 'font-normal'
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;