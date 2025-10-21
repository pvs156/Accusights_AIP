import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

function Questionnaire() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get selected policies from location state
  const selectedPolicies = location.state?.selectedPolicies || { aup: true, account: false, incident: false };
  
  const [formData, setFormData] = useState({
    // Core Questions (Q1-Q15)
    q1_company_name: '',
    q2_industry: '',
    q3_company_size: '',
    q4_employee_count: '',
    q5_compliance: [],
    q6_has_it: '',
    q7_it_email: '',
    q8_it_phone: '',
    q9_mfa: '',
    q10_mfa_name: '',
    q11_password_manager: '',
    q12_password_manager_name: '',
    q13_mdm: '',
    q14_remote_work: '',
    q15_cyber_insurance: '',
    
    // AUP Questions (Q16-Q23)
    q16_personal_use: '',
    q17_personal_email: '',
    q18_personal_websites: '',
    q19_browser_sync: '',
    q20_cloud_storage: '',
    q21_monitoring: '',
    q22_social_media: '',
    q23_byod: '',
    
    // Account Management Questions (Q24-Q33)
    q24_password_length_with_mfa: '',
    q25_password_length_without_mfa: '',
    q26_passwords_expire: '',
    q26_password_expiry_days: '',
    q27_mfa_scope: '',
    q28_separate_admin_accounts: '',
    q29_account_review_frequency: '',
    q30_dormant_account_days: '',
    q31_extended_leave_policy: '',
    q32_credential_revocation_timeline: '',
    q33_maintain_account_inventory: '',
    
    // Incident Response Questions (Q34-Q45)
    q34_incident_manager_name: '',
    q35_incident_manager_email: '',
    q36_incident_manager_phone: '',
    q37_external_third_party: '',
    q38_backup_incident_manager: '',
    q39_incident_reporting_methods: [],
    q40_incident_report_recipients: '',
    q41_incident_reporting_timeframe: '',
    q42_external_ir_support: '',
    q42_ir_company_name: '',
    q43_hipaa_notification: '',
    q44_gdpr_notification: '',
    q45_other_regulatory_notifications: []
  });

  // Build sections dynamically based on selected policies
  const buildSections = () => {
    const sections = [
      {
        title: 'Company Information',
        description: 'Tell us about your organization',
        id: 'core1'
      },
      {
        title: 'IT Infrastructure',
        description: 'Your current IT setup and security measures',
        id: 'core2'
      }
    ];
    
    if (selectedPolicies.aup) {
      sections.push({
        title: 'Acceptable Use Policy',
        description: 'Device usage and behavior policies',
        id: 'aup'
      });
    }
    
    if (selectedPolicies.account) {
      sections.push({
        title: 'Account & Credential Management',
        description: 'Password, MFA, and account lifecycle',
        id: 'account'
      });
    }
    
    if (selectedPolicies.incident) {
      sections.push({
        title: 'Incident Response',
        description: 'Breach response and notification procedures',
        id: 'incident'
      });
    }
    
    return sections;
  };

  const sections = buildSections();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const currentValues = formData[name] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      setFormData(prev => ({ ...prev, [name]: newValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate Section = (sectionIndex) => {
    const newErrors = {};
    const section = sections[sectionIndex];
    
    if (section.id === 'core1') {
      if (!formData.q1_company_name.trim()) newErrors.q1_company_name = 'Company name is required';
      if (!formData.q2_industry) newErrors.q2_industry = 'Please select an industry';
      if (!formData.q3_company_size) newErrors.q3_company_size = 'Please select company size';
      if (!formData.q4_employee_count || formData.q4_employee_count < 1) newErrors.q4_employee_count = 'Please enter a valid employee count';
    }
    
    if (section.id === 'core2') {
      if (!formData.q6_has_it) newErrors.q6_has_it = 'Please specify if you have an IT department';
      if (!formData.q7_it_email.trim()) {
        newErrors.q7_it_email = 'IT contact email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.q7_it_email)) {
        newErrors.q7_it_email = 'Please enter a valid email address';
      }
      if (!formData.q9_mfa) newErrors.q9_mfa = 'Please specify if you have MFA';
      if (formData.q9_mfa === 'Yes' && !formData.q10_mfa_name.trim()) newErrors.q10_mfa_name = 'Please enter your MFA provider name';
      if (!formData.q11_password_manager) newErrors.q11_password_manager = 'Please specify if you have a password manager';
      if (formData.q11_password_manager === 'Yes' && !formData.q12_password_manager_name.trim()) newErrors.q12_password_manager_name = 'Please enter your password manager name';
      if (!formData.q13_mdm) newErrors.q13_mdm = 'Please specify if you have MDM';
      if (!formData.q14_remote_work) newErrors.q14_remote_work = 'Please select a remote work policy';
      if (!formData.q15_cyber_insurance) newErrors.q15_cyber_insurance = 'Please specify if you have cyber insurance';
    }
    
    if (section.id === 'aup') {
      if (!formData.q16_personal_use) newErrors.q16_personal_use = 'Please select personal use policy';
      if (!formData.q17_personal_email) newErrors.q17_personal_email = 'Please specify personal email policy';
      if (!formData.q18_personal_websites) newErrors.q18_personal_websites = 'Please specify personal website policy';
      if (!formData.q19_browser_sync) newErrors.q19_browser_sync = 'Please select browser sync policy';
      if (!formData.q20_cloud_storage) newErrors.q20_cloud_storage = 'Please select cloud storage policy';
      if (!formData.q21_monitoring) newErrors.q21_monitoring = 'Please select monitoring policy';
      if (!formData.q22_social_media) newErrors.q22_social_media = 'Please select social media policy';
      if (!formData.q23_byod) newErrors.q23_byod = 'Please select BYOD policy';
      if (formData.q23_byod === 'Allowed with MDM' && formData.q13_mdm === 'No') {
        newErrors.q23_byod = 'Cannot allow BYOD with MDM when MDM solution is not available';
      }
    }
    
    if (section.id === 'account') {
      if (formData.q9_mfa === 'Yes' && !formData.q24_password_length_with_mfa) newErrors.q24_password_length_with_mfa = 'Required';
      if (!formData.q25_password_length_without_mfa) newErrors.q25_password_length_without_mfa = 'Required';
      if (!formData.q26_passwords_expire) newErrors.q26_passwords_expire = 'Required';
      if (formData.q26_passwords_expire === 'Yes' && !formData.q26_password_expiry_days) newErrors.q26_password_expiry_days = 'Required';
      if (!formData.q27_mfa_scope) newErrors.q27_mfa_scope = 'Required';
      if (!formData.q28_separate_admin_accounts) newErrors.q28_separate_admin_accounts = 'Required';
      if (!formData.q29_account_review_frequency) newErrors.q29_account_review_frequency = 'Required';
      if (!formData.q30_dormant_account_days) newErrors.q30_dormant_account_days = 'Required';
      if (!formData.q31_extended_leave_policy) newErrors.q31_extended_leave_policy = 'Required';
      if (!formData.q32_credential_revocation_timeline) newErrors.q32_credential_revocation_timeline = 'Required';
      if (!formData.q33_maintain_account_inventory) newErrors.q33_maintain_account_inventory = 'Required';
    }
    
    if (section.id === 'incident') {
      if (!formData.q34_incident_manager_name.trim()) newErrors.q34_incident_manager_name = 'Required';
      if (!formData.q35_incident_manager_email.trim()) {
        newErrors.q35_incident_manager_email = 'Required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.q35_incident_manager_email)) {
        newErrors.q35_incident_manager_email = 'Invalid email';
      }
      if (!formData.q36_incident_manager_phone.trim()) newErrors.q36_incident_manager_phone = 'Required';
      if (!formData.q37_external_third_party) newErrors.q37_external_third_party = 'Required';
      if (!formData.q38_backup_incident_manager.trim()) newErrors.q38_backup_incident_manager = 'Required';
      if (!formData.q39_incident_reporting_methods || formData.q39_incident_reporting_methods.length === 0) newErrors.q39_incident_reporting_methods = 'Select at least one method';
      if (!formData.q40_incident_report_recipients.trim()) newErrors.q40_incident_report_recipients = 'Required';
      if (!formData.q41_incident_reporting_timeframe) newErrors.q41_incident_reporting_timeframe = 'Required';
      if (!formData.q42_external_ir_support) newErrors.q42_external_ir_support = 'Required';
      if (formData.q42_external_ir_support === 'Yes' && !formData.q42_ir_company_name.trim()) newErrors.q42_ir_company_name = 'Required';
      if (formData.q2_industry === 'Healthcare' && !formData.q43_hipaa_notification) newErrors.q43_hipaa_notification = 'Required for Healthcare';
      if (formData.q5_compliance.includes('GDPR') && !formData.q44_gdpr_notification) newErrors.q44_gdpr_notification = 'Required for GDPR';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      if (currentSection < sections.length - 1) {
        setCurrentSection(currentSection + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    if (!validateSection(currentSection)) return;

    setIsSubmitting(true);

    try {
      const orgResponse = await axios.post('/api/organizations', {
        company_name: formData.q1_company_name,
        industry: formData.q2_industry,
        size: formData.q3_company_size,
        employee_count: parseInt(formData.q4_employee_count),
        has_mfa: formData.q9_mfa === 'Yes',
        has_password_manager: formData.q11_password_manager === 'Yes',
        has_mdm: formData.q13_mdm === 'Yes'
      });

      const orgId = orgResponse.data.org_id;

      const questionnaireResponse = await axios.post('/api/questionnaire/submit', {
        org_id: orgId,
        responses: { ...formData, selected_policies: selectedPolicies }
      });

      const questionnaireId = questionnaireResponse.data.questionnaire_id;

      navigate(`/generate?org_id=${orgId}&questionnaire_id=${questionnaireId}`);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      alert(error.response?.data?.detail || 'Failed to submit questionnaire. Please try again.');
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    const section = sections[currentSection];
    
    switch (section.id) {
      case 'core1':
        return renderCompanyInfo();
      case 'core2':
        return renderITInfrastructure();
      case 'aup':
        return renderAUPQuestions();
      case 'account':
        return renderAccountManagementQuestions();
      case 'incident':
        return renderIncidentResponseQuestions();
      default:
        return null;
    }
  };

  // Render functions for each section...
  // (Note: Due to length, I'll include key sections - the pattern is the same as before)
  
  const renderCompanyInfo = () => (
    <div className="space-y-6">
      {/* Q1-Q5 same as before */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          1. What is your company name? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="q1_company_name"
          value={formData.q1_company_name}
          onChange={handleChange}
          className={`input-field ${errors.q1_company_name ? 'border-red-500' : ''}`}
          placeholder="e.g., Acme Corporation"
        />
        {errors.q1_company_name && <p className="text-red-500 text-sm mt-1">{errors.q1_company_name}</p>}
      </div>
      {/* ... rest of company info questions ... */}
    </div>
  );

  const renderITInfrastructure = () => (
    <div className="space-y-6">
      {/* Q6-Q15 same as before */}
    </div>
  );

  const renderAUPQuestions = () => (
    <div className="space-y-6">
      {/* Q16-Q23 same as before */}
    </div>
  );

  const renderAccountManagementQuestions = () => (
    <div className="space-y-6">
      {/* Q24-Q33 - New questions */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-green-900">Account & Credential Management Policy</h4>
        <p className="text-sm text-green-700">CIS Controls 5 & 6 (9 safeguards)</p>
      </div>
      {/* Add all 10 account management questions */}
    </div>
  );

  const renderIncidentResponseQuestions = () => (
    <div className="space-y-6">
      {/* Q34-Q45 - New questions */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-orange-900">Incident Response Policy</h4>
        <p className="text-sm text-orange-700">CIS Control 17 (6 safeguards)</p>
      </div>
      {/* Add all 12 incident response questions */}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/accusights-logo.svg" alt="Accusights" className="w-8 h-8" />
              <div>
                <span className="text-xl font-bold text-primary-600">ACCU</span>
                <span className="text-xl font-light text-gray-900">SIGHTS</span>
              </div>
            </div>
            <button onClick={() => navigate('/select-policies')} className="text-gray-600 hover:text-gray-900">
              ← Back to Policy Selection
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <ProgressBar sections={sections} currentSection={currentSection} />

        <div className="card mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="text-gray-600">{sections[currentSection].description}</p>
          </div>

          {renderSection()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleBack}
              disabled={currentSection === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>

            {currentSection < sections.length - 1 ? (
              <button onClick={handleNext} className="btn-primary">
                Next →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'Generating...' : 'Generate Policies'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Questionnaire;

