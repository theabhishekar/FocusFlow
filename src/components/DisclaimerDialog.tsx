import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface DisclaimerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisclaimerDialog({ open, onOpenChange }: DisclaimerDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle size={32} className="text-white" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Focus Mode Active</h2>
          
          <div className="text-gray-600 space-y-3">
            <p>
              FocusFlow monitors your keyboard activity to help you stay focused during work sessions.
            </p>
            <p>
              <strong>Important:</strong> Any keyboard input will immediately stop your timer. Stay focused and avoid using your keyboard during sessions.
            </p>
            <p>
              Only use timer controls (Start, Pause, Reset) during your session.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onOpenChange(false)}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-coral-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}