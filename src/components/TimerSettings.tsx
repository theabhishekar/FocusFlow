import React, { useState } from 'react';
import { X, Clock, Save, RotateCcw } from 'lucide-react';

interface TimerConfig {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
}

interface TimerSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: TimerConfig;
  onSave: (config: TimerConfig) => void;
}

export function TimerSettings({ open, onOpenChange, config, onSave }: TimerSettingsProps) {
  const [tempConfig, setTempConfig] = useState<TimerConfig>(config);

  if (!open) return null;

  const handleSave = () => {
    onSave(tempConfig);
  };

  const handleReset = () => {
    const defaultConfig = {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    };
    setTempConfig(defaultConfig);
  };

  const handleInputChange = (field: keyof TimerConfig, value: string) => {
    const numValue = parseInt(value) || 1;
    const clampedValue = Math.max(1, Math.min(field === 'pomodoro' || field === 'longBreak' ? 120 : 60, numValue));
    setTempConfig(prev => ({ ...prev, [field]: clampedValue }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-coral-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} className="text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Timer Settings</h2>
            <p className="text-sm sm:text-base text-gray-600">Customize your focus and break durations</p>
          </div>

          <div className="space-y-6">
            {/* Focus Time */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Focus Time
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={tempConfig.pomodoro}
                    onChange={(e) => handleInputChange('pomodoro', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral-500 focus:border-transparent text-center text-lg font-semibold"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    min
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={tempConfig.pomodoro}
                  onChange={(e) => handleInputChange('pomodoro', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #f97316 0%, #f97316 ${(tempConfig.pomodoro / 120) * 100}%, #e5e7eb ${(tempConfig.pomodoro / 120) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            {/* Short Break */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Short Break
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={tempConfig.shortBreak}
                    onChange={(e) => handleInputChange('shortBreak', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-center text-lg font-semibold"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    min
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  value={tempConfig.shortBreak}
                  onChange={(e) => handleInputChange('shortBreak', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #10b981 0%, #10b981 ${(tempConfig.shortBreak / 60) * 100}%, #e5e7eb ${(tempConfig.shortBreak / 60) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 min</span>
                  <span>60 min</span>
                </div>
              </div>
            </div>

            {/* Long Break */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Long Break
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={tempConfig.longBreak}
                    onChange={(e) => handleInputChange('longBreak', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-semibold"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    min
                  </div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="120"
                  value={tempConfig.longBreak}
                  onChange={(e) => handleInputChange('longBreak', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(tempConfig.longBreak / 120) * 100}%, #e5e7eb ${(tempConfig.longBreak / 120) * 100}%, #e5e7eb 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Quick Presets:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setTempConfig({ pomodoro: 25, shortBreak: 5, longBreak: 15 })}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Classic (25/5/15)
              </button>
              <button
                onClick={() => setTempConfig({ pomodoro: 45, shortBreak: 10, longBreak: 30 })}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Extended (45/10/30)
              </button>
              <button
                onClick={() => setTempConfig({ pomodoro: 15, shortBreak: 3, longBreak: 10 })}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Quick (15/3/10)
              </button>
              <button
                onClick={() => setTempConfig({ pomodoro: 50, shortBreak: 10, longBreak: 20 })}
                className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center"
              >
                Deep Work (50/10/20)
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}