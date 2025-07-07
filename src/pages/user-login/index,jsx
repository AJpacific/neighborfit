import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/ui/AuthContainer';
import LoginForm from './components/LoginForm';
import SocialLogin from './components/SocialLogin';
import RegistrationPrompt from './components/RegistrationPrompt';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/community-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-primary rounded-full blur-2xl"></div>
      </div>

      <AuthContainer
        title="Welcome Back"
        subtitle="Sign in to continue your fitness journey with your neighbors"
        showBackButton={true}
      >
        <div className="space-y-6">
          {/* Social Login */}
          <SocialLogin />
          
          {/* Login Form */}
          <LoginForm />
          
          {/* Registration Prompt */}
          <RegistrationPrompt />
        </div>
      </AuthContainer>
    </div>
  );
};

export default UserLogin;
