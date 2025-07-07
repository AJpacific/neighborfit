import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ 
  savedSearches = [], 
  onLoadSearch, 
  onDeleteSearch, 
  onSaveCurrentSearch,
  currentSearchQuery = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockSavedSearches = [
    { id: 1, name: 'Morning Yoga', query: 'yoga morning', filters: { type: ['Yoga'], time: ['Morning'] }, count: 12 },
    { id: 2, name: 'Weekend Basketball', query: 'basketball weekend', filters: { type: ['Basketball'], time: ['Weekend'] }, count: 8 },
    { id: 3, name: 'Running Groups', query: 'running', filters: { type: ['Running'] }, count: 15 },
  ];

  const searches = savedSearches.length > 0 ? savedSearches : mockSavedSearches;

  const handleSaveSearch = () => {
    if (currentSearchQuery.trim()) {
      onSaveCurrentSearch?.({
        name: currentSearchQuery,
        query: currentSearchQuery,
        filters: {},
        timestamp: new Date().toISOString()
      });
    }
  };

  if (searches.length === 0 && !currentSearchQuery) {
    return null;
  }

  return (
    <div className="bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={18} color="var(--color-text-secondary)" />
            <span className="font-body font-medium text-text-primary">Saved Searches</span>
            {searches.length > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-50 text-accent">
                {searches.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {currentSearchQuery && (
              <Button
                variant="ghost"
                onClick={handleSaveSearch}
                iconName="Plus"
                iconPosition="left"
                className="text-sm"
              >
                Save Current
              </Button>
            )}
            
            {searches.length > 3 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-text-secondary hover:text-text-primary font-body text-sm transition-smooth"
              >
                {isExpanded ? 'Show Less' : `Show All (${searches.length})`}
              </button>
            )}
          </div>
        </div>

        {/* Saved Search Items */}
        <div className="space-y-2">
          {(isExpanded ? searches : searches.slice(0, 3)).map((search) => (
            <div
              key={search.id}
              className="flex items-center justify-between p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-smooth group"
            >
              <div 
                className="flex-1 cursor-pointer"
                onClick={() => onLoadSearch?.(search)}
              >
                <div className="flex items-center space-x-3">
                  <Icon name="Search" size={16} color="var(--color-text-tertiary)" />
                  <div>
                    <h4 className="font-body font-medium text-text-primary">
                      {search.name}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="font-caption text-xs text-text-secondary">
                        "{search.query}"
                      </span>
                      {search.count && (
                        <>
                          <span className="text-text-tertiary">•</span>
                          <span className="font-caption text-xs text-text-secondary">
                            {search.count} results
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onLoadSearch?.(search)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-tertiary transition-smooth"
                  title="Load search"
                >
                  <Icon name="Play" size={14} />
                </button>
                <button
                  onClick={() => onDeleteSearch?.(search.id)}
                  className="p-2 rounded-lg text-text-secondary hover:text-error hover:bg-error-50 transition-smooth"
                  title="Delete search"
                >
                  <Icon name="Trash2" size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedSearches;