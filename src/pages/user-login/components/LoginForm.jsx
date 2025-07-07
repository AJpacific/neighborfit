import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Mock credentials for authentication
  const mockCredentials = {
    email: 'demo@neighborfit.com',
    password: 'fitness123'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      if (formData.email === mockCredentials.email && formData.password === mockCredentials.password) {
        // Successful login
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', formData.email);
        navigate('/community-dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Use demo@neighborfit.com / fitness123`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Network error. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    if (!resetEmail) {
      setErrors({ resetEmail: 'Email is required' });
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setErrors({ resetEmail: 'Please enter a valid email address' });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setErrors({});
      setShowForgotPassword(false);
      setResetEmail('');
      
      // Show success message
      alert('Password reset instructions sent to your email!');
    } catch (error) {
      setErrors({ resetEmail: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="font-heading font-bold text-xl text-text-primary mb-2">
            Reset Password
          </h2>
          <p className="font-body text-text-secondary">
            Enter your email address and we'll send you reset instructions
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Enter your email address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className={errors.resetEmail ? 'border-error' : ''}
            />
            {errors.resetEmail && (
              <p className="mt-1 text-sm text-error">{errors.resetEmail}</p>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              iconName="Mail"
              iconPosition="left"
            >
              Send Reset Instructions
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => {
                setShowForgotPassword(false);
                setResetEmail('');
                setErrors({});
              }}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* General Error */}
      {errors.general && (
        <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={18} color="var(--color-error)" />
            <p className="font-body text-sm text-error">{errors.general}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'border-error' : ''}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-error">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'border-error' : ''}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-tertiary hover:text-text-secondary transition-smooth"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
          {errors.password && (
            <p className="mt-1 text-sm text-error">{errors.password}</p>
          )}
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="w-4 h-4"
            />
            <span className="font-body text-sm text-text-secondary">Remember me</span>
          </label>
          
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="font-body text-sm text-accent hover:text-accent-700 transition-smooth"
          >
            Forgot password?
          </button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;