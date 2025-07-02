import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleAuthButtonProps {
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
  text: string;
}

export function GoogleAuthButton({ onSuccess, onFailure, text }: GoogleAuthButtonProps) {
  return (
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onFailure}
      useOneTap
      text={text.includes('Sign up') ? 'signup_with' : 'signin_with'}
      width="100%"
      shape="pill"
      theme="outline"
      size="large"
    />
  );
}