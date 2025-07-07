import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsPanel = ({ stats }) => {
  const statItems = [
    {
      id: 'activities',
      label: 'This Week',
      value: stats.weeklyActivities || 0,
      icon: 'Activity',
      color: 'primary',
      trend: stats.activitiesTrend || 0
    },
    {
      id: 'connections',
      label: 'New Friends',
      value: stats.newConnections || 0,
      icon: 'Users',
      color: 'accent',
      trend: stats.connectionsTrend || 0
    },
    {
      id: 'events',
      label: 'Upcoming',
      value: stats.upcomingEvents || 0,
      icon: 'Calendar',
      color: 'secondary',
      trend: stats.eventsTrend || 0
    },
    {
      id: 'achievements',
      label: 'Achievements',
      value: stats.achievements || 0,
      icon: 'Award',
      color: 'warning',
      trend: stats.achievementsTrend || 0
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary-50 text-primary',
      accent: 'bg-accent-50 text-accent',
      secondary: 'bg-secondary-50 text-secondary',
      warning: 'bg-warning-50 text-warning'
    };
    return colorMap[color] || 'bg-primary-50 text-primary';
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return 'TrendingUp';
    if (trend < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'text-success';
    if (trend < 0) return 'text-error';
    return 'text-text-tertiary';
  };

  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary">
          Your Activity
        </h3>
        <button className="text-accent hover:text-accent-700 transition-smooth">
          <Icon name="MoreHorizontal" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getColorClasses(item.color)}`}>
                <Icon name={item.icon} size={16} />
              </div>
              {item.trend !== 0 && (
                <div className={`flex items-center space-x-1 ${getTrendColor(item.trend)}`}>
                  <Icon name={getTrendIcon(item.trend)} size={12} />
                  <span className="font-caption text-xs">
                    {Math.abs(item.trend)}%
                  </span>
                </div>
              )}
            </div>
            <div>
              <p className="font-heading font-bold text-xl text-text-primary">
                {item.value}
              </p>
              <p className="font-caption text-xs text-text-secondary">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border-secondary">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="font-caption text-xs text-text-secondary">
              Active in community
            </span>
          </div>
          <span className="font-caption text-xs font-medium text-success">
            Level {stats.level || 1}
          </span>
        </div>
        <div className="mt-2 w-full bg-background-tertiary rounded-full h-2">
          <div 
            className="bg-success h-2 rounded-full transition-all duration-slow"
            style={{ width: `${(stats.levelProgress || 0)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStatsPanel;