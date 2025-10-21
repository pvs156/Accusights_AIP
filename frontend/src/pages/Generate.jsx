import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

function Generate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('generating'); // generating, success, error
  const [policyData, setPolicyData] = useState(null);
  const [error, setError] = useState(null);

  const orgId = searchParams.get('org_id');
  const questionnaireId = searchParams.get('questionnaire_id');

  useEffect(() => {
    if (!orgId || !questionnaireId) {
      setError('Missing required parameters. Please complete the questionnaire first.');
      setStatus('error');
      return;
    }

    generatePolicy();
  }, [orgId, questionnaireId]);

  const generatePolicy = async () => {
    try {
      setStatus('generating');
      
      const response = await axios.post('/api/policies/generate', {
        org_id: orgId,
        questionnaire_id: questionnaireId
      });

      setPolicyData(response.data);
      setStatus('success');
    } catch (err) {
      console.error('Error generating policy:', err);
      setError(err.response?.data?.detail || 'Failed to generate policy. Please try again.');
      setStatus('error');
    }
  };

  const handleDownload = () => {
    if (policyData && policyData.document_url) {
      window.location.href = policyData.document_url;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/accusights-logo.jpg" alt="Accusights" className="w-10 h-10 rounded" />
              <div>
                <span className="text-xl font-bold text-primary-600">ACCU</span>
                <span className="text-xl font-light text-gray-900">SIGHTS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="card text-center">
          {status === 'generating' && (
            <div className="py-12">
              <div className="inline-block">
                <svg
                  className="animate-spin h-16 w-16 text-primary-600 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-2">
                Generating Your Policy...
              </h2>
              <p className="text-gray-600">
                Please wait while we create your customized Acceptable Use Policy.
              </p>
              <div className="mt-8 space-y-3 text-left max-w-md mx-auto">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse"></div>
                  <span>Analyzing your responses...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <span>Applying conditional logic...</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span>Generating document...</span>
                </div>
              </div>
            </div>
          )}

          {status === 'success' && policyData && (
            <div className="py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Policy is Ready! 🎉
              </h2>
              
              <p className="text-gray-600 mb-6">
                We've successfully generated your customized Acceptable Use Policy.
              </p>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
                <div className="flex items-center space-x-3">
                  <svg className="w-8 h-8 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 break-all">{policyData.filename}</p>
                    <p className="text-sm text-gray-500">Microsoft Word Document (.docx)</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="btn-primary text-lg mb-6"
              >
                <span className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download Word Document</span>
                </span>
              </button>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Next Steps</h3>
                <ul className="text-left space-y-2 max-w-md mx-auto text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">1.</span>
                    <span>Review the policy document and make any necessary adjustments</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">2.</span>
                    <span>Have the policy reviewed by legal counsel or management</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">3.</span>
                    <span>Get approval from relevant stakeholders</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-primary-600 font-bold">4.</span>
                    <span>Distribute the policy to all employees and obtain acknowledgments</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate('/')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Generate Another Policy →
                </button>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Something Went Wrong
              </h2>
              
              <p className="text-gray-600 mb-6">
                {error || 'We encountered an error while generating your policy.'}
              </p>

              <div className="space-x-4">
                <button
                  onClick={generatePolicy}
                  className="btn-primary"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/questionnaire')}
                  className="btn-secondary"
                >
                  Back to Questionnaire
                </button>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Generate;

