import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SuggestedConnectionsPanel = ({ connections, onConnect, onDismiss }) => {
  const getConnectionReason = (reason) => {
    const reasonMap = {
      'location': { icon: 'MapPin', text: 'Lives nearby', color: 'text-primary' },
      'interests': { icon: 'Heart', text: 'Similar interests', color: 'text-accent' },
      'activity': { icon: 'Activity', text: 'Active in community', color: 'text-success' },
      'mutual': { icon: 'Users', text: 'Mutual connections', color: 'text-secondary' }
    };
    return reasonMap[reason] || { icon: 'User', text: 'Suggested for you', color: 'text-text-secondary' };
  };

  const getActivityLevel = (level) => {
    const levels = {
      'beginner': { text: 'Beginner', color: 'bg-success-50 text-success' },
      'intermediate': { text: 'Intermediate', color: 'bg-warning-50 text-warning' },
      'advanced': { text: 'Advanced', color: 'bg-error-50 text-error' }
    };
    return levels[level] || { text: 'Beginner', color: 'bg-success-50 text-success' };
  };

  if (!connections || connections.length === 0) {
    return (
      <div className="bg-surface rounded-xl shadow-elevation-2 p-6">
        <h3 className="font-heading font-semibold text-text-primary mb-4">
          Suggested Connections
        </h3>
        <div className="text-center py-8">
          <Icon name="Users" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-3" />
          <p className="font-body text-text-secondary mb-4">
            No suggestions available yet
          </p>
          <p className="font-caption text-xs text-text-tertiary">
            Complete your profile to get better matches
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary">
          Suggested Connections
        </h3>
        <button className="text-accent hover:text-accent-700 transition-smooth">
          <Icon name="RefreshCw" size={16} />
        </button>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {connections.map((connection) => {
          const reason = getConnectionReason(connection.reason);
          const activityLevel = getActivityLevel(connection.activityLevel);
          
          return (
            <div
              key={connection.id}
              className="border border-border-secondary rounded-lg p-3 hover:shadow-elevation-1 transition-smooth"
            >
              {/* Header */}
              <div className="flex items-start space-x-3 mb-3">
                <div className="relative">
                  <Image
                    src={connection.avatar}
                    alt={connection.name}
                    className="w-12 h-12 rounded-full"
                  />
                  {connection.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-surface"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-body font-semibold text-text-primary">
                      {connection.name}
                    </h4>
                    {connection.verified && (
                      <Icon name="CheckCircle" size={14} color="var(--color-success)" />
                    )}
                  </div>
                  <p className="font-caption text-xs text-text-secondary mb-1">
                    {connection.location} • {connection.distance}km away
                  </p>
                  <div className="flex items-center space-x-1">
                    <Icon name={reason.icon} size={12} className={reason.color} />
                    <span className={`font-caption text-xs ${reason.color}`}>
                      {reason.text}
                    </span>
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${activityLevel.color}`}>
                    {activityLevel.text}
                  </span>
                  <span className="font-caption text-xs text-text-secondary">
                    {connection.mutualFriends} mutual friends
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {connection.interests.slice(0, 3).map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-background-secondary text-text-secondary"
                    >
                      {interest}
                    </span>
                  ))}
                  {connection.interests.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-background-secondary text-text-secondary">
                      +{connection.interests.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-background-secondary rounded-lg p-2 mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Activity" size={12} color="var(--color-text-secondary)" />
                  <span className="font-caption text-xs text-text-secondary">
                    {connection.recentActivity}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onConnect?.(connection.id)}
                  iconName="UserPlus"
                  iconPosition="left"
                  className="flex-1"
                >
                  Connect
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss?.(connection.id)}
                  iconName="X"
                >
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-border-secondary">
        <Button variant="ghost" size="sm" fullWidth iconName="Search" iconPosition="left">
          Find More People
        </Button>
      </div>
    </div>
  );
};

export default SuggestedConnectionsPanel;