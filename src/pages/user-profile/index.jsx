import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';

// Import components
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import AboutTab from './components/AboutTab';
import ActivitiesTab from './components/ActivitiesTab';
import ReviewsTab from './components/ReviewsTab';
import SettingsTab from './components/SettingsTab';
import AchievementBadges from './components/AchievementBadges';
import SocialConnections from './components/SocialConnections';
import ContactActions from './components/ContactActions';
import PhotoGallery from './components/PhotoGallery';
import EditProfileModal from './components/EditProfileModal';

const UserProfile = () => {
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState('about');
  const [isOwner, setIsOwner] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const mockProfileData = {
    id: 1,
    name: 'Sarah Chen',
    username: '@sarahchen',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    coverImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=300&fit=crop',
    location: 'Downtown, San Francisco',
    memberSince: '2023-01-15',
    bio: 'Yoga enthusiast and running coach. Love connecting with like-minded people for outdoor adventures and mindful fitness activities. Always up for trying new workouts!',
    verified: true,
    isOnline: true,
    stats: {
      activitiesJoined: 87,
      eventsHosted: 23,
      rating: 4.8,
      totalRatings: 156,
      connections: 234,
      level: 'Advanced'
    },
    interests: ['Yoga', 'Running', 'Hiking', 'Meditation', 'Swimming', 'Cycling'],
    fitnessLevel: 'Intermediate',
    goals: ['Weight Loss', 'Flexibility', 'Endurance'],
    availability: {
      weekdays: ['Monday', 'Wednesday', 'Friday'],
      weekends: ['Saturday', 'Sunday'],
      timePreference: 'Morning'
    },
    achievements: [
      {
        id: 1,
        title: 'Regular Participant',
        description: 'Joined 50+ activities',
        icon: 'Trophy',
        color: 'text-warning',
        progress: 100,
        unlockedAt: '2023-06-15'
      },
      {
        id: 2,
        title: 'Top Organizer',
        description: 'Hosted 20+ successful events',
        icon: 'Star',
        color: 'text-primary',
        progress: 100,
        unlockedAt: '2023-09-20'
      },
      {
        id: 3,
        title: 'Community Builder',
        description: 'Connected with 200+ members',
        icon: 'Users',
        color: 'text-accent',
        progress: 100,
        unlockedAt: '2023-11-10'
      },
      {
        id: 4,
        title: 'Streak Master',
        description: 'Active for 30 consecutive days',
        icon: 'Zap',
        color: 'text-success',
        progress: 85,
        unlockedAt: null
      }
    ],
    socialConnections: [
      {
        id: 1,
        name: 'Mike Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        relationship: 'Workout Partner',
        mutualActivities: 15
      },
      {
        id: 2,
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        relationship: 'Running Buddy',
        mutualActivities: 8
      },
      {
        id: 3,
        name: 'Alex Johnson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        relationship: 'Yoga Partner',
        mutualActivities: 12
      }
    ],
    recentActivities: [
      {
        id: 1,
        title: 'Morning Yoga in Central Park',
        type: 'Yoga',
        date: '2024-01-15',
        role: 'Organizer',
        participants: 12,
        rating: 4.9,
        status: 'completed'
      },
      {
        id: 2,
        title: 'Weekend Hiking Adventure',
        type: 'Hiking',
        date: '2024-01-13',
        role: 'Participant',
        participants: 8,
        rating: 4.7,
        status: 'completed'
      },
      {
        id: 3,
        title: 'Evening Running Group',
        type: 'Running',
        date: '2024-01-20',
        role: 'Participant',
        participants: 15,
        rating: null,
        status: 'upcoming'
      }
    ],
    reviews: [
      {
        id: 1,
        reviewer: {
          name: 'Mike Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
        },
        rating: 5,
        comment: 'Sarah is an amazing yoga instructor! Her classes are well-structured and welcoming to all levels.',
        activity: 'Morning Yoga in Central Park',
        date: '2024-01-10'
      },
      {
        id: 2,
        reviewer: {
          name: 'Emma Thompson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
        },
        rating: 5,
        comment: 'Great running partner! Sarah helps maintain a good pace and is very encouraging.',
        activity: 'Evening Running Group',
        date: '2024-01-05'
      },
      {
        id: 3,
        reviewer: {
          name: 'Alex Johnson',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        rating: 4,
        comment: 'Reliable and fun to work out with. Always brings positive energy to the group.',
        activity: 'HIIT Workout Session',
        date: '2023-12-28'
      }
    ],
    photos: [
      {
        id: 1,
        url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
        activity: 'Morning Yoga in Central Park',
        date: '2024-01-15'
      },
      {
        id: 2,
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop',
        activity: 'Weekend Hiking Adventure',
        date: '2024-01-13'
      },
      {
        id: 3,
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
        activity: 'Evening Running Group',
        date: '2024-01-10'
      }
    ],
    settings: {
      privacy: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false,
        showLocation: true
      },
      notifications: {
        activityInvites: true,
        messages: true,
        weeklyDigest: true,
        promotions: false
      },
      preferences: {
        language: 'en',
        timezone: 'America/Los_Angeles',
        units: 'metric'
      }
    }
  };

  useEffect(() => {
    // Simulate API call
    const loadProfile = async () => {
      setLoading(true);
      try {
        // In real app, fetch profile data based on userId
        setTimeout(() => {
          setProfileData(mockProfileData);
          setIsOwner(!userId || userId === 'me'); // Owner if no userId or userId is 'me'
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading profile:', error);
        setLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (updatedData) => {
    setProfileData(prev => ({ ...prev, ...updatedData }));
    setIsEditModalOpen(false);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleSendMessage = () => {
    // Navigate to messages with this user
    console.log('Opening message conversation with', profileData.name);
  };

  const handleInviteToActivity = () => {
    // Open activity invitation modal
    console.log('Inviting', profileData.name, 'to activity');
  };

  const handleBlock = () => {
    // Handle block user
    console.log('Blocking user', profileData.name);
  };

  const handleReport = () => {
    // Handle report user
    console.log('Reporting user', profileData.name);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 pb-16 lg:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-48 bg-background-secondary rounded-lg mb-4"></div>
              <div className="h-6 bg-background-secondary rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-background-secondary rounded w-1/4 mb-4"></div>
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="h-16 bg-background-secondary rounded"></div>
                <div className="h-16 bg-background-secondary rounded"></div>
                <div className="h-16 bg-background-secondary rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pt-20 pb-16 lg:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <Icon name="UserX" size={64} className="mx-auto text-text-tertiary mb-4" />
              <h2 className="font-heading font-bold text-2xl text-text-primary mb-2">
                User not found
              </h2>
              <p className="text-text-secondary mb-6">
                The user you're looking for doesn't exist or has been removed.
              </p>
              <Button variant="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 pb-16 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <ProfileHeader
            profile={profileData}
            isOwner={isOwner}
            onEdit={handleEditProfile}
          />

          {/* Achievement Badges */}
          <AchievementBadges achievements={profileData.achievements} />

          {/* Contact Actions */}
          {!isOwner && (
            <ContactActions
              isFollowing={isFollowing}
              onFollowToggle={handleFollowToggle}
              onSendMessage={handleSendMessage}
              onInviteToActivity={handleInviteToActivity}
              onBlock={handleBlock}
              onReport={handleReport}
            />
          )}

          {/* Social Connections */}
          <SocialConnections connections={profileData.socialConnections} />

          {/* Tab Navigation */}
          <ProfileTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOwner={isOwner}
          />

          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'about' && (
              <AboutTab profile={profileData} />
            )}
            {activeTab === 'activities' && (
              <ActivitiesTab activities={profileData.recentActivities} />
            )}
            {activeTab === 'reviews' && (
              <ReviewsTab reviews={profileData.reviews} />
            )}
            {activeTab === 'photos' && (
              <PhotoGallery photos={profileData.photos} />
            )}
            {activeTab === 'settings' && isOwner && (
              <SettingsTab
                settings={profileData.settings}
                onSave={(settings) => setProfileData(prev => ({ ...prev, settings }))}
              />
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profileData}
        onSave={handleSaveProfile}
      />

      <BottomNavigation />
    </div>
  );
};

export default UserProfile;
