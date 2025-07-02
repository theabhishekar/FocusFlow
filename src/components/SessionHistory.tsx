import React from 'react';
import { Clock, Target, Star, TrendingUp, Calendar } from 'lucide-react';
import { SessionBrief } from './SessionBriefDialog';

interface SessionHistoryProps {
  sessions: SessionBrief[];
  userType: 'guest' | 'free' | 'premium';
}

export function SessionHistory({ sessions, userType }: SessionHistoryProps) {
  const recentSessions = userType === 'free' ? sessions.slice(0, 5) : sessions;
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'pomodoro':
        return 'from-coral-500 to-orange-500';
      case 'shortBreak':
        return 'from-emerald-500 to-teal-500';
      case 'longBreak':
        return 'from-purple-500 to-pink-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getMoodEmoji = (mood: string) => {
    const moodEmojis = {
      excellent: '😄',
      good: '😊',
      okay: '😐',
      poor: '😔'
    };
    return moodEmojis[mood as keyof typeof moodEmojis] || '😊';
  };

  if (sessions.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 text-center">
        <Clock size={48} className="mx-auto mb-4 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Session History</h3>
        <p className="text-gray-600">Complete your first focus session to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <Calendar size={20} className="text-coral-500" />
          <span>Session History</span>
        </h3>
        {userType === 'free' && sessions.length > 5 && (
          <div className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
            Showing 5 of {sessions.length} sessions
          </div>
        )}
      </div>

      <div className="space-y-4">
        {recentSessions.map((session) => (
          <div
            key={session.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${getSessionTypeColor(session.sessionType)} rounded-full flex items-center justify-center`}>
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 capitalize">
                    {session.sessionType.replace(/([A-Z])/g, ' $1')} Session
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formatTime(session.timestamp)} • {formatDuration(session.duration)}
                  </p>
                </div>
              </div>
              <div className="text-2xl">{getMoodEmoji(session.mood)}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Target size={16} className="text-coral-500" />
                <span className="text-sm text-gray-600">Productivity:</span>
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < session.productivity ? 'bg-coral-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-purple-500" />
                <span className="text-sm text-gray-600">Focus:</span>
                <div className="flex space-x-1">
                  {[...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < session.focus ? 'bg-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {session.accomplishments && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Accomplishments:</p>
                <p className="text-sm text-gray-600 bg-emerald-50 p-2 rounded-lg">
                  {session.accomplishments}
                </p>
              </div>
            )}

            {session.challenges && (
              <div className="mb-2">
                <p className="text-sm font-medium text-gray-700 mb-1">Challenges:</p>
                <p className="text-sm text-gray-600 bg-amber-50 p-2 rounded-lg">
                  {session.challenges}
                </p>
              </div>
            )}

            {session.notes && (
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded-lg">
                  {session.notes}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {userType === 'free' && sessions.length > 5 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200 text-center">
          <p className="text-amber-800 font-medium mb-2">
            Upgrade to Premium to view all {sessions.length} sessions
          </p>
          <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );
}