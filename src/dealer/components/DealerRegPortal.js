import { useState, useEffect, useContext } from "react";
import CompanyDetailsForm from "./forms/CompanyDetailsForm";
import InstallationsForm from "./forms/InstallationsForm";
import ProgressTracker from "./ProgressTracker";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import DocumentUploadsForm from "./forms/DocumentUploadsForm";
import { DealerContext } from "../../context/Context";
import { AuthContext } from "../../context/AuthContext";
import { addDealer, addDealerInstallation } from "../../api";
// Initial dealer data

const DealerRegistration = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [completedSections, setCompletedSections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const useDealer = useContext(DealerContext);
  const { dealer: initialDealer } = useDealer;
  const [dealer, setDealer] = useState(initialDealer);
  const useAuth = useContext(AuthContext);
  const { user: userData } = useAuth;
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
      dealer.national_ID_Copies_of_the_Directors !== null
    );
  };

  // Check if installations are added
  const isInstallationsComplete = () => {
    return dealer.dealer_installations !== null;
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
      const response = await addDealer(companyDetails, userData.user.id);
      console.log(response);
      toast.success("Your company details have been successfully saved.");
      // Close the section
      setActiveSection(null);
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
      // Simulate API call
      console.log(data);
      toast.success("Your documents have been successfully uploaded.");
      // Close the section
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
      // Simulate API call
      const installationsArray = JSON.parse(data.dealer_installations);
      installationsArray.forEach(async (installation) => {
        await addDealerInstallation(installation, 22);
      });
      toast.success("Your installation details have been successfully saved.");
      // Close the section
      setActiveSection(null);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving your installation details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Dealer Registration Portal
        </h1>
        <div className="max-w-3xl mx-auto">
          <ProgressTracker
            completedSections={completedSections}
            totalSections={3}
          />

          <div className="mt-8 space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
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

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === "documents" ? null : "documents"
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

            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() =>
                  setActiveSection(
                    activeSection === "installations" ? null : "installations"
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
