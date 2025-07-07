import React from 'react';
import ActivityCard from './ActivityCard';
import Icon from '../../../components/AppIcon';

const ActivityGrid = ({ 
  activities, 
  loading = false, 
  onJoinActivity, 
  onViewDetails,
  joinedActivities = [],
  emptyStateMessage = "No activities found matching your criteria."
}) => {
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-surface rounded-xl border border-border animate-pulse">
              <div className="h-48 bg-background-secondary rounded-t-xl" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-background-secondary rounded w-3/4" />
                <div className="h-3 bg-background-secondary rounded w-1/2" />
                <div className="space-y-2">
                  <div className="h-3 bg-background-secondary rounded w-full" />
                  <div className="h-3 bg-background-secondary rounded w-2/3" />
                </div>
                <div className="flex space-x-2">
                  <div className="h-10 bg-background-secondary rounded flex-1" />
                  <div className="h-10 bg-background-secondary rounded flex-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-background-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} color="var(--color-text-tertiary)" />
          </div>
          <h3 className="font-heading font-semibold text-lg text-text-primary mb-2">
            No Activities Found
          </h3>
          <p className="font-body text-text-secondary mb-6 max-w-md mx-auto">
            {emptyStateMessage}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-body font-medium hover:bg-primary-700 transition-smooth">
              Clear Filters
            </button>
            <button className="px-6 py-3 border border-border text-text-primary rounded-lg font-body font-medium hover:bg-background-secondary transition-smooth">
              Expand Search Area
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onJoin={onJoinActivity}
            onViewDetails={onViewDetails}
            isJoined={joinedActivities.includes(activity.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;