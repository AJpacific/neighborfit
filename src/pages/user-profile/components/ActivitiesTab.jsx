import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivitiesTab = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const getActivityIcon = (type) => {
    const icons = {
      'Yoga': 'Heart',
      'Running': 'Zap',
      'Hiking': 'Mountain',
      'Swimming': 'Waves',
      'Cycling': 'Bike',
      'Gym': 'Dumbbell'
    };
    return icons[type] || 'Activity';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'upcoming': return 'text-primary';
      case 'cancelled': return 'text-error';
      default: return 'text-text-secondary';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Organizer': return 'text-warning';
      case 'Participant': return 'text-primary';
      default: return 'text-text-secondary';
    }
  };

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'organized', label: 'Organized' },
    { value: 'joined', label: 'Joined' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'completed', label: 'Completed' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'rating', label: 'Rating' },
    { value: 'participants', label: 'Participants' }
  ];

  const filteredActivities = activities?.filter(activity => {
    if (filter === 'all') return true;
    if (filter === 'organized') return activity.role === 'Organizer';
    if (filter === 'joined') return activity.role === 'Participant';
    if (filter === 'upcoming') return activity.status === 'upcoming';
    if (filter === 'completed') return activity.status === 'completed';
    return true;
  }) || [];

  const sortedActivities = filteredActivities.sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else if (sortBy === 'participants') {
      return b.participants - a.participants;
    }
    return 0;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters and Sort */}
      <div className="bg-surface rounded-lg shadow-elevation-1 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-smooth ${
                  filter === option.value
                    ? 'bg-primary text-white' :'bg-background-secondary text-text-secondary hover:bg-background-tertiary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-text-tertiary" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-background-secondary border border-border-secondary rounded-lg px-3 py-1 text-sm focus:outline-none focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {sortedActivities.length === 0 ? (
          <div className="bg-surface rounded-lg shadow-elevation-1 p-8 text-center">
            <Icon name="Activity" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="font-heading font-medium text-lg text-text-secondary mb-2">
              No activities found
            </h3>
            <p className="text-text-tertiary">
              {filter === 'all' ?'No activities to display yet'
                : `No ${filter} activities found`
              }
            </p>
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-surface rounded-lg shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-smooth"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.role === 'Organizer' ?'bg-warning-100 text-warning' :'bg-primary-100 text-primary'
                    }`}>
                      <Icon name={getActivityIcon(activity.type)} size={20} />
                    </div>
                    
                    <div>
                      <h3 className="font-heading font-medium text-lg text-text-primary">
                        {activity.title}
                      </h3>
                      <div className="flex items-center space-x-3 text-sm text-text-secondary">
                        <span className={`font-medium ${getRoleColor(activity.role)}`}>
                          {activity.role}
                        </span>
                        <span>•</span>
                        <span>{formatDate(activity.date)}</span>
                        <span>•</span>
                        <span className={getStatusColor(activity.status)}>
                          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-text-tertiary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{activity.participants} participants</span>
                    </div>
                    
                    {activity.rating && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-warning" />
                        <span>{activity.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {activity.status === 'upcoming' && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                    >
                      View Details
                    </Button>
                  )}
                  
                  {activity.status === 'completed' && activity.role === 'Organizer' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="BarChart"
                    >
                      View Stats
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivitiesTab;