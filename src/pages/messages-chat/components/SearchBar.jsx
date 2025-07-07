import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -y-1/2 text-text-tertiary">
        <Icon name="Search" size={16} />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-4 py-2 w-full bg-background-secondary border-border-secondary focus:border-primary focus:bg-surface"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-smooth"
        >
          <Icon name="X" size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;