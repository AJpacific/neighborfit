import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationList = ({ 
  conversations, 
  selectedConversation, 
  onSelectConversation, 
  searchQuery 
}) => {
  const formatTime = (timeString) => {
    const now = new Date();
    const messageTime = new Date(timeString);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const highlightSearchTerm = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary-100 text-primary-800 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  if (conversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center p-4">
        <Icon name="MessageCircle" size={48} className="text-text-tertiary mb-4" />
        <h3 className="font-heading font-medium text-lg text-text-secondary mb-2">
          {searchQuery ? 'No conversations found' : 'No messages yet'}
        </h3>
        <p className="text-text-tertiary max-w-xs">
          {searchQuery 
            ? 'Try adjusting your search terms' :'Start a conversation by joining an activity or connecting with community members'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border-secondary">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          className={`p-4 hover:bg-background-secondary cursor-pointer transition-smooth ${
            selectedConversation?.id === conversation.id ? 'bg-primary-50 border-r-2 border-primary' : ''
          }`}
        >
          <div className="flex items-start space-x-3">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <img
                src={conversation.avatar}
                alt={conversation.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {conversation.type === 'group' && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                  <Icon name="Users" size={10} className="text-white" />
                </div>
              )}
              {conversation.type === 'direct' && conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-body font-medium text-text-primary truncate">
                  {highlightSearchTerm(conversation.name, searchQuery)}
                  {conversation.type === 'group' && (
                    <span className="ml-2 text-xs text-text-tertiary">
                      ({conversation.memberCount})
                    </span>
                  )}
                </h3>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className="text-xs text-text-tertiary">
                    {conversation.lastMessageTime}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-secondary truncate">
                    {conversation.lastMessageSender !== 'You' && conversation.type === 'group' && (
                      <span className="font-medium">
                        {conversation.lastMessageSender}:{' '}
                      </span>
                    )}
                    {highlightSearchTerm(conversation.lastMessage, searchQuery)}
                  </p>
                  {conversation.activityContext && (
                    <p className="text-xs text-accent mt-1 truncate">
                      <Icon name="Calendar" size={12} className="inline mr-1" />
                      {conversation.activityContext}
                    </p>
                  )}
                </div>
                
                {conversation.lastMessageSender === 'You' && (
                  <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                    <Icon 
                      name="Check" 
                      size={14} 
                      className="text-text-tertiary" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationList;