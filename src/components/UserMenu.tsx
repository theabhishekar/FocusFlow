import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Crown, ChevronDown } from 'lucide-react';

interface User {
  id: string;
  email: string;
  type: 'guest' | 'free' | 'premium';
  name: string;
}

interface UserMenuProps {
  user: User;
  onSignOut: () => void;
  onUpgrade: () => void;
}

export function UserMenu({ user, onSignOut, onUpgrade }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 hover:bg-white transition-all text-sm sm:text-base"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          user.type === 'premium' 
            ? 'bg-gradient-to-r from-amber-500 to-yellow-500' 
            : 'bg-gradient-to-r from-coral-500 to-orange-500'
        }`}>
          {user.type === 'premium' ? (
            <Crown size={16} className="text-white" />
          ) : (
            <User size={16} className="text-white" />
          )}
        </div>
        
        <div className="text-left hidden sm:block">
          <div className="text-sm font-semibold text-gray-800 truncate max-w-[120px]">{user.name}</div>
          <div className="text-xs text-gray-600 capitalize">{user.type}</div>
        </div>
        
        <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="text-sm font-semibold text-gray-800 truncate">{user.email}</div>
            <div className="text-xs text-gray-600 capitalize">{user.type} Account</div>
          </div>
          
          {user.type === 'free' && (
            <button
              onClick={() => {
                onUpgrade();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-amber-600 hover:bg-amber-50 flex items-center gap-2 transition-colors"
            >
              <Crown size={16} />
              <span>Upgrade to Premium</span>
            </button>
          )}
          
          <button
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}