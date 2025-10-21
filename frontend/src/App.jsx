import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PolicySelection from './pages/PolicySelection';
import Questionnaire from './pages/Questionnaire';
import Generate from './pages/Generate';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/select-policies" element={<PolicySelection />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/generate" element={<Generate />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

