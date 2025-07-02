import React, { useState } from 'react';
import { X, Clock, Target, Star, FileText } from 'lucide-react';

interface SessionBriefDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (briefData: SessionBrief) => void;
  sessionDuration: number;
  sessionType: 'pomodoro' | 'shortBreak' | 'longBreak';
}

export interface SessionBrief {
  id: string;
  timestamp: Date;
  sessionType: 'pomodoro' | 'shortBreak' | 'longBreak';
  duration: number;
  productivity: number;
  focus: number;
  accomplishments: string;
  challenges: string;
  notes: string;
  mood: 'excellent' | 'good' | 'okay' | 'poor';
}

export function SessionBriefDialog({ 
  open, 
  onOpenChange, 
  onSave, 
  sessionDuration, 
  sessionType 
}: SessionBriefDialogProps) {
  const [productivity, setProductivity] = useState(5);
  const [focus, setFocus] = useState(5);
  const [accomplishments, setAccomplishments] = useState('');
  const [challenges, setChallenges] = useState('');
  const [notes, setNotes] = useState('');
  const [mood, setMood] = useState<'excellent' | 'good' | 'okay' | 'poor'>('good');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const briefData: SessionBrief = {
      id: Date.now().toString(),
      timestamp: new Date(),
      sessionType,
      duration: sessionDuration,
      productivity,
      focus,
      accomplishments,
      challenges,
      notes,
      mood
    };

    onSave(briefData);
    
    // Reset form
    setProductivity(5);
    setFocus(5);
    setAccomplishments('');
    setChallenges('');
    setNotes('');
    setMood('good');
    onOpenChange(false);
  };

  const handleSkip = () => {
    onOpenChange(false);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minutes`;
  };

  const moodEmojis = {
    excellent: '😄',
    good: '😊',
    okay: '😐',
    poor: '😔'
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target size={32} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h2>
            <p className="text-gray-600">
              You completed a {formatDuration(sessionDuration)} {sessionType} session
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How are you feeling?
              </label>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(moodEmojis).map(([moodKey, emoji]) => (
                  <button
                    key={moodKey}
                    type="button"
                    onClick={() => setMood(moodKey as any)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      mood === moodKey
                        ? 'border-coral-500 bg-coral-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{emoji}</div>
                    <div className="text-xs font-medium capitalize">{moodKey}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Sliders */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Productivity Level: {productivity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={productivity}
                  onChange={(e) => setProductivity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Focus Level: {focus}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={focus}
                  onChange={(e) => setFocus(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Distracted</span>
                  <span>Focused</span>
                </div>
              </div>
            </div>

            {/* Text Areas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What did you accomplish?
              </label>
              <textarea
                value={accomplishments}
                onChange={(e) => setAccomplishments(e.target.value)}
                placeholder="Describe what you worked on and completed..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any challenges or distractions?
              </label>
              <textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="What made it difficult to focus or be productive?"
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any other thoughts or observations..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Skip
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <FileText size={16} />
                <span>Save Session</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}