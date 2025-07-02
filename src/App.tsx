import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { TaskManager } from './components/TaskManager';
import { Statistics } from './components/Statistics';
import { Navigation } from './components/Navigation';
import { DisclaimerDialog } from './components/DisclaimerDialog';
import { AuthDialog } from './components/AuthDialog';
import { UserMenu } from './components/UserMenu';
import { TimerSettings } from './components/TimerSettings';
import { SessionBriefDialog, SessionBrief } from './components/SessionBriefDialog';
import { SessionHistory } from './components/SessionHistory';
import { PremiumFeatures } from './components/PremiumFeatures';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

type TabType = 'timer' | 'tasks' | 'stats' | 'sessions' | 'premium';
type UserType = 'guest' | 'free' | 'premium';

interface User {
  id: string;
  email: string;
  type: UserType;
  name: string;
  avatar?: string;
}

interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('timer');
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showTimerSettings, setShowTimerSettings] = useState(false);
  const [showSessionBrief, setShowSessionBrief] = useState(false);
  const [lastSessionData, setLastSessionData] = useState<{
    duration: number;
    type: 'pomodoro' | 'shortBreak' | 'longBreak';
  } | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [timerConfig, setTimerConfig] = useState<TimerConfig>({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Complete project proposal', completed: false, pomodoroCount: 0 },
    { id: 2, text: 'Review code documentation', completed: true, pomodoroCount: 2 },
    { id: 3, text: 'Prepare presentation slides', completed: false, pomodoroCount: 1 },
  ]);
  const [stats, setStats] = useState({
    totalPomodoros: 8,
    totalFocusTime: 200, // in minutes
    dailyStreak: 3,
    weeklyGoal: 25,
    completedToday: 4,
  });
  const [sessionHistory, setSessionHistory] = useState<SessionBrief[]>([]);

  const userType: UserType = user?.type || 'guest';

  const handleStartTimer = () => {
    setShowDisclaimer(true);
  };

  const handleTaskComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskDelete = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleTaskAdd = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      pomodoroCount: 0,
    };
    setTasks([...tasks, newTask]);
  };

  const handlePomodoroComplete = (sessionType: 'pomodoro' | 'shortBreak' | 'longBreak', duration: number) => {
    // Only update stats for signed-in users
    if (user) {
      if (sessionType === 'pomodoro') {
        setStats(prev => ({
          ...prev,
          totalPomodoros: prev.totalPomodoros + 1,
          totalFocusTime: prev.totalFocusTime + timerConfig.pomodoro,
          completedToday: prev.completedToday + 1,
        }));
      }

      // Show session brief dialog for focus sessions
      if (sessionType === 'pomodoro') {
        setLastSessionData({ duration, type: sessionType });
        setShowSessionBrief(true);
      }
    }
  };

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      type: 'free' // Default to free user
    };
    setUser(mockUser);
    setShowAuthDialog(false);
  };

  const handleSignUp = (email: string, password: string) => {
    // Mock registration - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      type: 'free'
    };
    setUser(mockUser);
    setShowAuthDialog(false);
  };

  const handleGoogleSignIn = (credentialResponse: any) => {
    if (!credentialResponse || !credentialResponse.credential) {
      // Handle error or invalid response
      return;
    }
    const decoded: any = jwtDecode(credentialResponse.credential);
    const mockUser: User = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      type: 'free',
      avatar: decoded.picture
    };
    setUser(mockUser);
    setShowAuthDialog(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setActiveTab('timer');
  };

  const handleUpgradeToPremium = () => {
    if (user) {
      setUser({ ...user, type: 'premium' });
    }
  };

  const handleTimerConfigSave = (config: TimerConfig) => {
    setTimerConfig(config);
    setShowTimerSettings(false);
  };

  const handleSessionBriefSave = (briefData: SessionBrief) => {
    setSessionHistory(prev => [briefData, ...prev]);
    setShowSessionBrief(false);
    setLastSessionData(null);
  };

  return (
    <GoogleOAuthProvider clientId="171390194450-cj6r232rfsf5u4bv3jf0dpu5g5bmgfca.apps.googleusercontent.com">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-coral-50 to-amber-50">
        <div className="container mx-auto px-4 py-4 lg:py-8 max-w-7xl">
          {/* Header */}
          <header className="mb-6 lg:mb-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Logo and Title */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-coral-600 to-orange-600 bg-clip-text text-transparent mb-1">
                  FocusFlow
                </h1>
                <p className="text-sm sm:text-base text-gray-600">Stay focused, stay productive</p>
              </div>
              
              {/* User Menu / Sign In */}
              <div className="flex-shrink-0">
                {user ? (
                  <UserMenu 
                    user={user} 
                    onSignOut={handleSignOut}
                    onUpgrade={handleUpgradeToPremium}
                  />
                ) : (
                  <button
                    onClick={() => setShowAuthDialog(true)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </header>

          {/* Timer Settings Button */}
          <div className="flex justify-center mb-6 lg:mb-8">
            <button
              onClick={() => setShowTimerSettings(true)}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-gray-700 font-semibold hover:bg-white transition-all flex items-center gap-2 text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Timer Settings</span>
            </button>
          </div>

          {/* Navigation - Only for signed-in users */}
          {user && (
            <div className="mb-6 lg:mb-8">
              <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          )}

          {/* Main Content */}
          <main>
            {/* Timer - Always available */}
            {(activeTab === 'timer' || !user) && (
              <Timer 
                onStart={handleStartTimer}
                onPomodoroComplete={handlePomodoroComplete}
                userType={userType}
                timerConfig={timerConfig}
              />
            )}
            
            {/* Features only for signed-in users */}
            {user && activeTab === 'tasks' && (
              <TaskManager 
                tasks={tasks}
                onTaskComplete={handleTaskComplete}
                onTaskDelete={handleTaskDelete}
                onTaskAdd={handleTaskAdd}
                userType={userType}
              />
            )}
            {user && activeTab === 'stats' && (
              <Statistics stats={stats} userType={userType} />
            )}
            {user && activeTab === 'sessions' && (
              <SessionHistory sessions={sessionHistory} userType={userType} />
            )}
            {user && activeTab === 'premium' && (
              <PremiumFeatures userType={userType} onUpgrade={handleUpgradeToPremium} />
            )}
          </main>

          {/* Dialogs */}
          <DisclaimerDialog 
            open={showDisclaimer}
            onOpenChange={setShowDisclaimer}
          />

          <AuthDialog
            open={showAuthDialog}
            onOpenChange={setShowAuthDialog}
            onSignIn={handleSignIn}
            onSignUp={handleSignUp}
            onGoogleSignIn={handleGoogleSignIn}
          />

          <TimerSettings
            open={showTimerSettings}
            onOpenChange={setShowTimerSettings}
            config={timerConfig}
            onSave={handleTimerConfigSave}
          />

          {showSessionBrief && lastSessionData && (
            <SessionBriefDialog
              open={showSessionBrief}
              onOpenChange={setShowSessionBrief}
              onSave={handleSessionBriefSave}
              sessionDuration={lastSessionData.duration}
              sessionType={lastSessionData.type}
            />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;