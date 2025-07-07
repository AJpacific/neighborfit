import React from 'react';
import Icon from '../../../components/AppIcon';


const ViewToggle = ({ 
  currentView, 
  onViewChange, 
  resultCount = 0,
  sortBy,
  onSortChange 
}) => {
  const sortOptions = [
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'distance', label: 'Distance', icon: 'MapPin' },
    { value: 'popularity', label: 'Popularity', icon: 'TrendingUp' },
    { value: 'difficulty', label: 'Difficulty', icon: 'BarChart3' }
  ];

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Results Count */}
          <div className="flex items-center space-x-2">
            <span className="font-body text-text-secondary">
              {resultCount} activities found
            </span>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none bg-background-secondary border border-border-secondary rounded-lg px-3 py-2 pr-8 font-body text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by {option.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <Icon name="ChevronDown" size={16} color="var(--color-text-tertiary)" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-background-secondary rounded-lg p-1">
              <button
                onClick={() => onViewChange('list')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-smooth ${
                  currentView === 'list' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
                title="List view"
              >
                <Icon name="List" size={16} />
                <span className="font-body text-sm hidden sm:inline">List</span>
              </button>
              
              <button
                onClick={() => onViewChange('map')}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md transition-smooth ${
                  currentView === 'map' ?'bg-surface text-text-primary shadow-sm' :'text-text-secondary hover:text-text-primary'
                }`}
                title="Map view"
              >
                <Icon name="Map" size={16} />
                <span className="font-body text-sm hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewToggle;