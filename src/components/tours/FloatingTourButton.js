import React, { useState } from 'react';
import { HelpCircle, X, BookOpen, Users, Package, FileText, Award, MessageSquare } from 'lucide-react';
import { useTour } from './TourProvider';
import {
  adminDashboardSteps,
  adminProductFormSteps,
  adminDealerVerificationSteps,
  adminQuotationSteps,
  adminUserManagementSteps,
  adminBlogFormSteps,
  adminTeamFormSteps,
  adminCaseStudyFormSteps,
  dealerRegistrationSteps,
  dealerCompanyFormSteps,
  dealerDocumentSteps,
  dealerInstallationSteps,
  dealerProfileSteps,
} from './tourSteps';

/**
 * FloatingTourButton component provides a floating help button with tour options.
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.userRole="user"] - Current user role (admin, dealer, user)
 * @param {string} [props.currentPage] - Current page identifier to show relevant tours
 * @returns {JSX.Element} Floating button with expandable tour menu
 */
const FloatingTourButton = ({ userRole = "user", currentPage }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { startTour } = useTour();

  const handleStartTour = (steps, tourType) => {
    startTour(steps, tourType);
    setIsExpanded(false);
  };

  // Define available tours based on user role and current page
  const getAvailableTours = () => {
    const tours = [];

    if (userRole === "admin" || userRole === "super") {
      tours.push(
        {
          label: "Dashboard Overview",
          icon: <BookOpen size={16} />,
          steps: adminDashboardSteps,
          tourType: "admin-dashboard",
          description: "Navigate the admin dashboard"
        },
        {
          label: "Product Management",
          icon: <Package size={16} />,
          steps: adminProductFormSteps,
          tourType: "admin-product-form",
          description: "Learn product form features"
        },
        {
          label: "Dealer Verification",
          icon: <Users size={16} />,
          steps: adminDealerVerificationSteps,
          tourType: "admin-dealer-verification",
          description: "Verify dealer applications"
        },
        {
          label: "Quotation Management",
          icon: <FileText size={16} />,
          steps: adminQuotationSteps,
          tourType: "admin-quotations",
          description: "Manage customer quotations"
        },
        {
          label: "User Management",
          icon: <Award size={16} />,
          steps: adminUserManagementSteps,
          tourType: "admin-user-management",
          description: "Manage admin users"
        },
        {
          label: "Blog Creation",
          icon: <MessageSquare size={16} />,
          steps: adminBlogFormSteps,
          tourType: "admin-blog-form",
          description: "Create engaging blog posts"
        },
        {
          label: "Team Management",
          icon: <Users size={16} />,
          steps: adminTeamFormSteps,
          tourType: "admin-team-form",
          description: "Manage team members"
        },
        {
          label: "Case Study Creation",
          icon: <FileText size={16} />,
          steps: adminCaseStudyFormSteps,
          tourType: "admin-case-study-form",
          description: "Create case studies"
        }
      );
    } else if (userRole === "dealer") {
      tours.push(
        {
          label: "Registration Process",
          icon: <BookOpen size={16} />,
          steps: dealerRegistrationSteps,
          tourType: "dealer-registration",
          description: "Complete dealer registration"
        },
        {
          label: "Company Details",
          icon: <Package size={16} />,
          steps: dealerCompanyFormSteps,
          tourType: "dealer-company-form",
          description: "Fill company information"
        },
        {
          label: "Document Upload",
          icon: <FileText size={16} />,
          steps: dealerDocumentSteps,
          tourType: "dealer-documents",
          description: "Upload required documents"
        },
        {
          label: "Installation Examples",
          icon: <Award size={16} />,
          steps: dealerInstallationSteps,
          tourType: "dealer-installations",
          description: "Add installation examples"
        },
        {
          label: "Profile Management",
          icon: <Users size={16} />,
          steps: dealerProfileSteps,
          tourType: "dealer-profile",
          description: "Manage your profile"
        }
      );
    }

    return tours;
  };

  const availableTours = getAvailableTours();

  if (availableTours.length === 0) {
    return null; // Don't show the button if no tours are available
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">Help & Tours</h3>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {availableTours.map((tour, index) => (
              <button
                key={index}
                onClick={() => handleStartTour(tour.steps, tour.tourType)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border border-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-orange-500">
                    {tour.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {tour.label}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tour.description}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Click any tour to get step-by-step guidance
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
          isExpanded 
            ? 'bg-gray-600 hover:bg-gray-700' 
            : 'bg-orange-500 hover:bg-orange-600 hover:scale-110'
        } text-white`}
        title="Help & Tours"
      >
        {isExpanded ? <X size={24} /> : <HelpCircle size={24} />}
      </button>
    </div>
  );
};

export default FloatingTourButton;