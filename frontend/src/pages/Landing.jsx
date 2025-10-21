import React from 'react';
import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/accusights-logo.jpg" alt="Accusights" className="w-12 h-12 rounded" />
            <div>
              <span className="text-2xl font-bold text-primary-600">ACCU</span>
              <span className="text-2xl font-light text-gray-900">SIGHTS</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-Powered <span className="text-primary-600">Cybersecurity Policies</span> in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Generate CIS Controls-aligned policies customized for your organization. Choose from 3 policy types 
            and answer 23-45 questions to create professional, compliant documentation.
          </p>
          <button
            onClick={() => navigate('/select-policies')}
            className="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            Generate Your Policies →
          </button>
          <p className="text-sm text-gray-500 mt-4">No credit card required • 5-25 minutes depending on selection</p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
          {/* Benefit 1 */}
          <div className="card text-center hover:shadow-lg transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-600">
              Generate 1-3 professional policy documents in under 30 seconds. No more spending days 
              writing policies from scratch.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="card text-center hover:shadow-lg transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">CIS Controls-Aligned</h3>
            <p className="text-gray-600">
              Based on CIS (Center for Internet Security) templates, covering up to 15 CIS safeguards 
              across Controls 5, 6, and 17.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="card text-center hover:shadow-lg transition-shadow duration-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Fully Customized</h3>
            <p className="text-gray-600">
              Tailored to your organization's size, industry, compliance requirements (HIPAA, GDPR, PCI-DSS), 
              and specific IT infrastructure.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Select Policies & Answer Questions</h4>
                <p className="text-gray-600">Choose 1-3 policy types, then answer customized questions about your organization's security posture.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">AI Generates Policy</h4>
                <p className="text-gray-600">Our intelligent system creates a customized policy document based on your specific requirements and best practices.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Download & Deploy</h4>
                <p className="text-gray-600">Download your professionally formatted Word document, review it, and deploy it across your organization.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <div className="card max-w-2xl mx-auto bg-gradient-to-r from-primary-50 to-purple-50 border border-primary-200">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">
              Join organizations using Accusights to create CIS Controls-aligned cybersecurity policies.
            </p>
            <button
              onClick={() => navigate('/select-policies')}
              className="btn-primary"
            >
              Select Your Policies
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-16 border-t border-gray-200">
        <div className="text-center text-gray-600 text-sm">
          <p>&copy; 2025 <span className="font-semibold text-primary-600">Accusights</span> AI Policy Writer</p>
          <p className="mt-2">Policies based on CIS (Center for Internet Security) Critical Security Controls templates</p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

