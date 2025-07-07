import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TrendingGroupsSection = ({ groups, onJoinGroup }) => {
  const getGroupIcon = (category) => {
    const iconMap = {
      'Running': 'Zap',
      'Yoga': 'Heart',
      'Cycling': 'Bike',
      'Swimming': 'Waves',
      'Gym': 'Dumbbell',
      'Walking': 'MapPin',
      'Tennis': 'Target',
      'Basketball': 'Circle',
      'General': 'Users'
    };
    return iconMap[category] || 'Users';
  };

  const getTrendingBadge = (trend) => {
    if (trend === 'hot') return { text: '🔥 Hot', color: 'text-error', bg: 'bg-error-50' };
    if (trend === 'new') return { text: '✨ New', color: 'text-accent', bg: 'bg-accent-50' };
    if (trend === 'growing') return { text: '📈 Growing', color: 'text-success', bg: 'bg-success-50' };
    return { text: '⭐ Popular', color: 'text-warning', bg: 'bg-warning-50' };
  };

  if (!groups || groups.length === 0) {
    return (
      <div className="bg-surface rounded-xl shadow-elevation-2 p-6 text-center">
        <Icon name="Users" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-3" />
        <h3 className="font-heading font-semibold text-text-primary mb-2">
          No Groups Yet
        </h3>
        <p className="font-body text-text-secondary mb-4">
          Start building your fitness community by creating the first group!
        </p>
        <Link to="/create-activity">
          <Button variant="primary" iconName="Users" iconPosition="left">
            Create Group
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-heading font-bold text-xl text-text-primary">
          Trending Groups
        </h2>
        <Link 
          to="/activity-search-discovery"
          className="text-accent hover:text-accent-700 font-body text-sm transition-smooth"
        >
          Explore all
        </Link>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-4 pb-2" style={{ width: 'max-content' }}>
          {groups.map((group) => {
            const trendingBadge = getTrendingBadge(group.trending);
            
            return (
              <div
                key={group.id}
                className="bg-surface rounded-xl shadow-elevation-2 p-4 w-80 flex-shrink-0 hover:shadow-elevation-3 transition-smooth"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                      <Icon name={getGroupIcon(group.category)} size={20} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-text-primary">
                        {group.name}
                      </h3>
                      <p className="font-caption text-xs text-text-secondary">
                        {group.category} • {group.location}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${trendingBadge.bg} ${trendingBadge.color}`}>
                    {trendingBadge.text}
                  </span>
                </div>

                {/* Description */}
                <p className="font-body text-text-secondary text-sm mb-4 line-clamp-2">
                  {group.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="font-heading font-bold text-lg text-text-primary">
                      {group.members}
                    </p>
                    <p className="font-caption text-xs text-text-secondary">Members</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-lg text-text-primary">
                      {group.activities}
                    </p>
                    <p className="font-caption text-xs text-text-secondary">Activities</p>
                  </div>
                  <div className="text-center">
                    <p className="font-heading font-bold text-lg text-text-primary">
                      {group.weeklyMeetings}
                    </p>
                    <p className="font-caption text-xs text-text-secondary">Weekly</p>
                  </div>
                </div>

                {/* Member Avatars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {group.memberAvatars.slice(0, 4).map((avatar, index) => (
                        <Image
                          key={index}
                          src={avatar}
                          alt={`Member ${index + 1}`}
                          className="w-8 h-8 rounded-full border-2 border-surface"
                        />
                      ))}
                      {group.memberAvatars.length > 4 && (
                        <div className="w-8 h-8 bg-background-tertiary rounded-full border-2 border-surface flex items-center justify-center">
                          <span className="font-caption text-xs font-medium text-text-secondary">
                            +{group.memberAvatars.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
                    <span className="font-caption text-xs font-medium text-text-primary">
                      {group.rating}
                    </span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-background-secondary rounded-lg p-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Activity" size={14} color="var(--color-text-secondary)" />
                    <span className="font-caption text-xs text-text-secondary">
                      Last activity: {group.lastActivity}
                    </span>
                  </div>
                  <p className="font-caption text-xs text-text-tertiary mt-1">
                    {group.recentActivityText}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    className="flex-1"
                  >
                    View
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => onJoinGroup?.(group.id)}
                    iconName="UserPlus"
                    iconPosition="left"
                  >
                    Join Group
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrendingGroupsSection;