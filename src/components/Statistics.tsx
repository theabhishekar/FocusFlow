import React from 'react';
import { TrendingUp, Target, Flame, Clock, Crown } from 'lucide-react';

type UserType = 'guest' | 'free' | 'premium';

interface StatisticsProps {
  stats: {
    totalPomodoros: number;
    totalFocusTime: number;
    dailyStreak: number;
    weeklyGoal: number;
    completedToday: number;
  };
  userType: UserType;
}

export function Statistics({ stats, userType }: StatisticsProps) {
  const weeklyProgress = (stats.completedToday / stats.weeklyGoal) * 100;
  const focusHours = Math.floor(stats.totalFocusTime / 60);
  const focusMinutes = stats.totalFocusTime % 60;

  // Premium features
  const premiumFeatures = [
    'Detailed weekly/monthly reports',
    'Export data to CSV',
    'Advanced analytics',
    'Custom goal setting',
    'Productivity insights'
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-6 lg:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-coral-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Your Progress
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">Track your productivity and celebrate your achievements</p>
        {userType === 'free' && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm text-amber-600">
            <Crown size={16} />
            <span>Upgrade to Premium for advanced analytics</span>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {/* Total Pomodoros */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Total Pomodoros</p>
              <p className="text-2xl sm:text-3xl font-bold text-coral-600">{stats.totalPomodoros}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-coral-500 to-orange-500 rounded-full flex items-center justify-center">
              <TrendingUp size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Total Focus Time */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Focus Time</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-600">{focusHours}h {focusMinutes}m</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Daily Streak</p>
              <p className="text-2xl sm:text-3xl font-bold text-amber-600">{stats.dailyStreak}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
              <Flame size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Today's Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Today's Goal</p>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{stats.completedToday}/{stats.weeklyGoal}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <Target size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20 mb-6 lg:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base text-gray-600">This Week</span>
            <span className="font-semibold text-gray-800 text-sm sm:text-base">{stats.completedToday} / {stats.weeklyGoal} Pomodoros</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-coral-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600">
            {weeklyProgress >= 100 ? "🎉 Weekly goal achieved!" : `${Math.round(weeklyProgress)}% of weekly goal completed`}
          </p>
        </div>
      </div>

      {/* Premium Features Teaser for Free Users */}
      {userType === 'free' && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 lg:p-6 border-2 border-amber-200 mb-6 lg:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Crown size={24} className="text-amber-600" />
            <h3 className="text-lg sm:text-xl font-semibold text-amber-800">Unlock Premium Features</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0"></div>
                <span className="text-amber-700 text-sm">{feature}</span>
              </div>
            ))}
          </div>
          <button className="w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Upgrade to Premium
          </button>
        </div>
      )}

      {/* Achievement Badges */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg border border-white/20">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Achievements</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: '🏆', title: 'First Timer', description: 'Complete your first pomodoro', unlocked: stats.totalPomodoros >= 1 },
            { icon: '🔥', title: 'On Fire', description: '3-day streak', unlocked: stats.dailyStreak >= 3 },
            { icon: '💪', title: 'Consistency', description: '10 pomodoros completed', unlocked: stats.totalPomodoros >= 10 },
            { icon: '🎯', title: 'Goal Crusher', description: 'Weekly goal achieved', unlocked: weeklyProgress >= 100 },
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                achievement.unlocked
                  ? 'border-coral-300 bg-coral-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className={`text-2xl mb-2 ${achievement.unlocked ? '' : 'grayscale'}`}>
                {achievement.icon}
              </div>
              <h4 className={`font-semibold text-sm ${achievement.unlocked ? 'text-coral-700' : 'text-gray-500'}`}>
                {achievement.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1 break-words">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}