import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterChips = ({ 
  activeFilters, 
  onFilterChange, 
  onClearAll 
}) => {
  const filterOptions = [
    { id: 'type', label: 'Activity Type', icon: 'Activity', options: ['Running', 'Yoga', 'Basketball', 'Cycling', 'Swimming', 'Tennis', 'Hiking'] },
    { id: 'date', label: 'Date', icon: 'Calendar', options: ['Today', 'Tomorrow', 'This Week', 'This Weekend', 'Next Week'] },
    { id: 'distance', label: 'Distance', icon: 'MapPin', options: ['Within 1 mile', 'Within 3 miles', 'Within 5 miles', 'Within 10 miles'] },
    { id: 'difficulty', label: 'Difficulty', icon: 'TrendingUp', options: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'] }
  ];

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filterArray) => {
      return count + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  const activeCount = getActiveFilterCount();

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} color="var(--color-text-secondary)" />
            <span className="font-body font-medium text-text-primary">Filters</span>
            {activeCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {activeCount}
              </span>
            )}
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClearAll}
              className="text-text-secondary hover:text-text-primary font-body text-sm transition-smooth"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
          {filterOptions.map((filter) => {
            const isActive = activeFilters[filter.id]?.length > 0;
            const activeItems = activeFilters[filter.id] || [];
            
            return (
              <div key={filter.id} className="flex-shrink-0">
                <button
                  onClick={() => onFilterChange(filter.id, filter.options[0])}
                  className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border transition-smooth ${
                    isActive
                      ? 'bg-primary-50 border-primary-200 text-primary' :'bg-background-secondary border-border-secondary text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={filter.icon} size={16} />
                  <span className="font-body text-sm whitespace-nowrap">
                    {filter.label}
                    {activeItems.length > 0 && ` (${activeItems.length})`}
                  </span>
                  {isActive && (
                    <Icon name="ChevronDown" size={14} />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Active Filter Tags */}
        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border-secondary">
            {Object.entries(activeFilters).map(([filterId, filterValues]) => 
              filterValues.map((value) => (
                <span
                  key={`${filterId}-${value}`}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-body"
                >
                  <span>{value}</span>
                  <button
                    onClick={() => onFilterChange(filterId, value, true)}
                    className="hover:text-primary-700 transition-smooth"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterChips;