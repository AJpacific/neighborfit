import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserRegistration from "pages/user-registration";
import UserLogin from "pages/user-login";
import CreateActivity from "pages/create-activity";
import ActivitySearchDiscovery from "pages/activity-search-discovery";
import ActivityDetailsRegistration from "pages/activity-details-registration";
import CommunityDashboard from "pages/community-dashboard";
import MessagesChat from "pages/messages-chat";
import UserProfile from "pages/user-profile";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CommunityDashboard />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/create-activity" element={<CreateActivity />} />
        <Route path="/activity-search-discovery" element={<ActivitySearchDiscovery />} />
        <Route path="/activity-details-registration" element={<ActivityDetailsRegistration />} />
        <Route path="/community-dashboard" element={<CommunityDashboard />} />
        <Route path="/messages-chat" element={<MessagesChat />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/user-profile/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;