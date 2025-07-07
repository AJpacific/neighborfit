import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ 
  activities, 
  onActivitySelect, 
  selectedActivity,
  userLocation = { lat: 40.7128, lng: -74.0060 } // Default to NYC
}) => {
  const [mapCenter, setMapCenter] = useState(userLocation);
  const [zoom, setZoom] = useState(12);

  // Generate map markers for activities
  const generateMapUrl = () => {
    const markers = activities.map((activity, index) => {
      const lat = userLocation.lat + (Math.random() - 0.5) * 0.1; // Mock nearby locations
      const lng = userLocation.lng + (Math.random() - 0.5) * 0.1;
      return `${lat},${lng}`;
    }).join('|');

    return `https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=${zoom}&output=embed`;
  };

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 1, 18));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 1, 8));
  };

  const handleRecenter = () => {
    setMapCenter(userLocation);
    setZoom(12);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-surface rounded-xl border border-border overflow-hidden shadow-elevation-2">
        {/* Map Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background-secondary">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} color="var(--color-primary)" />
            <h3 className="font-heading font-semibold text-text-primary">
              Activity Locations
            </h3>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
              {activities.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={handleRecenter}
              iconName="Navigation"
              className="p-2"
              title="Center on my location"
            />
          </div>
        </div>

        {/* Map Container */}
        <div className="relative h-96 lg:h-[500px]">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Activity Locations Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={generateMapUrl()}
            className="w-full h-full"
          />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={handleZoomIn}
              className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center text-text-primary hover:bg-background-secondary transition-smooth shadow-elevation-1"
              title="Zoom in"
            >
              <Icon name="Plus" size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              className="w-10 h-10 bg-surface border border-border rounded-lg flex items-center justify-center text-text-primary hover:bg-background-secondary transition-smooth shadow-elevation-1"
              title="Zoom out"
            >
              <Icon name="Minus" size={16} />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="font-caption text-xs text-text-secondary">Available Activities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <span className="font-caption text-xs text-text-secondary">Joined Activities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-error rounded-full"></div>
                <span className="font-caption text-xs text-text-secondary">Full Activities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Activity List Sidebar */}
        <div className="lg:hidden max-h-64 overflow-y-auto border-t border-border">
          <div className="p-4 space-y-3">
            <h4 className="font-heading font-semibold text-text-primary">
              Nearby Activities
            </h4>
            {activities.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                onClick={() => onActivitySelect?.(activity)}
                className="flex items-center space-x-3 p-3 bg-background-secondary rounded-lg cursor-pointer hover:bg-background-tertiary transition-smooth"
              >
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-medium text-text-primary truncate">
                    {activity.title}
                  </p>
                  <p className="font-caption text-xs text-text-secondary">
                    {activity.distance} • {activity.time}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} color="var(--color-text-tertiary)" />
              </div>
            ))}
            {activities.length > 3 && (
              <button className="w-full text-center py-2 text-accent hover:text-accent-700 font-body text-sm transition-smooth">
                View all {activities.length} activities
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;