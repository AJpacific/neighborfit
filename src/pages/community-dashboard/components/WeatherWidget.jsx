import React from 'react';
import Icon from '../../../components/AppIcon';

const WeatherWidget = ({ weather }) => {
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'sunny': 'Sun',
      'cloudy': 'Cloud',
      'rainy': 'CloudRain',
      'stormy': 'CloudLightning',
      'snowy': 'CloudSnow',
      'windy': 'Wind',
      'foggy': 'CloudDrizzle'
    };
    return iconMap[condition.toLowerCase()] || 'Sun';
  };

  const getWeatherColor = (condition) => {
    const colorMap = {
      'sunny': 'text-warning',
      'cloudy': 'text-text-secondary',
      'rainy': 'text-accent',
      'stormy': 'text-text-primary',
      'snowy': 'text-accent-300',
      'windy': 'text-text-secondary',
      'foggy': 'text-text-tertiary'
    };
    return colorMap[condition.toLowerCase()] || 'text-warning';
  };

  const getActivityRecommendation = (condition, temperature) => {
    if (condition === 'rainy' || condition === 'stormy') {
      return { text: 'Great for indoor workouts', icon: 'Home', color: 'text-accent' };
    }
    if (condition === 'sunny' && temperature > 75) {
      return { text: 'Perfect for outdoor activities', icon: 'Sun', color: 'text-success' };
    }
    if (temperature < 40) {
      return { text: 'Bundle up for outdoor activities', icon: 'Thermometer', color: 'text-warning' };
    }
    return { text: 'Good conditions for any activity', icon: 'CheckCircle', color: 'text-success' };
  };

  const recommendation = getActivityRecommendation(weather.condition, weather.temperature);

  return (
    <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-xl p-4 border border-accent-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-heading font-semibold text-text-primary">
          Weather Update
        </h3>
        <span className="font-caption text-xs text-text-secondary">
          {weather.location}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`${getWeatherColor(weather.condition)}`}>
            <Icon name={getWeatherIcon(weather.condition)} size={32} />
          </div>
          <div>
            <p className="font-heading font-bold text-2xl text-text-primary">
              {weather.temperature}°F
            </p>
            <p className="font-caption text-sm text-text-secondary capitalize">
              {weather.condition}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-caption text-xs text-text-secondary">
            Feels like
          </p>
          <p className="font-body font-medium text-text-primary">
            {weather.feelsLike}°F
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <Icon name="Droplets" size={16} color="var(--color-accent)" className="mx-auto mb-1" />
          <p className="font-caption text-xs text-text-secondary">Humidity</p>
          <p className="font-body font-medium text-text-primary">{weather.humidity}%</p>
        </div>
        <div className="text-center">
          <Icon name="Wind" size={16} color="var(--color-text-secondary)" className="mx-auto mb-1" />
          <p className="font-caption text-xs text-text-secondary">Wind</p>
          <p className="font-body font-medium text-text-primary">{weather.windSpeed} mph</p>
        </div>
        <div className="text-center">
          <Icon name="Eye" size={16} color="var(--color-text-tertiary)" className="mx-auto mb-1" />
          <p className="font-caption text-xs text-text-secondary">Visibility</p>
          <p className="font-body font-medium text-text-primary">{weather.visibility} mi</p>
        </div>
      </div>

      <div className="flex items-center space-x-2 p-3 bg-surface rounded-lg">
        <Icon name={recommendation.icon} size={16} className={recommendation.color} />
        <span className="font-caption text-sm text-text-secondary">
          {recommendation.text}
        </span>
      </div>
    </div>
  );
};

export default WeatherWidget;