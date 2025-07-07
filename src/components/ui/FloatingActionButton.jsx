import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = () => {
  const location = useLocation();

  // Show FAB only on discovery-related pages
  const showOnPages = ['/community-dashboard', '/activity-search-discovery', '/activity-details-registration'];
  const shouldShow = showOnPages.includes(location.pathname);

  if (!shouldShow) {
    return null;
  }

  return (
    <div className="fixed bottom-20 right-4 z-200 lg:hidden">
      <Link
        to="/create-activity"
        className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary-700 text-primary-foreground rounded-full shadow-elevation-3 hover:shadow-elevation-4 transition-all duration-normal group"
        title="Create new activity"
      >
        <Icon 
          name="Plus" 
          size={24} 
          color="white" 
          strokeWidth={2.5}
          className="group-hover:scale-110 transition-transform duration-fast"
        />
      </Link>
    </div>
  );
};

export default FloatingActionButton;