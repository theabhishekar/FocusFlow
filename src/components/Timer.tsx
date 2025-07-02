import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';
type UserType = 'guest' | 'free' | 'premium';

interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerProps {
  onStart: () => void;
  onPomodoroComplete: (sessionType: TimerMode, duration: number) => void;
  userType: UserType;
  timerConfig: TimerConfig;
}

export function Timer({ onStart, onPomodoroComplete, userType, timerConfig }: TimerProps) {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(timerConfig.pomodoro * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const keyboardListenerRef = useRef<(e: KeyboardEvent) => void>();

  const TIMER_CONFIGS = {
    pomodoro: { duration: timerConfig.pomodoro * 60, label: 'Focus Time', color: 'from-coral-500 to-orange-500' },
    shortBreak: { duration: timerConfig.shortBreak * 60, label: 'Short Break', color: 'from-emerald-500 to-teal-500' },
    longBreak: { duration: timerConfig.longBreak * 60, label: 'Long Break', color: 'from-purple-500 to-pink-500' },
  };

  const config = TIMER_CONFIGS[mode];
  
  // Calculate progress as percentage of time elapsed (0% at start, 100% at end)
  const progress = ((config.duration - timeLeft) / config.duration) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Circle dimensions for different screen sizes
  const getCircleDimensions = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return { size: 256, radius: 118 }; // Mobile
      if (window.innerWidth < 1024) return { size: 320, radius: 148 }; // Tablet
      return { size: 384, radius: 178 }; // Desktop
    }
    return { size: 320, radius: 148 }; // Default
  };

  const { size, radius } = getCircleDimensions();
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    setTimeLeft(TIMER_CONFIGS[mode].duration);
  }, [mode, timerConfig]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            const actualDuration = sessionStartTime ? (Date.now() - sessionStartTime) / 1000 : config.duration;
            onPomodoroComplete(mode, actualDuration);
            setSessionStartTime(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Add keyboard event listener for immediate timer stop (only for signed-in users)
      if (userType !== 'guest') {
        keyboardListenerRef.current = (e: KeyboardEvent) => {
          // Ignore specific keys that shouldn't trigger warnings
          const ignoredKeys = ['Tab', 'Alt', 'Control', 'Shift', 'Meta', 'CapsLock'];
          if (ignoredKeys.includes(e.key)) return;

          // Stop timer immediately on any key press
          setIsRunning(false);
          setSessionStartTime(null);
          setShowWarning(true);
          setTimeout(() => setShowWarning(false), 3000);
        };

        document.addEventListener('keydown', keyboardListenerRef.current);
      }
    } else {
      clearInterval(intervalRef.current);
      if (keyboardListenerRef.current) {
        document.removeEventListener('keydown', keyboardListenerRef.current);
      }
    }

    return () => {
      clearInterval(intervalRef.current);
      if (keyboardListenerRef.current) {
        document.removeEventListener('keydown', keyboardListenerRef.current);
      }
    };
  }, [isRunning, mode, onPomodoroComplete, userType, config.duration, sessionStartTime]);

  const handleStart = () => {
    if (!isRunning) {
      onStart();
      setTimeout(() => {
        setIsRunning(true);
        setSessionStartTime(Date.now());
      }, 1000);
    } else {
      setIsRunning(false);
      setSessionStartTime(null);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_CONFIGS[mode].duration);
    setSessionStartTime(null);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setSessionStartTime(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Mode Selection */}
      <div className="mb-8 lg:mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {Object.entries(TIMER_CONFIGS).map(([key, config]) => (
              <button
                key={key}
                onClick={() => handleModeChange(key as TimerMode)}
                className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                  mode === key
                    ? `bg-gradient-to-r ${config.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="flex justify-center mb-8 lg:mb-12">
        <div className="relative">
          {/* Timer Circle */}
          <div 
            className="rounded-full bg-white/80 backdrop-blur-sm shadow-2xl border border-white/20 flex items-center justify-center"
            style={{ width: size, height: size }}
          >
            <div className="text-center">
              <div className={`text-3xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${config.color} bg-clip-text text-transparent mb-2 lg:mb-4 font-mono`}>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
              <div className="text-gray-600 text-sm sm:text-lg lg:text-xl font-medium">{config.label}</div>
              {userType === 'guest' && (
                <div className="text-xs sm:text-sm text-gray-500 mt-2 px-4">
                  Sign in to unlock tasks & stats
                </div>
              )}
            </div>
          </div>
          
          {/* Progress Ring */}
          <svg 
            className="absolute inset-0 transform -rotate-90"
            style={{ width: size, height: size }}
          >
            {/* Background Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="rgb(255 255 255 / 0.3)"
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(251 146 60)" />
                <stop offset="100%" stopColor="rgb(249 115 22)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
        <button
          onClick={handleStart}
          className={`w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-white shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 text-sm sm:text-base min-w-[140px] ${
            isRunning
              ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
              : `bg-gradient-to-r ${config.color} hover:shadow-xl`
          }`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        
        <button
          onClick={handleReset}
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-gray-700 bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 hover:bg-white text-sm sm:text-base min-w-[140px]"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>
      </div>

      {/* Warning Display - only for signed-in users */}
      {showWarning && userType !== 'guest' && (
        <div className="fixed top-4 left-4 right-4 sm:top-4 sm:right-4 sm:left-auto sm:max-w-sm bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-pulse z-50">
          <AlertTriangle size={20} className="flex-shrink-0" />
          <span className="text-sm">Timer stopped! Stay focused and avoid distractions!</span>
        </div>
      )}
    </div>
  );
}