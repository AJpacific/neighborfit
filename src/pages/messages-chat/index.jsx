import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';

// Import components
import ConversationList from './components/ConversationList';
import ChatInterface from './components/ChatInterface';
import SearchBar from './components/SearchBar';
import ChatHeader from './components/ChatHeader';


import GroupChatModal from './components/GroupChatModal';

const MessagesChat = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [isGroupChatModalOpen, setIsGroupChatModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      type: 'direct',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Are you joining the yoga session tomorrow?',
      lastMessageTime: '2m ago',
      unreadCount: 2,
      isOnline: true,
      activityContext: 'Morning Yoga in Central Park',
      lastMessageSender: 'Sarah Chen'
    },
    {
      id: 2,
      type: 'direct',
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Great run today! Same time tomorrow?',
      lastMessageTime: '1h ago',
      unreadCount: 0,
      isOnline: false,
      activityContext: 'Evening Running Group',
      lastMessageSender: 'You'
    },
    {
      id: 3,
      type: 'group',
      name: 'Morning Runners Club',
      avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Don\'t forget to bring water bottles!',
      lastMessageTime: '3h ago',
      unreadCount: 5,
      isOnline: true,
      activityContext: null,
      lastMessageSender: 'Alex Johnson',
      memberCount: 12
    },
    {
      id: 4,
      type: 'direct',
      name: 'Emma Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the cycling tips!',
      lastMessageTime: '1d ago',
      unreadCount: 0,
      isOnline: false,
      activityContext: 'Beginner Cycling Tour',
      lastMessageSender: 'Emma Thompson'
    },
    {
      id: 5,
      type: 'group',
      name: 'Zen Yoga Collective',
      avatar: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'New meditation session added for this weekend',
      lastMessageTime: '2d ago',
      unreadCount: 1,
      isOnline: true,
      activityContext: null,
      lastMessageSender: 'Lisa Park',
      memberCount: 8
    }
  ];

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 1,
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Hi! Are you planning to join the yoga session tomorrow morning?',
      timestamp: '2024-01-15T10:30:00Z',
      type: 'text',
      status: 'read',
      isMe: false
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Yes, I\'m planning to be there! What time should we meet?',
      timestamp: '2024-01-15T10:32:00Z',
      type: 'text',
      status: 'read',
      isMe: true
    },
    {
      id: 3,
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Perfect! Let\'s meet at the park entrance at 6:45 AM. I\'ll bring extra yoga mats.',
      timestamp: '2024-01-15T10:35:00Z',
      type: 'text',
      status: 'read',
      isMe: false
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Sounds great! See you tomorrow.',
      timestamp: '2024-01-15T10:37:00Z',
      type: 'text',
      status: 'delivered',
      isMe: true
    },
    {
      id: 5,
      senderId: 'sarah-chen',
      senderName: 'Sarah Chen',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: 'Are you joining the yoga session tomorrow?',
      timestamp: '2024-01-15T14:28:00Z',
      type: 'text',
      status: 'sent',
      isMe: false
    }
  ];

  useEffect(() => {
    // Filter conversations based on search query
    if (searchQuery.trim()) {
      const filtered = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Load messages for selected conversation
    if (selectedConversation) {
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check for conversation ID in URL params
    const conversationId = searchParams.get('conversation');
    if (conversationId) {
      const conversation = conversations.find(c => c.id === parseInt(conversationId));
      if (conversation) {
        setSelectedConversation(conversation);
      }
    }
  }, [searchParams]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setSearchParams({ conversation: conversation.id });
    // Mark as read
    conversation.unreadCount = 0;
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setSearchParams({});
  };

  const handleSendMessage = (content, type = 'text') => {
    if (!content.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      senderId: 'me',
      senderName: 'You',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content,
      timestamp: new Date().toISOString(),
      type,
      status: 'sending',
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 1000);
  };

  const handleTyping = (isTyping) => {
    setIsTyping(isTyping);
    // Simulate typing indicator
    if (isTyping) {
      setTypingUsers(['Sarah Chen']);
      setTimeout(() => {
        setTypingUsers([]);
      }, 3000);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(query.length > 0);
  };

  const handleCreateGroup = () => {
    setIsGroupChatModalOpen(true);
  };

  const getTotalUnreadCount = () => {
    return conversations.reduce((total, conv) => total + conv.unreadCount, 0);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)]">
          {/* Mobile Layout */}
          <div className="lg:hidden h-full">
            {!selectedConversation ? (
              // Conversation List View
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-surface border-b border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="font-heading font-bold text-xl text-text-primary">
                      Messages
                    </h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Users"
                      onClick={handleCreateGroup}
                      className="text-accent"
                    >
                      New Group
                    </Button>
                  </div>
                  
                  <SearchBar
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search conversations..."
                  />
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                  <ConversationList
                    conversations={filteredConversations}
                    onSelectConversation={handleSelectConversation}
                    searchQuery={searchQuery}
                  />
                </div>
              </div>
            ) : (
              // Chat Interface View
              <div className="flex flex-col h-full">
                <ChatHeader
                  conversation={selectedConversation}
                  onBack={handleBackToList}
                />
                
                <ChatInterface
                  messages={messages}
                  onSendMessage={handleSendMessage}
                  onTyping={handleTyping}
                  typingUsers={typingUsers}
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  messagesEndRef={messagesEndRef}
                />
              </div>
            )}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex h-full border border-border rounded-lg overflow-hidden bg-surface">
            {/* Left Panel - Conversation List */}
            <div className="w-1/3 border-r border-border flex flex-col">
              {/* Header */}
              <div className="bg-surface border-b border-border p-4">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="font-heading font-bold text-xl text-text-primary">
                    Messages
                    {getTotalUnreadCount() > 0 && (
                      <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-primary text-white text-xs font-medium rounded-full">
                        {getTotalUnreadCount()}
                      </span>
                    )}
                  </h1>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Users"
                    onClick={handleCreateGroup}
                    className="text-accent"
                  >
                    New Group
                  </Button>
                </div>
                
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search conversations..."
                />
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                <ConversationList
                  conversations={filteredConversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={handleSelectConversation}
                  searchQuery={searchQuery}
                />
              </div>
            </div>

            {/* Right Panel - Chat Interface */}
            <div className="flex-1 flex flex-col">
              {selectedConversation ? (
                <>
                  <ChatHeader
                    conversation={selectedConversation}
                    showBackButton={false}
                  />
                  
                  <ChatInterface
                    messages={messages}
                    onSendMessage={handleSendMessage}
                    onTyping={handleTyping}
                    typingUsers={typingUsers}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                    messagesEndRef={messagesEndRef}
                  />
                </>
              ) : (
                // Empty state
                <div className="flex-1 flex items-center justify-center bg-background-secondary">
                  <div className="text-center">
                    <Icon name="MessageCircle" size={64} className="mx-auto text-text-tertiary mb-4" />
                    <h3 className="font-heading font-medium text-lg text-text-secondary mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-text-tertiary max-w-xs">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Group Chat Modal */}
      <GroupChatModal
        isOpen={isGroupChatModalOpen}
        onClose={() => setIsGroupChatModalOpen(false)}
      />

      <BottomNavigation />
    </div>
  );
};

export default MessagesChat;
