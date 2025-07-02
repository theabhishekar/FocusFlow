import React from 'react';
import { Timer, CheckSquare, BarChart3, Calendar, Crown } from 'lucide-react';

type TabType = 'timer' | 'tasks' | 'stats' | 'sessions' | 'premium';

interface NavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'timer' as TabType, label: 'Timer', icon: Timer },
    { id: 'tasks' as TabType, label: 'Tasks', icon: CheckSquare },
    { id: 'stats' as TabType, label: 'Stats', icon: BarChart3 },
    { id: 'sessions' as TabType, label: 'Sessions', icon: Calendar },
    { id: 'premium' as TabType, label: 'Premium', icon: Crown },
  ];

  return (
    <nav className="w-full max-w-4xl mx-auto px-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/20">
        {/* Mobile: Horizontal scroll */}
        <div className="flex sm:hidden overflow-x-auto scrollbar-hide gap-1 pb-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex-shrink-0 px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex flex-col items-center gap-1 text-xs min-w-[80px] ${
                activeTab === id
                  ? 'bg-gradient-to-r from-coral-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden sm:grid sm:grid-cols-5 gap-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm lg:text-base ${
                activeTab === id
                  ? 'bg-gradient-to-r from-coral-500 to-orange-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              <Icon size={18} />
              <span className="hidden lg:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}