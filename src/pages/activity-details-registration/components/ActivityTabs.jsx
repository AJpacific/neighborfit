import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityTabs = ({ activity, participants, comments }) => {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'participants', label: 'Participants', icon: 'Users' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle' }
  ];

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          About This Activity
        </h3>
        <p className="font-body text-text-secondary leading-relaxed">
          {activity.description}
        </p>
      </div>

      {/* Requirements */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Requirements
        </h3>
        <ul className="space-y-2">
          {activity.requirements.map((requirement, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Check" size={16} color="var(--color-success)" className="mt-1 flex-shrink-0" />
              <span className="font-body text-text-secondary">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* What to Bring */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          What to Bring
        </h3>
        <ul className="space-y-2">
          {activity.whatToBring.map((item, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Package" size={16} color="var(--color-primary)" className="mt-1 flex-shrink-0" />
              <span className="font-body text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Meeting Instructions */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Meeting Instructions
        </h3>
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
          <p className="font-body text-text-primary">
            {activity.meetingInstructions}
          </p>
        </div>
      </div>

      {/* Cancellation Policy */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Cancellation Policy
        </h3>
        <p className="font-body text-text-secondary">
          {activity.cancellationPolicy}
        </p>
      </div>

      {/* Weather Policy */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Weather Contingency
        </h3>
        <p className="font-body text-text-secondary">
          {activity.weatherPolicy}
        </p>
      </div>
    </div>
  );

  const renderParticipantsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Participants ({participants.length})
        </h3>
        <span className="font-caption text-sm text-text-secondary">
          {activity.maxParticipants - participants.length} spots remaining
        </span>
      </div>

      <div className="space-y-3">
        {participants.map((participant) => (
          <div key={participant.id} className="flex items-center space-x-3 p-3 bg-surface border border-border rounded-lg">
            <div className="relative">
              <Image
                src={participant.avatar}
                alt={participant.name}
                className="w-12 h-12 rounded-full"
              />
              {participant.isOrganizer && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={12} color="white" />
                </div>
              )}
              {participant.verified && !participant.isOrganizer && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={12} color="white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-body font-medium text-text-primary">
                  {participant.name}
                </h4>
                {participant.isOrganizer && (
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700">
                    Organizer
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="font-caption text-xs text-text-secondary">
                  {participant.fitnessLevel}
                </span>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={12} color="var(--color-warning)" />
                  <span className="font-caption text-xs text-text-secondary">
                    {participant.rating}
                  </span>
                </div>
              </div>
            </div>
            <button className="p-2 text-text-secondary hover:text-text-primary hover:bg-background-secondary rounded-lg transition-smooth">
              <Icon name="MessageCircle" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLocationTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Location Details
        </h3>
        <div className="flex items-start space-x-3 mb-4">
          <Icon name="MapPin" size={20} color="var(--color-primary)" className="mt-1" />
          <div>
            <p className="font-body font-medium text-text-primary">{activity.location}</p>
            <p className="font-body text-text-secondary">{activity.address}</p>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-background-secondary rounded-lg overflow-hidden h-64">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={activity.location}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${activity.coordinates.lat},${activity.coordinates.lng}&z=15&output=embed`}
          className="border-0"
        />
      </div>

      {/* Nearby Amenities */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Nearby Amenities
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {activity.nearbyAmenities.map((amenity, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg">
              <Icon name={amenity.icon} size={16} color="var(--color-primary)" />
              <span className="font-body text-sm text-text-primary">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Directions */}
      <div>
        <h3 className="font-heading font-semibold text-lg text-text-primary mb-3">
          Getting There
        </h3>
        <p className="font-body text-text-secondary mb-3">
          {activity.directions}
        </p>
        <button className="inline-flex items-center space-x-2 text-accent hover:text-accent-700 font-body font-medium transition-smooth">
          <Icon name="Navigation" size={16} />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );

  const renderCommentsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-text-primary">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Add Comment */}
      <div className="bg-surface border border-border rounded-lg p-4">
        <textarea
          placeholder="Ask a question or share your thoughts..."
          className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-700 transition-smooth">
            <Icon name="Send" size={16} />
            <span>Post Comment</span>
          </button>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Image
                src={comment.author.avatar}
                alt={comment.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-body font-medium text-text-primary">
                    {comment.author.name}
                  </h4>
                  <span className="font-caption text-xs text-text-tertiary">
                    {comment.timestamp}
                  </span>
                </div>
                <p className="font-body text-text-secondary">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <button className="inline-flex items-center space-x-1 text-text-tertiary hover:text-text-secondary transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span className="font-caption text-xs">{comment.likes}</span>
                  </button>
                  <button className="font-caption text-xs text-text-tertiary hover:text-text-secondary transition-smooth">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 font-body font-medium transition-smooth whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary bg-primary-50' :'text-text-secondary hover:text-text-primary hover:bg-background-secondary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && renderDetailsTab()}
        {activeTab === 'participants' && renderParticipantsTab()}
        {activeTab === 'location' && renderLocationTab()}
        {activeTab === 'comments' && renderCommentsTab()}
      </div>
    </div>
  );
};

export default ActivityTabs;