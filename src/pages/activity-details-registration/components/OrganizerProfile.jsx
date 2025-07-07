import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OrganizerProfile = ({ organizer }) => {
  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
        Meet Your Organizer
      </h3>
      
      <div className="flex items-start space-x-4 mb-4">
        <div className="relative">
          <Image
            src={organizer.avatar}
            alt={organizer.name}
            className="w-16 h-16 rounded-full"
          />
          {organizer.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-surface">
              <Icon name="Check" size={12} color="white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-body font-semibold text-text-primary">
              {organizer.name}
            </h4>
            {organizer.isPro && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-accent-100 text-accent-700">
                Pro
              </span>
            )}
          </div>
          
          <p className="font-body text-sm text-text-secondary mb-2">
            {organizer.bio}
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} color="var(--color-warning)" />
              <span className="font-body font-medium text-text-primary">
                {organizer.rating}
              </span>
              <span className="font-body text-text-secondary">
                ({organizer.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <p className="font-body font-semibold text-lg text-text-primary">
            {organizer.activitiesHosted}
          </p>
          <p className="font-caption text-xs text-text-secondary">
            Activities Hosted
          </p>
        </div>
        
        <div className="text-center">
          <p className="font-body font-semibold text-lg text-text-primary">
            {organizer.totalParticipants}
          </p>
          <p className="font-caption text-xs text-text-secondary">
            Total Participants
          </p>
        </div>
        
        <div className="text-center">
          <p className="font-body font-semibold text-lg text-text-primary">
            {organizer.yearsActive}
          </p>
          <p className="font-caption text-xs text-text-secondary">
            Years Active
          </p>
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-4">
        <h5 className="font-body font-medium text-text-primary mb-2">
          Specialties
        </h5>
        <div className="flex flex-wrap gap-2">
          {organizer.specialties.map((specialty, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>

      {/* Certifications */}
      {organizer.certifications && organizer.certifications.length > 0 && (
        <div className="mb-4">
          <h5 className="font-body font-medium text-text-primary mb-2">
            Certifications
          </h5>
          <div className="space-y-2">
            {organizer.certifications.map((cert, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Icon name="Award" size={14} color="var(--color-success)" />
                <span className="font-body text-sm text-text-secondary">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          iconName="MessageCircle"
          iconPosition="left"
          className="flex-1"
        >
          Message
        </Button>
        <Button
          variant="ghost"
          iconName="User"
          iconPosition="left"
          className="flex-1"
        >
          View Profile
        </Button>
      </div>

      {/* Safety Info */}
      <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} color="var(--color-success)" className="mt-0.5" />
          <div>
            <p className="font-body font-medium text-success-700 text-sm">
              Verified Organizer
            </p>
            <p className="font-body text-success-600 text-xs">
              Background checked and community verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfile;