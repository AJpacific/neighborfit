import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  onVoiceSearch, 
  isVoiceSupported = true,
  onAdvancedFilters 
}) => {
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleVoiceSearch = () => {
    if (!isVoiceSupported) return;
    
    setIsVoiceActive(true);
    onVoiceSearch?.();
    
    // Simulate voice search completion
    setTimeout(() => {
      setIsVoiceActive(false);
    }, 3000);
  };

  return (
    <div className="bg-surface border-b border-border sticky top-16 lg:top-20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} color="var(--color-text-tertiary)" />
            </div>
            <Input
              type="search"
              placeholder="Search activities, sports, or locations..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-12 h-12 bg-background-secondary border-border-secondary focus:bg-surface"
            />
            {/* Voice Search Button */}
            {isVoiceSupported && (
              <button
                onClick={handleVoiceSearch}
                disabled={isVoiceActive}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-smooth ${
                  isVoiceActive 
                    ? 'text-error animate-pulse' :'text-text-tertiary hover:text-text-primary'
                }`}
                title="Voice search"
              >
                <Icon 
                  name={isVoiceActive ? "MicOff" : "Mic"} 
                  size={18} 
                />
              </button>
            )}
          </div>

          {/* Advanced Filters Button - Mobile */}
          <Button
            variant="outline"
            onClick={onAdvancedFilters}
            className="lg:hidden"
            iconName="SlidersHorizontal"
          >
            Filters
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        {searchQuery.length === 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {['Running', 'Yoga', 'Basketball', 'Cycling', 'Swimming'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSearchChange(suggestion)}
                className="px-3 py-1 bg-background-tertiary hover:bg-primary-50 text-text-secondary hover:text-primary rounded-full text-sm font-body transition-smooth"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;