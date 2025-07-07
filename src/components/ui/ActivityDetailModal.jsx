import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const ActivityDetailModal = ({ 
  isOpen, 
  onClose, 
  activity,
  onRegister,
  isRegistered = false 
}) => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (isOpen && activity) {
      // Simulate loading participants
      setParticipants([
        { id: 1, name: 'Sarah Chen', avatar: '/assets/images/avatar1.jpg', verified: true },
        { id: 2, name: 'Mike Rodriguez', avatar: '/assets/images/avatar2.jpg', verified: true },
        { id: 3, name: 'Emma Thompson', avatar: '/assets/images/avatar3.jpg', verified: false },
      ]);
    }
  }, [isOpen, activity]);

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      await onRegister?.(activity?.id);
      // Simulate API delay
      setTimeout(() => {
        setIsRegistering(false);
      }, 1000);
    } catch (error) {
      setIsRegistering(false);
    }
  };

  const handleViewFullDetails = () => {
    navigate('/activity-details-registration', { state: { activity } });
    onClose();
  };

  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-300 lg:z-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative h-full flex items-end lg:items-center justify-center p-4">
        <div className="bg-surface rounded-t-2xl lg:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-elevation-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-heading font-semibold text-xl text-text-primary">
              Activity Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Activity Image */}
            {activity.image && (
              <div className="relative h-48 bg-background-secondary">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    {activity.category}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6 space-y-6">
              {/* Title and Description */}
              <div>
                <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
                  {activity.title}
                </h3>
                <p className="font-body text-text-secondary">
                  {activity.description}
                </p>
              </div>

              {/* Key Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
                    <Icon name="Calendar" size={18} color="var(--color-accent)" />
                  </div>
                  <div>
                    <p className="font-caption text-xs text-text-tertiary">Date</p>
                    <p className="font-body font-medium text-text-primary">{activity.date}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={18} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <p className="font-caption text-xs text-text-tertiary">Time</p>
                    <p className="font-body font-medium text-text-primary">{activity.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={18} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="font-caption text-xs text-text-tertiary">Location</p>
                    <p className="font-body font-medium text-text-primary">{activity.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={18} color="var(--color-warning)" />
                  </div>
                  <div>
                    <p className="font-caption text-xs text-text-tertiary">Spots</p>
                    <p className="font-body font-medium text-text-primary">
                      {activity.currentParticipants}/{activity.maxParticipants}
                    </p>
                  </div>
                </div>
              </div>

              {/* Participants Preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-semibold text-text-primary">
                    Participants ({participants.length})
                  </h4>
                  <button
                    onClick={handleViewFullDetails}
                    className="text-accent hover:text-accent-700 font-body text-sm transition-smooth"
                  >
                    View all
                  </button>
                </div>
                <div className="flex -space-x-2">
                  {participants.slice(0, 4).map((participant) => (
                    <div key={participant.id} className="relative">
                      <Image
                        src={participant.avatar}
                        alt={participant.name}
                        className="w-10 h-10 rounded-full border-2 border-surface"
                      />
                      {participant.verified && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                          <Icon name="Check" size={10} color="white" strokeWidth={3} />
                        </div>
                      )}
                    </div>
                  ))}
                  {participants.length > 4 && (
                    <div className="w-10 h-10 bg-background-tertiary rounded-full border-2 border-surface flex items-center justify-center">
                      <span className="font-caption text-xs font-medium text-text-secondary">
                        +{participants.length - 4}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-border bg-background-secondary">
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handleViewFullDetails}
                className="flex-1"
              >
                Full Details
              </Button>
              <Button
                variant={isRegistered ? "success" : "primary"}
                onClick={handleRegister}
                loading={isRegistering}
                disabled={isRegistered || activity.currentParticipants >= activity.maxParticipants}
                className="flex-1"
                iconName={isRegistered ? "Check" : "UserPlus"}
                iconPosition="left"
              >
                {isRegistered ? 'Registered' : 'Join Activity'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailModal;