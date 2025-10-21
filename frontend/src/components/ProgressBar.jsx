import React from 'react';

function ProgressBar({ sections, currentSection }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-200 ${
                  index < currentSection
                    ? 'bg-green-500 text-white'
                    : index === currentSection
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {index < currentSection ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-sm mt-2 text-center ${
                  index === currentSection ? 'text-primary-600 font-semibold' : 'text-gray-600'
                }`}
              >
                {section.title}
              </span>
            </div>
            {index < sections.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 transition-colors duration-200 ${
                  index < currentSection ? 'bg-green-500' : 'bg-gray-300'
                }`}
                style={{ marginTop: '-24px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProgressBar;

