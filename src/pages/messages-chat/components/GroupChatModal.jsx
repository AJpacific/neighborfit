import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GroupChatModal = ({ isOpen, onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for potential group members
  const contacts = [
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '2 hours ago'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null
    },
    {
      id: 4,
      name: 'Alex Johnson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: false,
      lastSeen: '1 day ago'
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
      lastSeen: null
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMemberToggle = (contact) => {
    setSelectedMembers(prev => {
      const exists = prev.find(m => m.id === contact.id);
      if (exists) {
        return prev.filter(m => m.id !== contact.id);
      } else {
        return [...prev, contact];
      }
    });
  };

  const handleCreateGroup = () => {
    if (groupName.trim() && selectedMembers.length > 0) {
      // Handle group creation
      console.log('Creating group:', {
        name: groupName,
        members: selectedMembers
      });
      
      // Reset form
      setGroupName('');
      setSelectedMembers([]);
      setSearchQuery('');
      onClose();
    }
  };

  const handleClose = () => {
    setGroupName('');
    setSelectedMembers([]);
    setSearchQuery('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-lg text-text-primary">
            New Group Chat
          </h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={handleClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Group Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Group Name
            </label>
            <Input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Selected Members */}
          {selectedMembers.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Selected Members ({selectedMembers.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center space-x-2 bg-primary-50 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="font-medium">{member.name}</span>
                    <button
                      onClick={() => handleMemberToggle(member)}
                      className="text-primary hover:text-primary-700 transition-smooth"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search Contacts */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Add Members
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-tertiary">
                <Icon name="Search" size={16} />
              </div>
              <Input
                type="text"
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="space-y-2">
            {filteredContacts.map((contact) => {
              const isSelected = selectedMembers.some(m => m.id === contact.id);
              
              return (
                <div
                  key={contact.id}
                  onClick={() => handleMemberToggle(contact)}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-smooth ${
                    isSelected
                      ? 'bg-primary-50 border border-primary' :'hover:bg-background-secondary'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {contact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-text-primary">
                      {contact.name}
                    </h3>
                    <p className="text-sm text-text-tertiary">
                      {contact.isOnline ? 'Online' : `Last seen ${contact.lastSeen}`}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="text-primary">
                      <Icon name="Check" size={20} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-text-tertiary mb-4" />
              <p className="text-text-tertiary">No contacts found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleCreateGroup}
              disabled={!groupName.trim() || selectedMembers.length === 0}
              className="flex-1"
            >
              Create Group
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;