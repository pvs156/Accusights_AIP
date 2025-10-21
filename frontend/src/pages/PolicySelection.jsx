import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PolicySelection() {
  const navigate = useNavigate();
  const [selectedPolicies, setSelectedPolicies] = useState({
    aup: true,
    account: true,
    incident: true
  });

  const policies = [
    {
      id: 'aup',
      name: 'Acceptable Use Policy',
      description: 'Governs employee device usage & behavior',
      questions: '+8 questions',
      duration: '~5 minutes',
      cisControls: 'None (governance only)',
      complexity: 1,
      complexityLabel: 'Beginner',
      icon: (
        <svg className="w-12 h-12 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      id: 'account',
      name: 'Account & Credential Management Policy',
      description: 'Password, MFA, account lifecycle rules',
      questions: '+10 questions',
      duration: '~8 minutes',
      cisControls: 'CIS Controls: 5, 6 (9 safeguards)',
      complexity: 3,
      complexityLabel: 'Intermediate',
      icon: (
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      id: 'incident',
      name: 'Incident Response Policy',
      description: 'Breach response & notification procedures',
      questions: '+12 questions',
      duration: '~10 minutes',
      cisControls: 'CIS Controls: 17 (6 safeguards)',
      complexity: 4,
      complexityLabel: 'Advanced',
      icon: (
        <svg className="w-12 h-12 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  const handleToggle = (policyId) => {
    setSelectedPolicies(prev => ({
      ...prev,
      [policyId]: !prev[policyId]
    }));
  };

  const getSelectedCount = () => {
    return Object.values(selectedPolicies).filter(Boolean).length;
  };

  const getTotalQuestions = () => {
    let total = 15; // Core questions always asked
    if (selectedPolicies.aup) total += 8;
    if (selectedPolicies.account) total += 10;
    if (selectedPolicies.incident) total += 12;
    return total;
  };

  const getTotalTime = () => {
    let time = 5; // Core questions ~5 min
    if (selectedPolicies.aup) time += 5;
    if (selectedPolicies.account) time += 8;
    if (selectedPolicies.incident) time += 10;
    return time;
  };

  const handleContinue = () => {
    if (getSelectedCount() === 0) {
      alert('Please select at least one policy to generate.');
      return;
    }
    
    // Pass selected policies to questionnaire
    navigate('/questionnaire', { state: { selectedPolicies } });
  };

  const renderStars = (count) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/accusights-logo.jpg" alt="Accusights" className="w-12 h-12 rounded" />
              <div>
                <span className="text-2xl font-bold text-primary-400">ACCU</span>
                <span className="text-2xl font-light text-white">SIGHTS</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Select Your Policies
          </h1>
          <p className="text-xl text-gray-300">
            Choose which cybersecurity policies you want to generate
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {policies.map(policy => (
            <div
              key={policy.id}
              onClick={() => handleToggle(policy.id)}
              className={`cursor-pointer transition-all duration-200 rounded-xl p-6 border-2 ${
                selectedPolicies[policy.id]
                  ? 'bg-gray-800 border-primary-500 shadow-lg shadow-primary-500/20'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Checkbox */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                  selectedPolicies[policy.id]
                    ? 'bg-primary-600 border-primary-600'
                    : 'border-gray-600'
                }`}>
                  {selectedPolicies[policy.id] && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                {policy.icon}
              </div>

              {/* Policy Info */}
              <h3 className="text-xl font-bold text-white mb-2">{policy.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{policy.description}</p>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {policy.questions}
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {policy.duration}
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="w-4 h-4 mr-2 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {policy.cisControls}
                </div>
              </div>

              {/* Complexity */}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Complexity:</span>
                  <div className="flex items-center space-x-2">
                    {renderStars(policy.complexity)}
                    <span className="text-xs text-gray-400">{policy.complexityLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-primary-900/50 to-purple-900/50 border border-primary-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {getSelectedCount()} {getSelectedCount() === 1 ? 'Policy' : 'Policies'} Selected
              </h3>
              <p className="text-gray-300">
                Total: <span className="font-semibold text-primary-300">{getTotalQuestions()} questions</span> | 
                <span className="font-semibold text-primary-300"> ~{getTotalTime()} minutes</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">CIS Safeguards Coverage:</div>
              <div className="text-2xl font-bold text-primary-300">
                {selectedPolicies.account && selectedPolicies.incident ? '15' :
                 selectedPolicies.account ? '9' :
                 selectedPolicies.incident ? '6' : '0'} safeguards
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            onClick={handleContinue}
            disabled={getSelectedCount() === 0}
            className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Questionnaire →
          </button>
          {getSelectedCount() === 0 && (
            <p className="text-red-400 text-sm mt-2">Please select at least one policy</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-700">
        <div className="text-center text-gray-400 text-sm">
          <p>Powered by <span className="text-primary-400 font-semibold">Accusights</span> | CIS Controls-Aligned Policies</p>
        </div>
      </footer>
    </div>
  );
}

export default PolicySelection;

