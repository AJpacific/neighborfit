import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UpcomingEventsPanel = ({ events, onJoinEvent }) => {
  const getEventIcon = (type) => {
    const iconMap = {
      'Running': 'Zap',
      'Yoga': 'Heart',
      'Cycling': 'Bike',
      'Swimming': 'Waves',
      'Gym': 'Dumbbell',
      'Walking': 'MapPin',
      'Tennis': 'Target',
      'Basketball': 'Circle',
      'Workshop': 'BookOpen',
      'Challenge': 'Trophy'
    };
    return iconMap[type] || 'Calendar';
  };

  const getTimeUntilEvent = (dateTime) => {
    const now = new Date();
    const eventDate = new Date(dateTime);
    const diffHours = Math.ceil((eventDate - now) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Starting soon';
    if (diffHours < 24) return `${diffHours}h`;
    if (diffHours < 168) return `${Math.ceil(diffHours / 24)}d`;
    return `${Math.ceil(diffHours / 168)}w`;
  };

  const getPriorityColor = (priority) => {
    const colorMap = {
      'high': 'border-l-error bg-error-50',
      'medium': 'border-l-warning bg-warning-50',
      'low': 'border-l-success bg-success-50'
    };
    return colorMap[priority] || 'border-l-primary bg-primary-50';
  };

  if (!events || events.length === 0) {
    return (
      <div className="bg-surface rounded-xl shadow-elevation-2 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-text-primary">
            Upcoming Events
          </h3>
        </div>
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} color="var(--color-text-tertiary)" className="mx-auto mb-3" />
          <p className="font-body text-text-secondary mb-4">
            No upcoming events yet
          </p>
          <Link to="/activity-search-discovery">
            <Button variant="ghost" size="sm" iconName="Search" iconPosition="left">
              Find Events
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-text-primary">
          Upcoming Events
        </h3>
        <Link 
          to="/activity-search-discovery"
          className="text-accent hover:text-accent-700 transition-smooth"
        >
          <Icon name="MoreHorizontal" size={20} />
        </Link>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className={`border-l-4 rounded-lg p-3 transition-smooth hover:shadow-elevation-1 ${getPriorityColor(event.priority)}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-surface rounded-md flex items-center justify-center">
                  <Icon name={getEventIcon(event.type)} size={14} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-text-primary text-sm">
                    {event.title}
                  </h4>
                  <p className="font-caption text-xs text-text-secondary">
                    {event.type}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-surface text-text-secondary">
                {getTimeUntilEvent(event.dateTime)}
              </span>
            </div>

            {/* Details */}
            <div className="space-y-1 mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={12} color="var(--color-text-tertiary)" />
                <span className="font-caption text-xs text-text-secondary">
                  {event.date} at {event.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={12} color="var(--color-text-tertiary)" />
                <span className="font-caption text-xs text-text-secondary">
                  {event.location}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={12} color="var(--color-text-tertiary)" />
                <span className="font-caption text-xs text-text-secondary">
                  {event.participants}/{event.maxParticipants} joined
                </span>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Image
                  src={event.organizer.avatar}
                  alt={event.organizer.name}
                  className="w-5 h-5 rounded-full"
                />
                <span className="font-caption text-xs text-text-secondary">
                  by {event.organizer.name}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={() => onJoinEvent?.(event.id)}
                  disabled={event.participants >= event.maxParticipants}
                >
                  {event.participants >= event.maxParticipants ? 'Full' : 'Join'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-border-secondary">
        <Link to="/activity-search-discovery">
          <Button variant="ghost" size="sm" fullWidth iconName="Plus" iconPosition="left">
            View All Events
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEventsPanel;