import React, { useState, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import Icon from '../../../components/AppIcon';

const ChatInterface = ({ 
  messages, 
  onSendMessage, 
  onTyping, 
  typingUsers, 
  newMessage, 
  setNewMessage, 
  messagesEndRef 
}) => {
  const [isAtBottom, setIsAtBottom] = useState(true);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isBottom = scrollTop + clientHeight >= scrollHeight - 10;
    setIsAtBottom(isBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessageDate = (timestamp) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return messageDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = formatMessageDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  if (messages.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center bg-background-secondary">
          <div className="text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto text-text-tertiary mb-4" />
            <h3 className="font-heading font-medium text-lg text-text-secondary mb-2">
              Start the conversation
            </h3>
            <p className="text-text-tertiary max-w-xs">
              Send a message to begin chatting
            </p>
          </div>
        </div>
        
        <MessageInput
          value={newMessage}
          onChange={setNewMessage}
          onSend={onSendMessage}
          onTyping={onTyping}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        onScroll={handleScroll}
      >
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date Separator */}
            <div className="flex items-center justify-center my-4">
              <div className="bg-background-secondary px-3 py-1 rounded-full">
                <span className="text-xs font-medium text-text-tertiary">
                  {date}
                </span>
              </div>
            </div>
            
            {/* Messages for this date */}
            <div className="space-y-2">
              {dateMessages.map((message, index) => {
                const prevMessage = dateMessages[index - 1];
                const showAvatar = !prevMessage || prevMessage.senderId !== message.senderId;
                const isLastInGroup = index === dateMessages.length - 1 || 
                  dateMessages[index + 1]?.senderId !== message.senderId;
                
                return (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    showAvatar={showAvatar}
                    isLastInGroup={isLastInGroup}
                  />
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 px-4 py-2">
            <div className="w-8 h-8 bg-text-tertiary rounded-full flex items-center justify-center">
              <Icon name="MoreHorizontal" size={16} className="text-white animate-pulse" />
            </div>
            <div className="text-sm text-text-tertiary">
              {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {!isAtBottom && (
        <div className="absolute bottom-20 right-4 z-10">
          <button
            onClick={scrollToBottom}
            className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-elevation-2 hover:bg-primary-700 transition-smooth"
          >
            <Icon name="ArrowDown" size={20} className="text-white" />
          </button>
        </div>
      )}

      {/* Message Input */}
      <MessageInput
        value={newMessage}
        onChange={setNewMessage}
        onSend={onSendMessage}
        onTyping={onTyping}
      />
    </div>
  );
};

export default ChatInterface;