import React from 'react';
import { Crown, BarChart3, Download, Target, Zap, Shield, Calendar, Brain } from 'lucide-react';

interface PremiumFeaturesProps {
  userType: 'guest' | 'free' | 'premium';
  onUpgrade: () => void;
}

export function PremiumFeatures({ userType, onUpgrade }: PremiumFeaturesProps) {
  const premiumFeatures = [
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed productivity insights with weekly/monthly trends',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Download,
      title: 'Data Export',
      description: 'Export your session data to CSV, PDF, or JSON formats',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: Target,
      title: 'Custom Goals',
      description: 'Set personalized daily, weekly, and monthly targets',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Session Scheduling',
      description: 'Plan your focus sessions with calendar integration',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Get personalized productivity recommendations',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Zap,
      title: 'Power User Tools',
      description: 'Batch operations, keyboard shortcuts, and automation',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: '24/7 premium support with faster response times',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Crown,
      title: 'Unlimited Everything',
      description: 'No limits on tasks, sessions, or data storage',
      color: 'from-amber-500 to-yellow-500'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: [
        'Basic Pomodoro timer',
        'Up to 10 tasks',
        'Last 5 session briefs',
        'Basic statistics',
        'Standard themes'
      ],
      current: userType === 'free',
      buttonText: 'Current Plan',
      buttonDisabled: true
    },
    {
      name: 'Premium',
      price: '$4.99',
      period: 'month',
      features: [
        'Everything in Free',
        'Unlimited tasks & sessions',
        'Complete session history',
        'Advanced analytics',
        'Data export options',
        'Custom goals & scheduling',
        'AI-powered insights',
        'Priority support'
      ],
      current: userType === 'premium',
      buttonText: userType === 'premium' ? 'Current Plan' : 'Upgrade Now',
      buttonDisabled: userType === 'premium',
      popular: true
    }
  ];

  if (userType === 'premium') {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown size={32} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
            Premium Features
          </h2>
          <p className="text-gray-600">You have access to all premium features!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {premiumFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                <feature.icon size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown size={32} className="text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">
          Unlock Premium Features
        </h2>
        <p className="text-gray-600">Take your productivity to the next level</p>
      </div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumFeatures.map((feature, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-2 right-2">
              <Crown size={16} className="text-amber-500" />
            </div>
            <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
              <feature.icon size={24} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 relative ${
              plan.popular 
                ? 'border-amber-300 shadow-xl scale-105' 
                : 'border-white/20 hover:shadow-xl'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center space-x-1">
                <span className="text-4xl font-bold text-gray-800">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={plan.buttonDisabled ? undefined : onUpgrade}
              disabled={plan.buttonDisabled}
              className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                plan.buttonDisabled
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:shadow-lg'
                  : 'bg-gradient-to-r from-coral-500 to-orange-500 text-white hover:shadow-lg'
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 text-center">
        <h3 className="text-2xl font-bold text-amber-800 mb-4">
          Ready to supercharge your productivity?
        </h3>
        <p className="text-amber-700 mb-6">
          Join thousands of users who have transformed their work habits with FocusFlow Premium
        </p>
        <button
          onClick={onUpgrade}
          className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all text-lg"
        >
          Start Your Premium Journey
        </button>
      </div>
    </div>
  );
}