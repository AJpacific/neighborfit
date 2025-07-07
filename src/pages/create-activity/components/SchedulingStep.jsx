import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SchedulingStep = ({ formData, updateFormData, errors }) => {
  const handleDateChange = (e) => {
    updateFormData({ date: e.target.value });
  };

  const handleTimeChange = (e) => {
    updateFormData({ time: e.target.value });
  };

  const handleDurationChange = (e) => {
    updateFormData({ duration: e.target.value });
  };

  const handleRecurringChange = (e) => {
    updateFormData({ isRecurring: e.target.checked });
  };

  const handleRecurrenceTypeChange = (e) => {
    updateFormData({ recurrenceType: e.target.value });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const recurrenceOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'biweekly', label: 'Bi-weekly' },
    { value: 'monthly', label: 'Monthly' }
  ];

  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Date *
        </label>
        <Input
          type="date"
          value={formData.date}
          onChange={handleDateChange}
          min={getTomorrowDate()}
          className={errors.date ? 'border-error' : ''}
        />
        {errors.date && (
          <p className="text-error text-sm mt-1">{errors.date}</p>
        )}
      </div>

      {/* Time Selection */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Start Time *
        </label>
        <Input
          type="time"
          value={formData.time}
          onChange={handleTimeChange}
          className={errors.time ? 'border-error' : ''}
        />
        {errors.time && (
          <p className="text-error text-sm mt-1">{errors.time}</p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-2">
          Duration (minutes) *
        </label>
        <Input
          type="number"
          placeholder="60"
          value={formData.duration}
          onChange={handleDurationChange}
          min="15"
          max="480"
          className={errors.duration ? 'border-error' : ''}
        />
        {errors.duration && (
          <p className="text-error text-sm mt-1">{errors.duration}</p>
        )}
        <p className="text-text-tertiary text-sm mt-1">
          Recommended: 30-120 minutes
        </p>
      </div>

      {/* Recurring Event */}
      <div className="bg-background-secondary rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Input
            type="checkbox"
            checked={formData.isRecurring}
            onChange={handleRecurringChange}
            className="w-5 h-5"
          />
          <div>
            <label className="font-body font-medium text-text-primary">
              Make this a recurring activity
            </label>
            <p className="text-text-secondary text-sm">
              Create a series of activities with the same details
            </p>
          </div>
        </div>

        {formData.isRecurring && (
          <div className="mt-4">
            <label className="block font-body font-medium text-text-primary mb-2">
              Repeat frequency
            </label>
            <select
              value={formData.recurrenceType}
              onChange={handleRecurrenceTypeChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary font-body text-text-primary"
            >
              {recurrenceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Quick Time Suggestions */}
      <div>
        <label className="block font-body font-medium text-text-primary mb-3">
          Popular Times
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {['06:00', '07:00', '18:00', '19:00'].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => updateFormData({ time })}
              className={`px-3 py-2 rounded-lg border transition-smooth ${
                formData.time === time
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-border-secondary hover:bg-background-secondary text-text-secondary'
              }`}
            >
              <div className="flex items-center justify-center space-x-1">
                <Icon name="Clock" size={14} />
                <span className="font-body text-sm">{time}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulingStep;