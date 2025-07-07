import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ActivityHero from './components/ActivityHero';
import ActivityTabs from './components/ActivityTabs';
import OrganizerProfile from './components/OrganizerProfile';
import RegistrationModal from './components/RegistrationModal';
import ShareModal from './components/ShareModal';
import SafetyInfo from './components/SafetyInfo';

const ActivityDetailsRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activity, setActivity] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [comments, setComments] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock activity data
  const mockActivity = {
    id: 1,
    title: "Morning Yoga in Central Park",
    description: `Join us for a peaceful morning yoga session in the heart of Central Park. This beginner-friendly class focuses on gentle stretches, breathing techniques, and mindfulness practices to start your day with positive energy.\n\nOur certified instructor will guide you through a series of poses suitable for all fitness levels. We'll practice on the Great Lawn with beautiful views of the city skyline as our backdrop.\n\nThis is a wonderful opportunity to connect with like-minded individuals while improving your flexibility, strength, and mental well-being. All equipment will be provided, but feel free to bring your own mat if you prefer.`,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "Tomorrow, March 15",
    time: "7:00 AM - 8:30 AM",
    duration: "1.5 hours",
    location: "Central Park Great Lawn",
    address: "Central Park, New York, NY 10024",
    coordinates: { lat: 40.7829, lng: -73.9654 },
    price: 0,
    difficulty: "Beginner",
    status: "open",
    currentParticipants: 8,
    maxParticipants: 15,
    rating: 4.8,
    organizer: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Certified yoga instructor with 8 years of experience. Passionate about making yoga accessible to everyone.",
      rating: 4.9,
      reviewCount: 127,
      activitiesHosted: 45,
      totalParticipants: 680,
      yearsActive: 3,
      verified: true,
      isPro: true,
      specialties: ["Hatha Yoga", "Vinyasa", "Meditation", "Breathwork"],
      certifications: [
        "200-Hour Yoga Teacher Training (YTT)",
        "Certified Meditation Instructor",
        "First Aid & CPR Certified"
      ]
    },
    requirements: [
      "No prior yoga experience necessary",
      "Comfortable clothing that allows movement",
      "Arrive 10 minutes early for setup",
      "Bring water bottle for hydration"
    ],
    whatToBring: [
      "Yoga mat (or we'll provide one)","Water bottle","Small towel","Comfortable workout clothes"
    ],
    meetingInstructions: "Meet at the Great Lawn entrance near 85th Street and Central Park West. Look for the NeighborFit banner and yoga mats setup. Sarah will be wearing a purple yoga top.",cancellationPolicy: "Free cancellation up to 2 hours before the activity starts. No-shows may be charged a $5 fee.",weatherPolicy: "In case of rain, we'll move to the nearby covered pavilion. Activity will be cancelled only in severe weather conditions.",
    nearbyAmenities: [
      { name: "Restrooms", icon: "MapPin" },
      { name: "Parking", icon: "Car" },
      { name: "Water Fountain", icon: "Droplets" },
      { name: "Cafe", icon: "Coffee" }
    ],
    directions: "Take the subway to 86th Street (B/C lines) or 81st Street (A/B/C lines). Enter Central Park at 85th Street and walk towards the Great Lawn. Free street parking available on weekends."
  };

  const mockParticipants = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      fitnessLevel: "Advanced",
      rating: 4.9,
      verified: true,
      isOrganizer: true
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      fitnessLevel: "Intermediate",
      rating: 4.7,
      verified: true,
      isOrganizer: false
    },
    {
      id: 3,
      name: "Emma Thompson",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      fitnessLevel: "Beginner",
      rating: 4.5,
      verified: false,
      isOrganizer: false
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      fitnessLevel: "Intermediate",
      rating: 4.8,
      verified: true,
      isOrganizer: false
    },
    {
      id: 5,
      name: "Lisa Johnson",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      fitnessLevel: "Beginner",
      rating: 4.6,
      verified: true,
      isOrganizer: false
    }
  ];

  const mockComments = [
    {
      id: 1,
      author: {
        name: "Mike Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg"
      },
      content: "Looking forward to this! I've been wanting to try yoga for a while. Is it really suitable for complete beginners?",
      timestamp: "2 hours ago",
      likes: 3
    },
    {
      id: 2,
      author: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg"
      },
      content: "Absolutely! This class is designed specifically for beginners. I'll provide modifications for all poses and we'll go at a comfortable pace for everyone.",
      timestamp: "1 hour ago",
      likes: 5
    },
    {
      id: 3,
      author: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg"
      },
      content: "The weather looks perfect for tomorrow morning. Can't wait to practice outdoors!",
      timestamp: "45 minutes ago",
      likes: 2
    }
  ];

  useEffect(() => {
    // Simulate loading activity data
    const activityFromState = location.state?.activity;
    if (activityFromState) {
      setActivity(activityFromState);
    } else {
      setActivity(mockActivity);
    }
    
    setParticipants(mockParticipants);
    setComments(mockComments);
    
    // Check if user is already registered (mock check)
    const registeredActivities = JSON.parse(localStorage.getItem('registeredActivities') || '[]');
    setIsRegistered(registeredActivities.includes(mockActivity.id));
  }, [location.state]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleRegister = () => {
    if (activity.price > 0) {
      setShowRegistrationModal(true);
    } else {
      // For free activities, register immediately
      setIsRegistering(true);
      setTimeout(() => {
        setIsRegistered(true);
        setIsRegistering(false);
        
        // Save to localStorage
        const registeredActivities = JSON.parse(localStorage.getItem('registeredActivities') || '[]');
        registeredActivities.push(activity.id);
        localStorage.setItem('registeredActivities', JSON.stringify(registeredActivities));
        
        // Update participant count
        setActivity(prev => ({
          ...prev,
          currentParticipants: prev.currentParticipants + 1
        }));
      }, 1500);
    }
  };

  const handleRegistrationConfirm = (formData) => {
    setIsProcessing(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsProcessing(false);
      setShowRegistrationModal(false);
      setIsRegistered(true);
      
      // Save to localStorage
      const registeredActivities = JSON.parse(localStorage.getItem('registeredActivities') || '[]');
      registeredActivities.push(activity.id);
      localStorage.setItem('registeredActivities', JSON.stringify(registeredActivities));
      
      // Update participant count
      setActivity(prev => ({
        ...prev,
        currentParticipants: prev.currentParticipants + 1
      }));
      
      if (activity.price > 0) {
        // Redirect to payment (mock)
        console.log('Redirecting to payment...', formData);
      }
    }, 2000);
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (!activity) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="font-body text-text-secondary">Loading activity details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 lg:pt-20 pb-16 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Search
            </Button>
          </div>

          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Activity Hero */}
              <ActivityHero
                activity={activity}
                onRegister={handleRegister}
                isRegistered={isRegistered}
                isRegistering={isRegistering}
              />

              {/* Activity Tabs */}
              <ActivityTabs
                activity={activity}
                participants={participants}
                comments={comments}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 mt-8 lg:mt-0 space-y-6">
              {/* Quick Actions - Mobile */}
              <div className="lg:hidden bg-surface border border-border rounded-lg p-4">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    iconName="Share2"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Share
                  </Button>
                  <Button
                    variant="ghost"
                    iconName="Heart"
                    iconPosition="left"
                    className="flex-1"
                  >
                    Save
                  </Button>
                </div>
              </div>

              {/* Desktop Sticky Sidebar */}
              <div className="hidden lg:block lg:sticky lg:top-24 space-y-6">
                {/* Quick Stats */}
                <div className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="font-heading font-semibold text-lg text-text-primary mb-4">
                    Quick Info
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Date</span>
                      <span className="font-body font-medium text-text-primary">{activity.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Time</span>
                      <span className="font-body font-medium text-text-primary">{activity.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Duration</span>
                      <span className="font-body font-medium text-text-primary">{activity.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Cost</span>
                      <span className="font-body font-medium text-text-primary">
                        {activity.price === 0 ? 'Free' : `$${activity.price}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-body text-text-secondary">Spots</span>
                      <span className="font-body font-medium text-text-primary">
                        {activity.currentParticipants}/{activity.maxParticipants}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-border">
                    <Button
                      variant={isRegistered ? "success" : "primary"}
                      onClick={handleRegister}
                      loading={isRegistering}
                      disabled={isRegistered || activity.status === 'full'}
                      fullWidth
                      iconName={isRegistered ? "Check" : "UserPlus"}
                      iconPosition="left"
                    >
                      {isRegistered ? 'Registered!' : 'Join Activity'}
                    </Button>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={handleShare}
                      iconName="Share2"
                      className="flex-1"
                    >
                      Share
                    </Button>
                    <Button
                      variant="ghost"
                      iconName="Heart"
                      className="flex-1"
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Organizer Profile */}
                <OrganizerProfile organizer={activity.organizer} />

                {/* Safety Info */}
                <SafetyInfo activity={activity} />
              </div>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={showRegistrationModal}
        onClose={() => setShowRegistrationModal(false)}
        activity={activity}
        onConfirm={handleRegistrationConfirm}
        isProcessing={isProcessing}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        activity={activity}
      />
    </div>
  );
};

export default ActivityDetailsRegistration;
