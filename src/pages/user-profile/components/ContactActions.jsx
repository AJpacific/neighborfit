import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactActions = ({ 
  isFollowing, 
  onFollowToggle, 
  onSendMessage, 
  onInviteToActivity,
  onBlock,
  onReport 
}) => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  return (
    <div className="bg-surface rounded-lg shadow-elevation-1 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex space-x-3">
          <Button
            variant={isFollowing ? "outline" : "primary"}
            onClick={onFollowToggle}
            iconName={isFollowing ? "UserCheck" : "UserPlus"}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          
          <Button
            variant="outline"
            onClick={onSendMessage}
            iconName="MessageCircle"
          >
            Message
          </Button>
          
          <Button
            variant="outline"
            onClick={onInviteToActivity}
            iconName="Calendar"
            className="hidden sm:flex"
          >
            Invite to Activity
          </Button>
        </div>
        
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreVertical"
            onClick={() => setShowMoreActions(!showMoreActions)}
          />
          
          {showMoreActions && (
            <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-lg shadow-elevation-2 z-10">
              <div className="py-2">
                <button
                  onClick={onInviteToActivity}
                  className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 sm:hidden"
                >
                  <Icon name="Calendar" size={16} />
                  <span>Invite to Activity</span>
                </button>
                
                <button
                  onClick={onBlock}
                  className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 text-error"
                >
                  <Icon name="UserX" size={16} />
                  <span>Block User</span>
                </button>
                
                <button
                  onClick={onReport}
                  className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 text-error"
                >
                  <Icon name="Flag" size={16} />
                  <span>Report User</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactActions;