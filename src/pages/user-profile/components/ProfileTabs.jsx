import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange, isOwner }) => {
  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'activities', label: 'Activities', icon: 'Activity' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'photos', label: 'Photos', icon: 'Image' },
    ...(isOwner ? [{ id: 'settings', label: 'Settings', icon: 'Settings' }] : [])
  ];

  return (
    <div className="bg-surface rounded-lg shadow-elevation-1 p-1">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-smooth whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-elevation-1'
                : 'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
            }`}
          >
            <Icon name={tab.icon} size={16} />
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabs;