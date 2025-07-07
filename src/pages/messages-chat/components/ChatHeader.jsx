import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ conversation, onBack, showBackButton = true }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleCall = () => {
    // Handle voice call
    console.log('Starting voice call with', conversation.name);
  };

  const handleVideoCall = () => {
    // Handle video call
    console.log('Starting video call with', conversation.name);
  };

  const handleViewProfile = () => {
    // Handle view profile
    console.log('Viewing profile of', conversation.name);
  };

  const handleMuteConversation = () => {
    // Handle mute/unmute
    console.log('Toggling mute for', conversation.name);
  };

  const handleDeleteConversation = () => {
    // Handle delete conversation
    console.log('Deleting conversation with', conversation.name);
  };

  return (
    <div className="bg-surface border-b border-border p-4">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ArrowLeft"
              onClick={onBack}
              className="lg:hidden"
            />
          )}
          
          <div className="relative">
            <img
              src={conversation?.avatar}
              alt={conversation?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation?.type === 'group' && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Users" size={10} className="text-white" />
              </div>
            )}
            {conversation?.type === 'direct' && conversation?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-body font-medium text-text-primary truncate">
              {conversation?.name}
              {conversation?.type === 'group' && (
                <span className="ml-2 text-sm text-text-tertiary">
                  ({conversation?.memberCount} members)
                </span>
              )}
            </h2>
            <p className="text-sm text-text-tertiary">
              {conversation?.type === 'direct' ? conversation?.isOnline ?'Online' : 'Last seen recently'
                : `${conversation?.memberCount} members`
              }
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {conversation?.type === 'direct' && (
            <>
              <Button
                variant="ghost"
                size="sm"
                iconName="Phone"
                onClick={handleCall}
                className="hidden sm:flex"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Video"
                onClick={handleVideoCall}
                className="hidden sm:flex"
              />
            </>
          )}
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreVertical"
              onClick={() => setShowOptions(!showOptions)}
            />
            
            {showOptions && (
              <div className="absolute right-0 top-12 w-48 bg-surface border border-border rounded-lg shadow-elevation-2 z-10">
                <div className="py-2">
                  <button
                    onClick={handleViewProfile}
                    className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="User" size={16} />
                    <span>View Profile</span>
                  </button>
                  
                  {conversation?.type === 'direct' && (
                    <>
                      <button
                        onClick={handleCall}
                        className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 sm:hidden"
                      >
                        <Icon name="Phone" size={16} />
                        <span>Voice Call</span>
                      </button>
                      <button
                        onClick={handleVideoCall}
                        className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 sm:hidden"
                      >
                        <Icon name="Video" size={16} />
                        <span>Video Call</span>
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={handleMuteConversation}
                    className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="BellOff" size={16} />
                    <span>Mute Notifications</span>
                  </button>
                  
                  <div className="border-t border-border-secondary my-2" />
                  
                  <button
                    onClick={handleDeleteConversation}
                    className="w-full px-4 py-2 text-left hover:bg-background-secondary transition-smooth flex items-center space-x-2 text-error"
                  >
                    <Icon name="Trash2" size={16} />
                    <span>Delete Conversation</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Activity Context */}
      {conversation?.activityContext && (
        <div className="mt-3 p-2 bg-primary-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={14} className="text-primary" />
            <span className="text-sm text-primary font-medium">
              {conversation.activityContext}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHeader;