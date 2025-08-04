import { useState, useEffect, useContext } from "react";
import CompanyDetailsForm from "./forms/CompanyDetailsForm";
import InstallationsForm from "./forms/InstallationsForm";
import ProgressTracker from "./ProgressTracker";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import DocumentUploadsForm from "./forms/DocumentUploadsForm";
import { DealerContext } from "../../context/Context";
import { AuthContext } from "../../context/AuthContext";
import {
  addDealer,
  addDealerInstallation,
  uploadTaxCertificate,
  uploadIncorporationCertificate,
  uploadNationalId,
} from "../../api";
// Initial dealer data

/**
 * DealerRegistration component provides a multi-step registration portal for dealers.
 * 
 * This component manages the registration process, including:
 *  - Company details submission
 *  - Required document uploads
 *  - Dealer installations entry
 * 
 * It tracks the completion status of each section, handles form submissions, 
 * manages loading states, and provides user feedback via toast notifications.
 * 
 * Contexts:
 *  - DealerContext: Provides initial dealer data.
 *  - AuthContext: Provides authenticated user data.
 * 
 * State:
 *  - activeSection: Currently open registration section.
 *  - completedSections: Array of completed registration sections.
 *  - isLoading: Indicates if a submission is in progress.
 *  - dealer: Current dealer data.
 * 
 * Helper Functions:
 *  - isCompanyDetailsComplete: Checks if company details are complete.
 *  - isDocumentsComplete: Checks if required documents are uploaded.
 *  - isInstallationsComplete: Checks if installations are added.
 *  - handleCompanyDetailsSubmit: Handles company details form submission.
 *  - handleDocumentUploadsSubmit: Handles document uploads.
 *  - handleInstallationsSubmit: Handles installations submission.
 *  - handleUploadTaxCertificate, handleUploadIncorporationCertificate, handleUploadNationalId: Handle specific file uploads.
 * 
 * UI:
 *  - Displays a progress tracker and three collapsible sections for each registration step.
 *  - Each section shows a form and completion status.
 * 
 * @component
 * @returns {JSX.Element} The rendered Dealer Registration Portal UI.
 */
const DealerRegistration = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const useDealer = useContext(DealerContext);
  const { dealer: initialDealer } = useDealer;
  const [dealer, setDealer] = useState(initialDealer);
  const useAuth = useContext(AuthContext);
  const { user: userData } = useAuth;
  console.log(initialDealer);
  const dealer_status = dealer?.reg_status ? dealer.reg_status : "Not Started";
  // Check if company details are completed
  const isCompanyDetailsComplete = () => {
    return (
      dealer.registered_company !== null &&
      dealer.trading_name !== null &&
      dealer.company_reg_number !== null
    );
  };

  // Check if documents are uploaded
  const isDocumentsComplete = () => {
    return (
      dealer.tax_clearance !== null &&
      dealer.certificate_of_incorporation !== null &&
      dealer.national_ID_Copies_of_the_Directors
    );
  };

  // Check if installations are added
  const isInstallationsComplete = () => {
    const dealerInstallations = dealer?.installations
      ? typeof dealer?.installations === "string"
        ? JSON.parse(dealer?.installations)
        : dealer?.installations
      : [];
    return dealerInstallations.length >= 3;
  };

  // Update completed sections based on dealer data
  useEffect(() => {
    const completed = [];
    if (isCompanyDetailsComplete()) completed.push("company");
    if (isDocumentsComplete()) completed.push("documents");
    if (isInstallationsComplete()) completed.push("installations");
    setCompletedSections(completed);
  }, [dealer]);

  // Handle form submission for company details
  const handleCompanyDetailsSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Simulate API call
      const companyDetails = {
        registeredCompanyName: data.registered_company,
        tradingName: data.trading_name,
        companyRegistrationNumber: data.company_reg_number,
        VATNumber: data.VAT_number,
        TIN: data.TIN,
      };
      await addDealer(companyDetails, userData.user.id);
      toast.success("Your company details have been successfully saved.");
      setActiveSection(null);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving your company details.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle document uploads
  const handleDocumentUploadsSubmit = async (data) => {
    setIsLoading(true);
    try {
      // Extract document files from data
      const taxClearance = data.tax_clearance;
      const certificateOfIncorporation = data.certificate_of_incorporation;
      const nationalIdCopies = data.national_ID_Copies_of_the_Directors;
      if (taxClearance && typeof taxClearance !== "string") {
        await handleUploadTaxCertificate(dealer.dealer_id, taxClearance);
      }
      if (
        certificateOfIncorporation &&
        typeof certificateOfIncorporation !== "string"
      ) {
        await handleUploadIncorporationCertificate(
          dealer.dealer_id,
          certificateOfIncorporation
        );
      }
      if (nationalIdCopies && typeof nationalIdCopies !== "string") {
        await handleUploadNationalId(dealer.dealer_id, nationalIdCopies);
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setActiveSection(null);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while uploading your documents.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle installations submission
  const handleInstallationsSubmit = async (data) => {
    setIsLoading(true);
    try {
      const installationsArray = JSON.parse(data.dealer_installations);
      installationsArray.forEach(async (installation) => {
        await addDealerInstallation(installation, dealer.dealer_id);
      });
      toast.success("Your installation details have been successfully saved.");
      // Close the section
      setActiveSection(null);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving your installation details.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUploadTaxCertificate = async (id, certificate) => {
    try {
      const formData = new FormData();
      formData.append("taxClearance", certificate);
      await uploadTaxCertificate(formData, id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload tax certificate!");
    }
  };
  const handleUploadIncorporationCertificate = async (id, certificate) => {
    try {
      const formData = new FormData();
      formData.append("certificate", certificate);
      await uploadIncorporationCertificate(formData, id);
      toast.success("Tax Certificate Uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload tax certificate!");
    }
  };
  const handleUploadNationalId = async (id, certificates) => {
    try {
      const formData = new FormData();
      certificates.forEach((certificate) => {
        formData.append("IDsOfDirectors", certificate);
      });
      await uploadNationalId(formData, id);
      toast.success("IDs uploaded successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload tax certificate!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Dealer Registration Portal
        </h1>
        <div className="flex justify-end mx-auto p-2">
          <span className="text-orange-500 text-sm">Status: {dealer_status}</span>
        </div>
        <div className="max-w-3xl mx-auto">
          <ProgressTracker
            className="progress-tracker"
            completedSections={completedSections}
            totalSections={3}
          />
          <div className="mt-8 space-y-6">
            <div className="company-details-section bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === "company" ? null : "company"
                  )
                }
                className={`w-full px-6 py-4 text-left font-medium flex justify-between items-center ${
                  completedSections.includes("company")
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                } hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200`}
              >
                <span className="text-lg">Company Details</span>
                {completedSections.includes("company") && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </button>

              {activeSection === "company" && (
                <div className="p-6 animate-fadeIn">
                  <CompanyDetailsForm
                    dealer={dealer}
                    onSubmit={handleCompanyDetailsSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>

            <div className="documents-section bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setActiveSection(
                    isCompanyDetailsComplete && activeSection === "documents"
                      ? null
                      : "documents"
                  )
                }
                className={`w-full px-6 py-4 text-left font-medium flex justify-between items-center ${
                  completedSections.includes("documents")
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                } hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200`}
              >
                <span className="text-lg">Required Documents</span>
                {completedSections.includes("documents") && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </button>

              {activeSection === "documents" && (
                <div className="p-6 animate-fadeIn">
                  <DocumentUploadsForm
                    dealer={dealer}
                    onSubmit={handleDocumentUploadsSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>

            <div className="installations-section bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setActiveSection(
                    isCompanyDetailsComplete &&
                      activeSection === "installations"
                      ? null
                      : "installations"
                  )
                }
                className={`w-full px-6 py-4 text-left font-medium flex justify-between items-center ${
                  completedSections.includes("installations")
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                } hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-200`}
              >
                <span className="text-lg">Dealer Installations</span>
                {completedSections.includes("installations") && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </button>

              {activeSection === "installations" && (
                <div className="p-6 animate-fadeIn">
                  <InstallationsForm
                    dealer={dealer}
                    onSubmit={handleInstallationsSubmit}
                    isLoading={isLoading}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealerRegistration;