import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { GoogleAuthButton } from './GoogleAuthButton';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
  onGoogleSignIn: (googleData: any) => void;
}

export function AuthDialog({ open, onOpenChange, onSignIn, onSignUp, onGoogleSignIn }: AuthDialogProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      onSignUp(email, password);
    } else {
      onSignIn(email, password);
    }
    
    // Reset form
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleGoogleSuccess = (response: any) => {
    onGoogleSignIn(response);
  };

  const handleGoogleFailure = (error: any) => {
    console.error('Google Sign-In failed:', error);
    alert('Google Sign-In failed. Please try again.');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <User size={32} className="text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Sign up to unlock tasks, statistics, and more features' 
                : 'Sign in to access your tasks and progress'
              }
            </p>
          </div>

          {/* Google Sign-In Button */}
          <div className="space-y-4">
            <GoogleAuthButton
              onSuccess={handleGoogleSuccess}
              onFailure={handleGoogleFailure}
              text={isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
            />
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
              />
            </div>

            {isSignUp && (
              <div className="relative">
                <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-coral-600 hover:text-coral-700 font-medium"
            >
              {isSignUp 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}