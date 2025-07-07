import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import ActivityDetailModal from '../../components/ui/ActivityDetailModal';
import SearchHeader from './components/SearchHeader';
import FilterChips from './components/FilterChips';
import ViewToggle from './components/ViewToggle';
import ActivityGrid from './components/ActivityGrid';
import MapView from './components/MapView';
import AdvancedFilters from './components/AdvancedFilters';
import SavedSearches from './components/SavedSearches';

const ActivitySearchDiscovery = () => {
  const navigate = useNavigate();
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [currentView, setCurrentView] = useState('list');
  const [sortBy, setSortBy] = useState('date');
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);
  const [joinedActivities, setJoinedActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [savedSearches, setSavedSearches] = useState([]);

  // Mock activities data
  const mockActivities = [
    {
      id: 1,
      title: "Morning Yoga in Central Park",
      type: "Yoga",
      difficulty: "Beginner",
      date: "Today",
      time: "7:00 AM",
      location: "Central Park, Sheep Meadow",
      distance: "0.8 miles",
      currentParticipants: 8,
      maxParticipants: 15,
      price: null,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      organizer: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        verified: true
      },
      description: "Start your day with peaceful yoga practice in the heart of the city. All levels welcome!"
    },
    {
      id: 2,
      title: "Basketball Pickup Game",
      type: "Basketball",
      difficulty: "Intermediate",
      date: "Tomorrow",
      time: "6:00 PM",
      location: "Riverside Park Courts",
      distance: "1.2 miles",
      currentParticipants: 6,
      maxParticipants: 10,
      price: null,
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop",
      organizer: {
        name: "Mike Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        verified: true
      },
      description: "Competitive but friendly pickup basketball. Looking for skilled players who can keep up!"
    },
    {
      id: 3,
      title: "Weekend Cycling Adventure",
      type: "Cycling",
      difficulty: "Advanced",
      date: "Saturday",
      time: "8:00 AM",
      location: "Brooklyn Bridge Start",
      distance: "2.1 miles",
      currentParticipants: 12,
      maxParticipants: 20,
      price: 15,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      organizer: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/28.jpg",
        verified: false
      },
      description: "25-mile scenic ride through Brooklyn and Manhattan. Includes bike rental and refreshments."
    },
    {
      id: 4,
      title: "Swimming Technique Workshop",
      type: "Swimming",
      difficulty: "All Levels",
      date: "Sunday",
      time: "10:00 AM",
      location: "Community Pool Center",
      distance: "0.5 miles",
      currentParticipants: 5,
      maxParticipants: 12,
      price: 25,
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=300&fit=crop",
      organizer: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/35.jpg",
        verified: true
      },
      description: "Improve your swimming technique with certified instructor. All skill levels welcome."
    },
    {
      id: 5,
      title: "Trail Running Group",
      type: "Running",
      difficulty: "Intermediate",
      date: "Wednesday",
      time: "6:30 AM",
      location: "Prospect Park Loop",
      distance: "1.8 miles",
      currentParticipants: 15,
      maxParticipants: 15,
      price: null,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      organizer: {
        name: "Lisa Johnson",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        verified: true
      },
      description: "5-mile trail run through scenic park paths. Moderate pace with optional sprint intervals."
    },
    {
      id: 6,
      title: "Tennis Doubles Tournament",
      type: "Tennis",
      difficulty: "Advanced",
      date: "Friday",
      time: "7:00 PM",
      location: "West Side Tennis Club",
      distance: "3.2 miles",
      currentParticipants: 8,
      maxParticipants: 16,
      price: 20,
      image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop",
      organizer: {
        name: "Alex Martinez",
        avatar: "https://randomuser.me/api/portraits/men/29.jpg",
        verified: true
      },
      description: "Competitive doubles tournament with prizes. Advanced players only. Equipment provided."
    }
  ];

  // Initialize activities
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter activities based on search and filters
  const filteredActivities = activities.filter(activity => {
    // Search query filter
    if (searchQuery && !activity.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !activity.type.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !activity.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Active filters
    if (activeFilters.type && activeFilters.type.length > 0 && 
        !activeFilters.type.includes(activity.type)) {
      return false;
    }

    if (activeFilters.difficulty && activeFilters.difficulty.length > 0 && 
        !activeFilters.difficulty.includes(activity.difficulty)) {
      return false;
    }

    return true;
  });

  // Sort activities
  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'popularity':
        return b.currentParticipants - a.currentParticipants;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'All Levels': 0 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      default:
        return 0; // Keep original order for date
    }
  });

  // Event handlers
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleVoiceSearch = () => {
    // Mock voice search implementation
    const voiceQueries = ['yoga', 'running', 'basketball', 'swimming'];
    const randomQuery = voiceQueries[Math.floor(Math.random() * voiceQueries.length)];
    setTimeout(() => {
      setSearchQuery(randomQuery);
    }, 2000);
  };

  const handleFilterChange = (filterId, value, remove = false) => {
    setActiveFilters(prev => {
      const currentValues = prev[filterId] || [];
      
      if (remove) {
        return {
          ...prev,
          [filterId]: currentValues.filter(v => v !== value)
        };
      }
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterId]: currentValues.filter(v => v !== value)
        };
      }
      
      return {
        ...prev,
        [filterId]: [...currentValues, value]
      };
    });
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  const handleJoinActivity = async (activityId) => {
    setJoinedActivities(prev => [...prev, activityId]);
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  const handleActivitySelect = (activity) => {
    navigate('/activity-details-registration', { state: { activity } });
  };

  const handleSaveSearch = (searchData) => {
    setSavedSearches(prev => [...prev, { ...searchData, id: Date.now() }]);
  };

  const handleLoadSearch = (search) => {
    setSearchQuery(search.query);
    setActiveFilters(search.filters || {});
  };

  const handleDeleteSearch = (searchId) => {
    setSavedSearches(prev => prev.filter(s => s.id !== searchId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 pb-16 lg:pb-0">
        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onVoiceSearch={handleVoiceSearch}
          onAdvancedFilters={() => setShowAdvancedFilters(true)}
        />

        {/* Saved Searches */}
        <SavedSearches
          savedSearches={savedSearches}
          onLoadSearch={handleLoadSearch}
          onDeleteSearch={handleDeleteSearch}
          onSaveCurrentSearch={handleSaveSearch}
          currentSearchQuery={searchQuery}
        />

        {/* Filter Chips */}
        <FilterChips
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearAllFilters}
        />

        {/* View Toggle */}
        <ViewToggle
          currentView={currentView}
          onViewChange={setCurrentView}
          resultCount={sortedActivities.length}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Content Area */}
        {currentView === 'list' ? (
          <ActivityGrid
            activities={sortedActivities}
            loading={loading}
            onJoinActivity={handleJoinActivity}
            onViewDetails={handleViewDetails}
            joinedActivities={joinedActivities}
            emptyStateMessage="Try adjusting your search criteria or expanding your search area."
          />
        ) : (
          <MapView
            activities={sortedActivities}
            onActivitySelect={handleActivitySelect}
            selectedActivity={selectedActivity}
          />
        )}
      </main>

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={activeFilters}
        onFiltersChange={setActiveFilters}
        onApplyFilters={() => setShowAdvancedFilters(false)}
        onResetFilters={handleClearAllFilters}
      />

      {/* Activity Detail Modal */}
      <ActivityDetailModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        activity={selectedActivity}
        onRegister={handleJoinActivity}
        isRegistered={selectedActivity && joinedActivities.includes(selectedActivity.id)}
      />

      <BottomNavigation />
      <FloatingActionButton />
    </div>
  );
};

export default ActivitySearchDiscovery;
