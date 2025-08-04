import React from 'react';
import { Building2, FileText, Wrench, User, HelpCircle } from 'lucide-react';
import TourButton from './TourButton';
import {
  dealerRegistrationSteps,
  dealerCompanyFormSteps,
  dealerDocumentSteps,
  dealerInstallationSteps,
  dealerProfileSteps,
} from './tourSteps';

/**
 * DealerManual component provides a comprehensive help center for dealer users.
 * 
 * Displays categorized tour options for dealer functions including:
 * - Registration process
 * - Profile management
 * - Document uploads
 * - Installation examples
 * 
 * Each section includes tour buttons that launch guided walkthroughs.
 * 
 * @component
 * @returns {JSX.Element} Dealer manual interface with categorized tour options
 */
const DealerManual = () => {
  const tourSections = [
    {
      title: "Registration Process",
      icon: <Building2 className="text-blue-600" size={24} />,
      description: "Complete guide to becoming a verified dealer.",
      tours: [
        {
          label: "Registration Overview",
          steps: dealerRegistrationSteps,
          tourType: "dealer-registration",
          description: "Understand the complete dealer registration process and requirements."
        },
        {
          label: "Company Details Form",
          steps: dealerCompanyFormSteps,
          tourType: "dealer-company-form",
          description: "Learn how to properly fill out your company information."
        }
      ]
    },
    {
      title: "Document Management",
      icon: <FileText className="text-green-600" size={24} />,
      description: "Upload and manage required business documents.",
      tours: [
        {
          label: "Document Upload Guide",
          steps: dealerDocumentSteps,
          tourType: "dealer-documents",
          description: "Step-by-step guide for uploading required legal documents."
        }
      ]
    },
    {
      title: "Installation Examples",
      icon: <Wrench className="text-purple-600" size={24} />,
      description: "Add examples of your previous solar installations.",
      tours: [
        {
          label: "Installation Form",
          steps: dealerInstallationSteps,
          tourType: "dealer-installations",
          description: "Learn how to add installation examples to showcase your experience."
        }
      ]
    },
    {
      title: "Profile Management",
      icon: <User className="text-orange-600" size={24} />,
      description: "Manage your dealer profile and account settings.",
      tours: [
        {
          label: "Profile Overview",
          steps: dealerProfileSteps,
          tourType: "dealer-profile",
          description: "Navigate your profile page and manage account settings."
        }
      ]
    }
  ];

  const registrationTips = [
    "Complete all three sections (Company Details, Documents, Installations) for verification",
    "Ensure all uploaded documents are clear, readable, and current",
    "Provide at least 3 installation examples to demonstrate experience",
    "Double-check company registration details for accuracy",
    "Keep your contact information up to date for communication"
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dealer Manual</h1>
        <p className="text-gray-600">
          Interactive guides to help you complete your dealer registration and manage your profile. 
          Click on any tour button to start a guided walkthrough.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {tourSections.map((section, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              {section.icon}
              <h2 className="text-xl font-semibold text-gray-900 ml-3">{section.title}</h2>
            </div>
            
            <p className="text-gray-600 mb-4 text-sm">{section.description}</p>
            
            <div className="space-y-3">
              {section.tours.map((tour, tourIndex) => (
                <div key={tourIndex} className="border-l-4 border-orange-500 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-800">{tour.label}</h3>
                    <TourButton
                      steps={tour.steps}
                      tourType={tour.tourType}
                      label="Start"
                      variant="small"
                    />
                  </div>
                  <p className="text-xs text-gray-500">{tour.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
            <HelpCircle className="mr-2" size={20} />
            Registration Tips
          </h3>
          <ul className="text-sm text-green-800 space-y-2">
            {registrationTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-600 mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-3">Quick Start Guide</h3>
          <ol className="text-sm text-orange-800 space-y-2">
            <li className="flex items-start">
              <span className="bg-orange-200 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
              Start with the "Registration Overview\" tour
            </li>
            <li className="flex items-start">
              <span className="bg-orange-200 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
              Complete company details using the form guide
            </li>
            <li className="flex items-start">
              <span className="bg-orange-200 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
              Upload documents following the upload guide
            </li>
            <li className="flex items-start">
              <span className="bg-orange-200 text-orange-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
              Add installation examples to complete registration
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default DealerManual;