import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ActivityDetailModal from '../../components/ui/ActivityDetailModal';

// Import all components
import ActivityCard from './components/ActivityCard';
import QuickStatsPanel from './components/QuickStatsPanel';
import WeatherWidget from './components/WeatherWidget';
import TodayActivitiesSection from './components/TodayActivitiesSection';
import TrendingGroupsSection from './components/TrendingGroupsSection';
import UpcomingEventsPanel from './components/UpcomingEventsPanel';
import SuggestedConnectionsPanel from './components/SuggestedConnectionsPanel';

const CommunityDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredActivities, setRegisteredActivities] = useState(new Set());

  // Mock data
  const userStats = {
    weeklyActivities: 5,
    newConnections: 3,
    upcomingEvents: 2,
    achievements: 8,
    activitiesTrend: 12,
    connectionsTrend: 25,
    eventsTrend: 0,
    achievementsTrend: 33,
    level: 3,
    levelProgress: 65
  };

  const weatherData = {
    location: "Downtown",
    temperature: 72,
    feelsLike: 75,
    condition: "sunny",
    humidity: 45,
    windSpeed: 8,
    visibility: 10
  };

  const communityActivities = [
    {
      id: 1,
      organizer: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      },
      title: "Morning Yoga in Central Park",
      description: "Join us for a peaceful morning yoga session surrounded by nature. All levels welcome! Bring your own mat or rent one for $5.",
      type: "Yoga",
      date: "Today",
      time: "7:00 AM",
      location: "Central Park East Meadow",
      distance: 0.8,
      participants: 8,
      maxParticipants: 15,
      timeAgo: "2 hours ago",
      likes: 12,
      comments: 3,
      isLiked: false,
      participantAvatars: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      ]
    },
    {
      id: 2,
      organizer: {
        name: "Mike Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      title: "Evening Running Group",
      description: "Weekly 5K run through the neighborhood. We maintain a comfortable pace and welcome runners of all abilities. Post-run coffee included!",
      type: "Running",
      date: "Today",
      time: "6:30 PM",
      location: "Riverside Trail",
      distance: 1.2,
      participants: 12,
      maxParticipants: 20,
      timeAgo: "4 hours ago",
      likes: 18,
      comments: 7,
      isLiked: true,
      participantAvatars: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      ]
    },
    {
      id: 3,
      organizer: {
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      title: "Beginner Cycling Tour",
      description: "Explore the city on two wheels! This beginner-friendly cycling tour covers scenic routes with plenty of stops for photos and refreshments.",
      type: "Cycling",
      date: "Tomorrow",
      time: "9:00 AM",
      location: "City Park Entrance",
      distance: 2.1,
      participants: 6,
      maxParticipants: 12,
      timeAgo: "1 day ago",
      likes: 9,
      comments: 2,
      isLiked: false,
      participantAvatars: [
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      ]
    }
  ];

  const todayActivities = [
    {
      id: 4,
      title: "HIIT Workout Session",
      description: "High-intensity interval training to boost your metabolism and build strength. Perfect for busy schedules!",
      type: "Gym",
      time: "12:00 PM",
      location: "FitZone Gym",
      distance: 0.5,
      participants: 4,
      maxParticipants: 8,
      organizer: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 5,
      title: "Sunset Beach Walk",
      description: "Relaxing walk along the beach while watching the sunset. Great for unwinding after a long day.",
      type: "Walking",
      time: "7:00 PM",
      location: "Sunset Beach",
      distance: 3.2,
      participants: 7,
      maxParticipants: 15,
      organizer: {
        name: "Lisa Park",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 6,
      title: "Tennis Practice",
      description: "Improve your tennis skills with friendly matches and coaching tips from experienced players.",
      type: "Tennis",
      time: "4:00 PM",
      location: "Community Tennis Courts",
      distance: 1.8,
      participants: 6,
      maxParticipants: 8,
      organizer: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      }
    }
  ];

  const trendingGroups = [
    {
      id: 1,
      name: "Morning Runners Club",
      description: "Early birds who love to start their day with a good run. We meet every weekday at 6 AM for various distance runs.",
      category: "Running",
      location: "Downtown",
      members: 45,
      activities: 28,
      weeklyMeetings: 5,
      trending: "hot",
      rating: 4.8,
      lastActivity: "2 hours ago",
      recentActivityText: "Completed 5K charity run",
      memberAvatars: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
      ]
    },
    {
      id: 2,
      name: "Zen Yoga Collective",
      description: "A peaceful community focused on mindfulness, flexibility, and inner balance through various yoga practices.",
      category: "Yoga",
      location: "Westside",
      members: 32,
      activities: 15,
      weeklyMeetings: 3,
      trending: "growing",
      rating: 4.9,
      lastActivity: "1 day ago",
      recentActivityText: "Hosted outdoor meditation session",
      memberAvatars: [
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      ]
    },
    {
      id: 3,
      name: "Cycling Enthusiasts",
      description: "Weekend warriors and daily commuters united by our love for cycling. From casual rides to challenging trails.",
      category: "Cycling",
      location: "Northside",
      members: 28,
      activities: 22,
      weeklyMeetings: 2,
      trending: "new",
      rating: 4.6,
      lastActivity: "3 days ago",
      recentActivityText: "Organized 50-mile weekend ride",
      memberAvatars: [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      ]
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Community Fitness Challenge",
      type: "Challenge",
      date: "Dec 15",
      time: "9:00 AM",
      dateTime: "2024-12-15T09:00:00",
      location: "Central Community Center",
      participants: 25,
      maxParticipants: 50,
      priority: "high",
      organizer: {
        name: "Fitness Committee",
        avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      title: "Nutrition Workshop",
      type: "Workshop",
      date: "Dec 18",
      time: "2:00 PM",
      dateTime: "2024-12-18T14:00:00",
      location: "Health Center Room A",
      participants: 12,
      maxParticipants: 20,
      priority: "medium",
      organizer: {
        name: "Dr. Maria Santos",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 3,
      title: "Weekend Hiking Trip",
      type: "Walking",
      date: "Dec 21",
      time: "7:00 AM",
      dateTime: "2024-12-21T07:00:00",
      location: "Mountain Trail Head",
      participants: 8,
      maxParticipants: 15,
      priority: "low",
      organizer: {
        name: "Adventure Club",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
      }
    }
  ];

  const suggestedConnections = [
    {
      id: 1,
      name: "Jennifer Walsh",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "Downtown",
      distance: 0.3,
      reason: "location",
      activityLevel: "intermediate",
      interests: ["Yoga", "Running", "Meditation", "Hiking"],
      mutualFriends: 3,
      verified: true,
      isOnline: true,
      recentActivity: "Completed morning yoga session"
    },
    {
      id: 2,
      name: "Carlos Rodriguez",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Westside",
      distance: 1.5,
      reason: "interests",
      activityLevel: "advanced",
      interests: ["Cycling", "Swimming", "Triathlon"],
      mutualFriends: 5,
      verified: true,
      isOnline: false,
      recentActivity: "Joined cycling group ride"
    },
    {
      id: 3,
      name: "Amanda Foster",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Eastside",
      distance: 2.1,
      reason: "activity",
      activityLevel: "beginner",
      interests: ["Walking", "Yoga", "Dancing"],
      mutualFriends: 2,
      verified: false,
      isOnline: true,
      recentActivity: "Started fitness journey"
    }
  ];

  // Handlers
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  const handleJoinActivity = (activityId) => {
    setRegisteredActivities(prev => new Set([...prev, activityId]));
    // Show success message or handle API call
  };

  const handleLikeActivity = (activityId, isLiked) => {
    // Handle like/unlike logic
    console.log(`Activity ${activityId} ${isLiked ? 'liked' : 'unliked'}`);
  };

  const handleCommentActivity = (activityId) => {
    // Handle comment logic
    console.log(`Comment on activity ${activityId}`);
  };

  const handleJoinGroup = (groupId) => {
    // Handle group join logic
    console.log(`Joined group ${groupId}`);
  };

  const handleJoinEvent = (eventId) => {
    // Handle event join logic
    console.log(`Joined event ${eventId}`);
  };

  const handleConnect = (connectionId) => {
    // Handle connection logic
    console.log(`Connected with ${connectionId}`);
  };

  const handleDismissConnection = (connectionId) => {
    // Handle dismiss logic
    console.log(`Dismissed connection ${connectionId}`);
  };

  const handleActivityCardClick = (activity) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  const handleRegisterActivity = async (activityId) => {
    setRegisteredActivities(prev => new Set([...prev, activityId]));
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 lg:pt-20 pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center py-4">
                <Icon name="RefreshCw" size={20} className="animate-spin text-primary" />
                <span className="ml-2 font-body text-text-secondary">Refreshing...</span>
              </div>
            )}

            {/* Quick Stats */}
            <QuickStatsPanel stats={userStats} />

            {/* Weather Widget */}
            <WeatherWidget weather={weatherData} />

            {/* Today's Activities */}
            <TodayActivitiesSection 
              activities={todayActivities}
              onJoinActivity={handleJoinActivity}
            />

            {/* Trending Groups */}
            <TrendingGroupsSection 
              groups={trendingGroups}
              onJoinGroup={handleJoinGroup}
            />

            {/* Community Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-xl text-text-primary">
                  Community Feed
                </h2>
                <button
                  onClick={handleRefresh}
                  className="text-accent hover:text-accent-700 transition-smooth"
                  disabled={isRefreshing}
                >
                  <Icon name="RefreshCw" size={20} className={isRefreshing ? 'animate-spin' : ''} />
                </button>
              </div>
              
              {communityActivities.map((activity) => (
                <div key={activity.id} onClick={() => handleActivityCardClick(activity)}>
                  <ActivityCard
                    activity={activity}
                    onJoin={handleJoinActivity}
                    onLike={handleLikeActivity}
                    onComment={handleCommentActivity}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <QuickStatsPanel stats={userStats} />
              <WeatherWidget weather={weatherData} />
              <SuggestedConnectionsPanel 
                connections={suggestedConnections}
                onConnect={handleConnect}
                onDismiss={handleDismissConnection}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* Pull to Refresh Indicator */}
              {isRefreshing && (
                <div className="flex items-center justify-center py-4">
                  <Icon name="RefreshCw" size={20} className="animate-spin text-primary" />
                  <span className="ml-2 font-body text-text-secondary">Refreshing...</span>
                </div>
              )}

              {/* Today's Activities */}
              <TodayActivitiesSection 
                activities={todayActivities}
                onJoinActivity={handleJoinActivity}
              />

              {/* Trending Groups */}
              <TrendingGroupsSection 
                groups={trendingGroups}
                onJoinGroup={handleJoinGroup}
              />

              {/* Community Feed */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-bold text-xl text-text-primary">
                    Community Feed
                  </h2>
                  <button
                    onClick={handleRefresh}
                    className="text-accent hover:text-accent-700 transition-smooth"
                    disabled={isRefreshing}
                  >
                    <Icon name="RefreshCw" size={20} className={isRefreshing ? 'animate-spin' : ''} />
                  </button>
                </div>
                
                {communityActivities.map((activity) => (
                  <div key={activity.id} onClick={() => handleActivityCardClick(activity)}>
                    <ActivityCard
                      activity={activity}
                      onJoin={handleJoinActivity}
                      onLike={handleLikeActivity}
                      onComment={handleCommentActivity}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <UpcomingEventsPanel 
                events={upcomingEvents}
                onJoinEvent={handleJoinEvent}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        activity={selectedActivity}
        onRegister={handleRegisterActivity}
        isRegistered={selectedActivity ? registeredActivities.has(selectedActivity.id) : false}
      />

      {/* Bottom Navigation */}
      <BottomNavigation />
      
      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
};

export default CommunityDashboard;
