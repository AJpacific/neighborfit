import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ isOpen, onClose, activity }) => {
  const [copied, setCopied] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const shareUrl = `${window.location.origin}/activity-details-registration?id=${activity?.id}`;

  const socialPlatforms = [
    {
      name: 'WhatsApp',
      icon: 'MessageCircle',
      color: 'bg-green-500',
      url: `https://wa.me/?text=Check out this fitness activity: ${activity?.title} - ${shareUrl}`
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Twitter',
      icon: 'Twitter',
      color: 'bg-blue-400',
      url: `https://twitter.com/intent/tweet?text=Join me for ${activity?.title}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Instagram',
      icon: 'Instagram',
      color: 'bg-pink-500',
      url: '#'
    }
  ];

  const mockContacts = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', isOnline: true },
    { id: 2, name: 'Mike Chen', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', isOnline: false },
    { id: 3, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', isOnline: true },
    { id: 4, name: 'David Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', isOnline: true },
    { id: 5, name: 'Lisa Thompson', avatar: 'https://randomuser.me/api/portraits/women/5.jpg', isOnline: false }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleSocialShare = (platform) => {
    if (platform.url !== '#') {
      window.open(platform.url, '_blank', 'width=600,height=400');
    }
  };

  const toggleContactSelection = (contactId) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleSendInvites = () => {
    // Simulate sending invites
    console.log('Sending invites to:', selectedContacts);
    onClose();
  };

  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-300">
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
              Share Activity
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
            <div className="p-6 space-y-6">
              {/* Activity Preview */}
              <div className="bg-background-secondary rounded-lg p-4">
                <h3 className="font-heading font-semibold text-text-primary mb-2">
                  {activity.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{activity.location}</span>
                  </div>
                </div>
              </div>

              {/* Copy Link */}
              <div>
                <h4 className="font-heading font-medium text-text-primary mb-3">
                  Share Link
                </h4>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    variant={copied ? "success" : "outline"}
                    onClick={handleCopyLink}
                    iconName={copied ? "Check" : "Copy"}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-heading font-medium text-text-primary mb-3">
                  Share on Social Media
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {socialPlatforms.map((platform) => (
                    <button
                      key={platform.name}
                      onClick={() => handleSocialShare(platform)}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-background-secondary transition-smooth"
                    >
                      <div className={`w-8 h-8 ${platform.color} rounded-lg flex items-center justify-center`}>
                        <Icon name={platform.icon} size={16} color="white" />
                      </div>
                      <span className="font-body font-medium text-text-primary">
                        {platform.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Invites */}
              <div>
                <h4 className="font-heading font-medium text-text-primary mb-3">
                  Invite Friends Directly
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {mockContacts.map((contact) => (
                    <label
                      key={contact.id}
                      className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-background-secondary transition-smooth cursor-pointer"
                    >
                      <Input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                      />
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-10 h-10 rounded-full"
                        />
                        {contact.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-surface" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-body font-medium text-text-primary">
                          {contact.name}
                        </p>
                        <p className="font-caption text-xs text-text-secondary">
                          {contact.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
                
                {selectedContacts.length > 0 && (
                  <div className="mt-4">
                    <Button
                      variant="primary"
                      onClick={handleSendInvites}
                      iconName="Send"
                      iconPosition="left"
                      fullWidth
                    >
                      Send Invites ({selectedContacts.length})
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;