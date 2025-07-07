import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SocialConnections = ({ connections }) => {
  const handleViewProfile = (connectionId) => {
    // Navigate to connection's profile console.log('Viewing profile of connection:', connectionId);
  };

  const handleSendMessage = (connectionId) => {
    // Open message conversation
    console.log('Sending message to connection:', connectionId);
  };

  if (!connections || connections.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface rounded-lg shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-bold text-lg text-text-primary">
          Recent Connections
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="Users"
          className="text-accent"
        >
          View All
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.slice(0, 3).map((connection) => (
          <div
            key={connection.id}
            className="p-4 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-smooth"
          >
            <div className="flex items-center space-x-3 mb-3">
              <img
                src={connection.avatar}
                alt={connection.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-heading font-medium text-text-primary truncate">
                  {connection.name}
                </h4>
                <p className="text-sm text-text-tertiary">
                  {connection.relationship}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-text-tertiary mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="Activity" size={14} />
                <span>{connection.mutualActivities} activities</span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewProfile(connection.id)}
                className="flex-1 text-xs"
              >
                View Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="MessageCircle"
                onClick={() => handleSendMessage(connection.id)}
                className="flex-shrink-0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialConnections;