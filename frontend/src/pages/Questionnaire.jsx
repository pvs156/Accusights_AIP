import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProgressBar from '../components/ProgressBar';

function Questionnaire() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Section 1: Company Info
    q1_company_name: '',
    q2_industry: '',
    q3_company_size: '',
    q4_employee_count: '',
    q5_compliance: [],
    
    // Section 2: IT Infrastructure
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
    
    // Section 3: Policy Preferences
    q16_personal_use: '',
    q17_personal_email: '',
    q18_personal_websites: '',
    q19_browser_sync: '',
    q20_cloud_storage: '',
    q21_monitoring: '',
    q22_social_media: '',
    q23_byod: ''
  });

  const sections = [
    {
      title: 'Company Information',
      description: 'Tell us about your organization'
    },
    {
      title: 'IT Infrastructure',
      description: 'Your current IT setup and security measures'
    },
    {
      title: 'Policy Preferences',
      description: 'Define how your policy should be structured'
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      // Handle multi-select for compliance requirements
      const currentValues = formData[name] || [];
      const newValues = checked
        ? [...currentValues, value]
        : currentValues.filter(v => v !== value);
      setFormData(prev => ({ ...prev, [name]: newValues }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateSection = (sectionIndex) => {
    const newErrors = {};
    
    if (sectionIndex === 0) {
      // Section 1: Company Info
      if (!formData.q1_company_name.trim()) {
        newErrors.q1_company_name = 'Company name is required';
      }
      if (!formData.q2_industry) {
        newErrors.q2_industry = 'Please select an industry';
      }
      if (!formData.q3_company_size) {
        newErrors.q3_company_size = 'Please select company size';
      }
      if (!formData.q4_employee_count || formData.q4_employee_count < 1) {
        newErrors.q4_employee_count = 'Please enter a valid employee count';
      }
    } else if (sectionIndex === 1) {
      // Section 2: IT Infrastructure
      if (!formData.q6_has_it) {
        newErrors.q6_has_it = 'Please specify if you have an IT department';
      }
      if (!formData.q7_it_email.trim()) {
        newErrors.q7_it_email = 'IT contact email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.q7_it_email)) {
        newErrors.q7_it_email = 'Please enter a valid email address';
      }
      if (!formData.q9_mfa) {
        newErrors.q9_mfa = 'Please specify if you have MFA';
      }
      if (formData.q9_mfa === 'Yes' && !formData.q10_mfa_name.trim()) {
        newErrors.q10_mfa_name = 'Please enter your MFA provider name';
      }
      if (!formData.q11_password_manager) {
        newErrors.q11_password_manager = 'Please specify if you have a password manager';
      }
      if (formData.q11_password_manager === 'Yes' && !formData.q12_password_manager_name.trim()) {
        newErrors.q12_password_manager_name = 'Please enter your password manager name';
      }
      if (!formData.q13_mdm) {
        newErrors.q13_mdm = 'Please specify if you have MDM';
      }
      if (!formData.q14_remote_work) {
        newErrors.q14_remote_work = 'Please select a remote work policy';
      }
      if (!formData.q15_cyber_insurance) {
        newErrors.q15_cyber_insurance = 'Please specify if you have cyber insurance';
      }
    } else if (sectionIndex === 2) {
      // Section 3: Policy Preferences
      if (!formData.q16_personal_use) {
        newErrors.q16_personal_use = 'Please select personal use policy';
      }
      if (!formData.q17_personal_email) {
        newErrors.q17_personal_email = 'Please specify personal email policy';
      }
      if (!formData.q18_personal_websites) {
        newErrors.q18_personal_websites = 'Please specify personal website policy';
      }
      if (!formData.q19_browser_sync) {
        newErrors.q19_browser_sync = 'Please select browser sync policy';
      }
      if (!formData.q20_cloud_storage) {
        newErrors.q20_cloud_storage = 'Please select cloud storage policy';
      }
      if (!formData.q21_monitoring) {
        newErrors.q21_monitoring = 'Please select monitoring policy';
      }
      if (!formData.q22_social_media) {
        newErrors.q22_social_media = 'Please select social media policy';
      }
      if (!formData.q23_byod) {
        newErrors.q23_byod = 'Please select BYOD policy';
      }
      
      // Validate BYOD/MDM conflict
      if (formData.q23_byod === 'Allowed with MDM' && formData.q13_mdm === 'No') {
        newErrors.q23_byod = 'Cannot allow BYOD with MDM when MDM solution is not available. Please change your BYOD policy or implement MDM.';
      }
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
    if (!validateSection(currentSection)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Step 1: Create organization
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

      // Step 2: Submit questionnaire responses
      const questionnaireResponse = await axios.post('/api/questionnaire/submit', {
        org_id: orgId,
        responses: formData
      });

      const questionnaireId = questionnaireResponse.data.questionnaire_id;

      // Step 3: Navigate to generation page
      navigate(`/generate?org_id=${orgId}&questionnaire_id=${questionnaireId}`);
    } catch (error) {
      console.error('Error submitting questionnaire:', error);
      alert(error.response?.data?.detail || 'Failed to submit questionnaire. Please try again.');
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return renderCompanyInfo();
      case 1:
        return renderITInfrastructure();
      case 2:
        return renderPolicyPreferences();
      default:
        return null;
    }
  };

  const renderCompanyInfo = () => (
    <div className="space-y-6">
      {/* Q1: Company Name */}
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

      {/* Q2: Industry */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          2. What industry are you in? <span className="text-red-500">*</span>
        </label>
        <select
          name="q2_industry"
          value={formData.q2_industry}
          onChange={handleChange}
          className={`input-field ${errors.q2_industry ? 'border-red-500' : ''}`}
        >
          <option value="">Select an industry</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Finance">Finance</option>
          <option value="Technology">Technology</option>
          <option value="Retail">Retail</option>
          <option value="Government">Government</option>
          <option value="Other">Other</option>
        </select>
        {errors.q2_industry && <p className="text-red-500 text-sm mt-1">{errors.q2_industry}</p>}
      </div>

      {/* Q3: Company Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          3. What is your company size? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {['IG1 (<500 employees)', 'IG2 (500-5000 employees)', 'IG3 (5000+ employees)'].map(size => (
            <label key={size} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="q3_company_size"
                value={size}
                checked={formData.q3_company_size === size}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{size}</span>
            </label>
          ))}
        </div>
        {errors.q3_company_size && <p className="text-red-500 text-sm mt-1">{errors.q3_company_size}</p>}
      </div>

      {/* Q4: Employee Count */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          4. How many employees do you have? <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          name="q4_employee_count"
          value={formData.q4_employee_count}
          onChange={handleChange}
          className={`input-field ${errors.q4_employee_count ? 'border-red-500' : ''}`}
          placeholder="e.g., 250"
          min="1"
        />
        {errors.q4_employee_count && <p className="text-red-500 text-sm mt-1">{errors.q4_employee_count}</p>}
      </div>

      {/* Q5: Compliance Requirements */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          5. What compliance requirements do you have? (Select all that apply)
        </label>
        <div className="space-y-2">
          {['HIPAA', 'PCI-DSS', 'GDPR', 'SOC2', 'None'].map(compliance => (
            <label key={compliance} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                name="q5_compliance"
                value={compliance}
                checked={formData.q5_compliance.includes(compliance)}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{compliance}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderITInfrastructure = () => (
    <div className="space-y-6">
      {/* Q6: Has IT Department */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          6. Do you have an IT department? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q6_has_it"
                value={option}
                checked={formData.q6_has_it === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q6_has_it && <p className="text-red-500 text-sm mt-1">{errors.q6_has_it}</p>}
      </div>

      {/* Q7: IT Contact Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          7. What is your IT contact email? <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="q7_it_email"
          value={formData.q7_it_email}
          onChange={handleChange}
          className={`input-field ${errors.q7_it_email ? 'border-red-500' : ''}`}
          placeholder="it@company.com"
        />
        {errors.q7_it_email && <p className="text-red-500 text-sm mt-1">{errors.q7_it_email}</p>}
      </div>

      {/* Q8: IT Contact Phone */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          8. What is your IT contact phone? (Optional)
        </label>
        <input
          type="tel"
          name="q8_it_phone"
          value={formData.q8_it_phone}
          onChange={handleChange}
          className="input-field"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Q9: MFA Solution */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          9. Do you have an MFA (Multi-Factor Authentication) solution? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q9_mfa"
                value={option}
                checked={formData.q9_mfa === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q9_mfa && <p className="text-red-500 text-sm mt-1">{errors.q9_mfa}</p>}
      </div>

      {/* Q10: MFA Provider Name (conditional) */}
      {formData.q9_mfa === 'Yes' && (
        <div className="ml-6 border-l-4 border-primary-300 pl-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            10. What is your MFA provider name? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="q10_mfa_name"
            value={formData.q10_mfa_name}
            onChange={handleChange}
            className={`input-field ${errors.q10_mfa_name ? 'border-red-500' : ''}`}
            placeholder="e.g., Microsoft Authenticator, Duo, Okta"
          />
          {errors.q10_mfa_name && <p className="text-red-500 text-sm mt-1">{errors.q10_mfa_name}</p>}
        </div>
      )}

      {/* Q11: Password Manager */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          11. Do you have a password manager? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q11_password_manager"
                value={option}
                checked={formData.q11_password_manager === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q11_password_manager && <p className="text-red-500 text-sm mt-1">{errors.q11_password_manager}</p>}
      </div>

      {/* Q12: Password Manager Name (conditional) */}
      {formData.q11_password_manager === 'Yes' && (
        <div className="ml-6 border-l-4 border-primary-300 pl-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            12. What is your password manager name? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="q12_password_manager_name"
            value={formData.q12_password_manager_name}
            onChange={handleChange}
            className={`input-field ${errors.q12_password_manager_name ? 'border-red-500' : ''}`}
            placeholder="e.g., 1Password, LastPass, Bitwarden"
          />
          {errors.q12_password_manager_name && <p className="text-red-500 text-sm mt-1">{errors.q12_password_manager_name}</p>}
        </div>
      )}

      {/* Q13: MDM */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          13. Do you have an MDM (Mobile Device Management) solution? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q13_mdm"
                value={option}
                checked={formData.q13_mdm === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q13_mdm && <p className="text-red-500 text-sm mt-1">{errors.q13_mdm}</p>}
      </div>

      {/* Q14: Remote Work Policy */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          14. What is your remote work policy? <span className="text-red-500">*</span>
        </label>
        <select
          name="q14_remote_work"
          value={formData.q14_remote_work}
          onChange={handleChange}
          className={`input-field ${errors.q14_remote_work ? 'border-red-500' : ''}`}
        >
          <option value="">Select a remote work policy</option>
          <option value="Fully remote">Fully remote</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Office only">Office only</option>
          <option value="Not allowed">Not allowed</option>
        </select>
        {errors.q14_remote_work && <p className="text-red-500 text-sm mt-1">{errors.q14_remote_work}</p>}
      </div>

      {/* Q15: Cyber Insurance */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          15. Do you have cyber insurance? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q15_cyber_insurance"
                value={option}
                checked={formData.q15_cyber_insurance === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q15_cyber_insurance && <p className="text-red-500 text-sm mt-1">{errors.q15_cyber_insurance}</p>}
      </div>
    </div>
  );

  const renderPolicyPreferences = () => (
    <div className="space-y-6">
      {/* Q16: Personal Use */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          16. What level of personal use should be allowed on work devices? <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {['Prohibited', 'Minimal', 'Limited', 'Reasonable'].map(level => (
            <label key={level} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="q16_personal_use"
                value={level}
                checked={formData.q16_personal_use === level}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{level}</span>
            </label>
          ))}
        </div>
        {errors.q16_personal_use && <p className="text-red-500 text-sm mt-1">{errors.q16_personal_use}</p>}
      </div>

      {/* Q17: Personal Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          17. Can employees check personal email on work devices? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q17_personal_email"
                value={option}
                checked={formData.q17_personal_email === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q17_personal_email && <p className="text-red-500 text-sm mt-1">{errors.q17_personal_email}</p>}
      </div>

      {/* Q18: Personal Websites */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          18. Can employees visit personal websites on work devices? <span className="text-red-500">*</span>
        </label>
        <div className="flex space-x-4">
          {['Yes', 'No'].map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer flex-1">
              <input
                type="radio"
                name="q18_personal_websites"
                value={option}
                checked={formData.q18_personal_websites === option}
                onChange={handleChange}
                className="text-primary-600 focus:ring-primary-500"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.q18_personal_websites && <p className="text-red-500 text-sm mt-1">{errors.q18_personal_websites}</p>}
      </div>

      {/* Q19: Browser Sync */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          19. What is your browser sync policy? <span className="text-red-500">*</span>
        </label>
        <select
          name="q19_browser_sync"
          value={formData.q19_browser_sync}
          onChange={handleChange}
          className={`input-field ${errors.q19_browser_sync ? 'border-red-500' : ''}`}
        >
          <option value="">Select a browser sync policy</option>
          <option value="Prohibited">Prohibited</option>
          <option value="Enterprise accounts only">Enterprise accounts only</option>
          <option value="Allowed">Allowed</option>
        </select>
        {errors.q19_browser_sync && <p className="text-red-500 text-sm mt-1">{errors.q19_browser_sync}</p>}
      </div>

      {/* Q20: Cloud Storage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          20. Can employees use cloud storage for work data? <span className="text-red-500">*</span>
        </label>
        <select
          name="q20_cloud_storage"
          value={formData.q20_cloud_storage}
          onChange={handleChange}
          className={`input-field ${errors.q20_cloud_storage ? 'border-red-500' : ''}`}
        >
          <option value="">Select a cloud storage policy</option>
          <option value="Prohibited">Prohibited</option>
          <option value="Approved platforms only">Approved platforms only</option>
          <option value="Allowed">Allowed</option>
        </select>
        {errors.q20_cloud_storage && <p className="text-red-500 text-sm mt-1">{errors.q20_cloud_storage}</p>}
      </div>

      {/* Q21: Monitoring */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          21. Will you monitor internet/email activity? <span className="text-red-500">*</span>
        </label>
        <select
          name="q21_monitoring"
          value={formData.q21_monitoring}
          onChange={handleChange}
          className={`input-field ${errors.q21_monitoring ? 'border-red-500' : ''}`}
        >
          <option value="">Select monitoring policy</option>
          <option value="Yes, actively">Yes, actively</option>
          <option value="Yes, for investigations">Yes, for investigations</option>
          <option value="No">No</option>
        </select>
        {errors.q21_monitoring && <p className="text-red-500 text-sm mt-1">{errors.q21_monitoring}</p>}
      </div>

      {/* Q22: Social Media */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          22. Who can represent the company on social media? <span className="text-red-500">*</span>
        </label>
        <select
          name="q22_social_media"
          value={formData.q22_social_media}
          onChange={handleChange}
          className={`input-field ${errors.q22_social_media ? 'border-red-500' : ''}`}
        >
          <option value="">Select social media policy</option>
          <option value="Authorized only">Authorized personnel only</option>
          <option value="No one">No one</option>
          <option value="All with guidelines">All employees with guidelines</option>
        </select>
        {errors.q22_social_media && <p className="text-red-500 text-sm mt-1">{errors.q22_social_media}</p>}
      </div>

      {/* Q23: BYOD */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          23. What is your BYOD (Bring Your Own Device) policy? <span className="text-red-500">*</span>
        </label>
        <select
          name="q23_byod"
          value={formData.q23_byod}
          onChange={handleChange}
          className={`input-field ${errors.q23_byod ? 'border-red-500' : ''}`}
        >
          <option value="">Select BYOD policy</option>
          <option value="Not allowed">Not allowed</option>
          <option value="Allowed with MDM">Allowed with MDM enrollment</option>
          <option value="Guest network only">Guest network only</option>
        </select>
        {errors.q23_byod && <p className="text-red-500 text-sm mt-1">{errors.q23_byod}</p>}
        
        {/* Show warning if BYOD/MDM conflict */}
        {formData.q23_byod === 'Allowed with MDM' && formData.q13_mdm === 'No' && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              ⚠️ Warning: You selected "Allowed with MDM enrollment" but indicated you don't have an MDM solution. 
              Please either change your BYOD policy or go back and indicate you have MDM.
            </p>
          </div>
        )}
      </div>
    </div>
  );

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
            <button
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <ProgressBar 
          sections={sections}
          currentSection={currentSection}
        />

        {/* Form Section */}
        <div className="card mt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="text-gray-600">{sections[currentSection].description}</p>
          </div>

          {renderSection()}

          {/* Navigation Buttons */}
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
                {isSubmitting ? 'Generating...' : 'Generate Policy'}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Questionnaire;

