import React from 'react';
import { BookOpen, Users, Package, FileText, Award, MessageSquare } from 'lucide-react';
import TourButton from './TourButton';
import {
  adminDashboardSteps,
  adminProductFormSteps,
  adminDealerVerificationSteps,
  adminQuotationSteps,
  adminUserManagementSteps,
  adminBlogFormSteps,
  adminTeamFormSteps,
  adminCaseStudyFormSteps,
} from './tourSteps';

/**
 * AdminManual component provides a comprehensive help center for admin users.
 * 
 * Displays categorized tour options for different admin functions including:
 * - Dashboard navigation
 * - Product management
 * - Dealer verification
 * - Content management
 * - User management
 * 
 * Each section includes tour buttons that launch guided walkthroughs.
 * 
 * @component
 * @returns {JSX.Element} Admin manual interface with categorized tour options
 */
const AdminManual = () => {
  const tourSections = [
    {
      title: "Dashboard & Navigation",
      icon: <BookOpen className="text-blue-600" size={24} />,
      description: "Learn how to navigate the admin dashboard and access different sections.",
      tours: [
        {
          label: "Dashboard Overview",
          steps: adminDashboardSteps,
          tourType: "admin-dashboard",
          description: "Get familiar with the main admin dashboard and sidebar navigation."
        }
      ]
    },
    {
      title: "Product Management",
      icon: <Package className="text-green-600" size={24} />,
      description: "Master product creation, editing, and inventory management.",
      tours: [
        {
          label: "Product Form Guide",
          steps: adminProductFormSteps,
          tourType: "admin-product-form",
          description: "Learn how to add and edit products with all required information."
        }
      ]
    },
    {
      title: "Dealer Management",
      icon: <Users className="text-purple-600" size={24} />,
      description: "Understand dealer verification and management processes.",
      tours: [
        {
          label: "Dealer Verification",
          steps: adminDealerVerificationSteps,
          tourType: "admin-dealer-verification",
          description: "Learn how to review and verify dealer applications."
        }
      ]
    },
    {
      title: "Quotation Management",
      icon: <FileText className="text-orange-600" size={24} />,
      description: "Handle customer quotation requests efficiently.",
      tours: [
        {
          label: "Quotation Processing",
          steps: adminQuotationSteps,
          tourType: "admin-quotations",
          description: "Learn how to review, approve, and manage customer quotations."
        }
      ]
    },
    {
      title: "Content Management",
      icon: <MessageSquare className="text-indigo-600" size={24} />,
      description: "Create and manage blogs, case studies, and team information.",
      tours: [
        {
          label: "Blog Creation",
          steps: adminBlogFormSteps,
          tourType: "admin-blog-form",
          description: "Learn how to create engaging blog posts with images."
        },
        {
          label: "Team Management",
          steps: adminTeamFormSteps,
          tourType: "admin-team-form",
          description: "Add and manage team member profiles and information."
        },
        {
          label: "Case Study Creation",
          steps: adminCaseStudyFormSteps,
          tourType: "admin-case-study-form",
          description: "Create compelling case studies to showcase your projects."
        }
      ]
    },
    {
      title: "User Management",
      icon: <Award className="text-red-600" size={24} />,
      description: "Manage admin users and system access.",
      tours: [
        {
          label: "User Administration",
          steps: adminUserManagementSteps,
          tourType: "admin-user-management",
          description: "Learn how to add and manage admin users in the system."
        }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Manual</h1>
        <p className="text-gray-600">
          Interactive guides to help you master the admin dashboard. Click on any tour button to start a guided walkthrough.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start with the "Dashboard Overview" tour to familiarize yourself with navigation</li>
          <li>• Use the "Product Form Guide" when adding your first products</li>
          <li>• The "Dealer Verification" tour is essential for managing dealer applications</li>
          <li>• Tours can be skipped at any time by clicking the "Skip Tour" button</li>
          <li>• You can restart any tour by clicking the tour button again</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminManual;