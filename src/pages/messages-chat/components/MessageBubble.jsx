import React from 'react';
import Icon from '../../../components/AppIcon';

const MessageBubble = ({ message, showAvatar, isLastInGroup }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Icon name="Clock" size={12} className="text-text-tertiary" />;
      case 'sent':
        return <Icon name="Check" size={12} className="text-text-tertiary" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={12} className="text-text-tertiary" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} className="text-primary" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'location':
        return (
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            <span>Location shared</span>
          </div>
        );
      case 'activity':
        return (
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-accent" />
            <span>Activity invitation</span>
          </div>
        );
      case 'image':
        return (
          <div className="rounded-lg overflow-hidden">
            <img
              src={message.content}
              alt="Shared image"
              className="max-w-xs max-h-64 object-cover"
            />
          </div>
        );
      default:
        return <span className="whitespace-pre-wrap">{message.content}</span>;
    }
  };

  return (
    <div className={`flex items-end space-x-2 ${message.isMe ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        {showAvatar && !message.isMe ? (
          <img
            src={message.senderAvatar}
            alt={message.senderName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>

      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${message.isMe ? 'items-end' : 'items-start'}`}>
        {/* Sender Name (for group chats) */}
        {showAvatar && !message.isMe && (
          <div className="mb-1">
            <span className="text-xs font-medium text-text-secondary">
              {message.senderName}
            </span>
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-lg ${
            message.isMe
              ? 'bg-primary text-white' :'bg-background-secondary text-text-primary'
          } ${
            showAvatar && !message.isMe
              ? 'rounded-tl-none'
              : message.isMe
              ? 'rounded-tr-none' :''
          }`}
        >
          {renderMessageContent()}
        </div>

        {/* Message Meta */}
        {isLastInGroup && (
          <div className={`flex items-center space-x-1 mt-1 ${message.isMe ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs text-text-tertiary">
              {formatTime(message.timestamp)}
            </span>
            {message.isMe && getStatusIcon(message.status)}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;