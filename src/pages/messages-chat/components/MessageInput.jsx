import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MessageInput = ({ value, onChange, onSend, onTyping }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSend = () => {
    if (value.trim()) {
      onSend(value);
      onChange('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    onChange(e.target.value);
    onTyping?.(e.target.value.length > 0);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleEmojiSelect = (emoji) => {
    onChange(value + emoji);
    setShowEmojiPicker(false);
  };

  const handleFileUpload = (type) => {
    // Handle file upload based on type
    if (type === 'photo') {
      fileInputRef.current.accept = 'image/*';
    } else if (type === 'document') {
      fileInputRef.current.accept = '*/*';
    }
    fileInputRef.current.click();
    setShowAttachments(false);
  };

  const handleFileSelected = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload
      console.log('File selected:', file);
      // You would typically upload the file here and then send a message
    }
  };

  const handleLocationShare = () => {
    // Handle location sharing
    console.log('Sharing location');
    onSend('📍 Current location shared', 'location');
    setShowAttachments(false);
  };

  const handleActivityInvite = () => {
    // Handle activity invitation
    console.log('Sending activity invite');
    onSend('🏃‍♂️ Activity invitation sent', 'activity');
    setShowAttachments(false);
  };

  const commonEmojis = ['😊', '😂', '❤️', '👍', '👎', '😢', '😮', '😡', '🎉', '💪', '🏃‍♂️', '🧘‍♀️'];

  return (
    <div className="bg-surface border-t border-border p-4">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-4 p-3 bg-background-secondary rounded-lg">
          <div className="flex flex-wrap gap-2">
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl hover:bg-background-tertiary p-1 rounded transition-smooth"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attachments Menu */}
      {showAttachments && (
        <div className="mb-4 p-3 bg-background-secondary rounded-lg">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => handleFileUpload('photo')}
              className="flex flex-col items-center space-y-2 p-3 bg-surface rounded-lg hover:bg-background-tertiary transition-smooth"
            >
              <Icon name="Camera" size={24} className="text-accent" />
              <span className="text-sm font-medium">Photo</span>
            </button>
            
            <button
              onClick={() => handleFileUpload('document')}
              className="flex flex-col items-center space-y-2 p-3 bg-surface rounded-lg hover:bg-background-tertiary transition-smooth"
            >
              <Icon name="FileText" size={24} className="text-accent" />
              <span className="text-sm font-medium">Document</span>
            </button>
            
            <button
              onClick={handleLocationShare}
              className="flex flex-col items-center space-y-2 p-3 bg-surface rounded-lg hover:bg-background-tertiary transition-smooth"
            >
              <Icon name="MapPin" size={24} className="text-accent" />
              <span className="text-sm font-medium">Location</span>
            </button>
            
            <button
              onClick={handleActivityInvite}
              className="flex flex-col items-center space-y-2 p-3 bg-surface rounded-lg hover:bg-background-tertiary transition-smooth"
            >
              <Icon name="Calendar" size={24} className="text-accent" />
              <span className="text-sm font-medium">Activity</span>
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="flex items-end space-x-3">
        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="Paperclip"
          onClick={() => setShowAttachments(!showAttachments)}
          className="flex-shrink-0"
        />

        {/* Input Area */}
        <div className="flex-1 flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full min-h-[40px] max-h-32 p-3 pr-12 bg-background-secondary border border-border-secondary rounded-lg resize-none focus:outline-none focus:border-primary focus:bg-surface transition-smooth"
              style={{ height: 'auto' }}
            />
            
            {/* Emoji Button */}
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-smooth"
            >
              <Icon name="Smile" size={20} />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <Button
          variant="primary"
          size="sm"
          iconName="Send"
          onClick={handleSend}
          disabled={!value.trim()}
          className="flex-shrink-0"
        />
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelected}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;