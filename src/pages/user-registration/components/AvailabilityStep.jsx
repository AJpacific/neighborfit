import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AvailabilityStep = ({ formData, onUpdate, onNext, onBack }) => {
  const timeSlots = [
    { id: 'early-morning', label: 'Early Morning', time: '5:00 - 8:00 AM', icon: 'Sunrise' },
    { id: 'morning', label: 'Morning', time: '8:00 - 12:00 PM', icon: 'Sun' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 - 5:00 PM', icon: 'CloudSun' },
    { id: 'evening', label: 'Evening', time: '5:00 - 8:00 PM', icon: 'Sunset' },
    { id: 'night', label: 'Night', time: '8:00 - 11:00 PM', icon: 'Moon' }
  ];

  const daysOfWeek = [
    { id: 'monday', label: 'Mon', fullName: 'Monday' },
    { id: 'tuesday', label: 'Tue', fullName: 'Tuesday' },
    { id: 'wednesday', label: 'Wed', fullName: 'Wednesday' },
    { id: 'thursday', label: 'Thu', fullName: 'Thursday' },
    { id: 'friday', label: 'Fri', fullName: 'Friday' },
    { id: 'saturday', label: 'Sat', fullName: 'Saturday' },
    { id: 'sunday', label: 'Sun', fullName: 'Sunday' }
  ];

  const handleTimeSlotToggle = (timeSlotId) => {
    const currentTimeSlots = formData.availableTimeSlots || [];
    const updatedTimeSlots = currentTimeSlots.includes(timeSlotId)
      ? currentTimeSlots.filter(id => id !== timeSlotId)
      : [...currentTimeSlots, timeSlotId];
    
    onUpdate({ availableTimeSlots: updatedTimeSlots });
  };

  const handleDayToggle = (dayId) => {
    const currentDays = formData.availableDays || [];
    const updatedDays = currentDays.includes(dayId)
      ? currentDays.filter(id => id !== dayId)
      : [...currentDays, dayId];
    
    onUpdate({ availableDays: updatedDays });
  };

  const isTimeSlotSelected = (timeSlotId) => {
    return formData.availableTimeSlots?.includes(timeSlotId) || false;
  };

  const isDaySelected = (dayId) => {
    return formData.availableDays?.includes(dayId) || false;
  };

  const handleNext = () => {
    if ((formData.availableTimeSlots?.length || 0) > 0 && (formData.availableDays?.length || 0) > 0) {
      onNext();
    }
  };

  const canProceed = (formData.availableTimeSlots?.length || 0) > 0 && (formData.availableDays?.length || 0) > 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="font-heading font-bold text-xl text-text-primary mb-2">
          When are you available?
        </h3>
        <p className="font-body text-text-secondary">
          Help us match you with activities that fit your schedule
        </p>
      </div>

      {/* Time Slots */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Preferred Time Slots
        </h4>
        <div className="space-y-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => handleTimeSlotToggle(slot.id)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                isTimeSlotSelected(slot.id)
                  ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isTimeSlotSelected(slot.id) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-background-secondary text-text-tertiary'
                  }`}>
                    <Icon name={slot.icon} size={18} />
                  </div>
                  <div>
                    <h5 className="font-body font-semibold">{slot.label}</h5>
                    <p className="font-body text-sm opacity-80">{slot.time}</p>
                  </div>
                </div>
                {isTimeSlotSelected(slot.id) && (
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
        <p className="text-sm text-text-tertiary mt-2">
          Selected: {formData.availableTimeSlots?.length || 0} time slots
        </p>
      </div>

      {/* Days of Week */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-4">
          Available Days
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day.id}
              onClick={() => handleDayToggle(day.id)}
              className={`aspect-square p-3 rounded-xl border-2 transition-all text-center ${
                isDaySelected(day.id)
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:border-primary-200 bg-surface text-text-secondary hover:text-text-primary'
              }`}
              title={day.fullName}
            >
              <span className="font-body font-semibold text-sm">{day.label}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-text-tertiary mt-2">
          Selected: {formData.availableDays?.length || 0} days
        </p>
      </div>

      {/* Quick Selection Options */}
      <div>
        <h4 className="font-heading font-semibold text-text-primary mb-3">
          Quick Select
        </h4>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({ 
              availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] 
            })}
          >
            Weekdays
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({ 
              availableDays: ['saturday', 'sunday'] 
            })}
          >
            Weekends
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({ 
              availableDays: daysOfWeek.map(day => day.id) 
            })}
          >
            All Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdate({ 
              availableTimeSlots: ['morning', 'afternoon', 'evening'] 
            })}
          >
            Daytime
          </Button>
        </div>
      </div>

      {/* Summary */}
      {canProceed && (
        <div className="bg-success-50 rounded-xl p-4 border border-success-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={16} color="white" />
            </div>
            <div>
              <h5 className="font-body font-semibold text-success-700 mb-1">
                Availability Set
              </h5>
              <p className="font-body text-sm text-success-600">
                You're available {formData.availableDays?.length} days a week during {formData.availableTimeSlots?.length} time slots. We'll prioritize showing you activities that match your schedule.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex space-x-3 pt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1"
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!canProceed}
          className="flex-1"
          iconName="ArrowRight"
          iconPosition="right"
        >
          Complete Registration
        </Button>
      </div>

      {!canProceed && (
        <p className="text-sm text-warning text-center">
          Please select at least one time slot and one day to continue
        </p>
      )}
    </div>
  );
};

export default AvailabilityStep;