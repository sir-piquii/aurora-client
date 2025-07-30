import { useState, useContext } from "react";
import {
  User,
  Building2,
  FileText,
  Wrench,
  Lock,
  UserCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import FormField from "./ui/FormField";
import { DealerContext } from "../../context/Context.js";
import { toast } from "sonner";
import { updateProfile, changePassword, BASE_URL } from "../../api.js";
/**
 * Profile component for displaying and editing dealer profile information.
 *
 * This component allows a dealer to view and update their personal details, company details,
 * uploaded documents, and installations. It also provides functionality to change the account password.
 *
 * Features:
 * - View and edit personal details (email, username, full name).
 * - View company details (registered company, trading name, registration number, VAT number, TIN).
 * - View uploaded documents (tax clearance, certificate of incorporation, national ID copies).
 * - View installations associated with the dealer.
 * - Change account password with validation.
 *
 * State:
 * - isEditingProfile: Controls whether the profile edit form is shown.
 * - isChangingPassword: Controls whether the change password form is shown.
 * - isLoading: Indicates if a form submission is in progress.
 * - profileData: Stores editable profile fields.
 * - passwordData: Stores password change fields.
 *
 * Context:
 * - DealerContext: Provides dealer information.
 *
 * Dependencies:
 * - updateProfile: Function to update dealer profile.
 * - changePassword: Function to change dealer password.
 * - toast: Notification system for success/error messages.
 * - BASE_URL: Base URL for document images.
 * - FormField: Reusable form field component.
 * - Various icon components for UI.
 *
 * @component
 * @returns {JSX.Element} The rendered Profile component.
 */
const Profile = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const useDealer = useContext(DealerContext);
  const [isLoading, setIsLoading] = useState(false);
  const { dealer } = useDealer;
  const [profileData, setProfileData] = useState({
    user_email: dealer.user_email,
    user_username: dealer.user_username,
    user_full_name: dealer.user_full_name,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(dealer.id, {
        email: profileData.user_email,
        username: profileData.user_username,
        fullName: profileData.user_full_name,
      });
      toast.success("Your profile details have been successfully updated.");
      setIsEditingProfile(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setIsLoading(true);

    try {
      await changePassword(dealer.id, {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success("Your password has been successfully changed.");
      setIsChangingPassword(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        "Failed to update password. Please check your credentials and try again"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-screen mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
            <UserCircle className="h-12 w-12 text-blue-800 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              {dealer.user_full_name}
            </h1>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md divide-y divide-slate-200 dark:divide-slate-700">
        {/* Personal Details */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-800 dark:text-blue-400" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Personal Details
              </h2>
            </div>
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="text-sm text-blue-800 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
            >
              {isEditingProfile ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditingProfile ? (
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <FormField
                label="Email"
                name="user_email"
                type="email"
                value={profileData.user_email}
                onChange={handleProfileChange}
                required
              />
              <FormField
                label="Username"
                name="user_username"
                value={profileData.user_username}
                onChange={handleProfileChange}
                required
              />
              <FormField
                label="Full Name"
                name="user_full_name"
                value={profileData.user_full_name}
                onChange={handleProfileChange}
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
                >
                  {isLoading && (
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Email
                </dt>
                <dd className="text-slate-900 dark:text-white">
                  {dealer.user_email}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Username
                </dt>
                <dd className="text-slate-900 dark:text-white">
                  {dealer.user_username}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-slate-500 dark:text-slate-400">
                  Full Name
                </dt>
                <dd className="text-slate-900 dark:text-white">
                  {dealer.user_full_name}
                </dd>
              </div>
            </dl>
          )}
        </div>

        {/* Company Details */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Building2 className="h-5 w-5 text-blue-800 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Company Details
            </h2>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Registered Company
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.registered_company || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Trading Name
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.trading_name || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Registration Number
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.company_reg_number || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                VAT Number
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.VAT_number || "Not provided"}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                TIN
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.TIN || "Not provided"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Documents */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="h-5 w-5 text-blue-800 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Documents
            </h2>
          </div>
          <dl className="grid grid-cols-1 gap-4">
            <div className="basis-1 md:basis-1/2 lg:basis-1/2">
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Tax Clearance
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.tax_clearance ? (
                  <img
                    src={`${BASE_URL}/taxClearanceCertificates/${dealer.tax_clearance}`}
                    alt="Tax Clearance"
                    className="w-full h-40 object-contain mix-blend-multiply rounded shadow"
                  />
                ) : (
                  "Not uploaded"
                )}
              </dd>
            </div>
            <div className="basis-1 md:basis-1/2 lg:basis-1/2">
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                Certificate of Incorporation
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.certificate_of_incorporation ? (
                  <img
                    src={`${BASE_URL}/incorporationCertificates/${dealer.certificate_of_incorporation}`}
                    alt="Certificate of Incorporation"
                    className="w-full object-contain mix-blend-multiply h-40 rounded shadow"
                  />
                ) : (
                  "Not uploaded"
                )}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-slate-500 dark:text-slate-400">
                National ID Copies
              </dt>
              <dd className="text-slate-900 dark:text-white">
                {dealer.national_ID_Copies_of_the_Directors ? (
                  <div className="w-full flex-wrap flex gap-2">
                    {dealer?.national_ID_Copies_of_the_Directors
                      ?.split(",")
                      .map((image, index) => (
                        <img
                          key={index}
                          src={`${BASE_URL}/IDsOfDirectors/${image}`}
                          alt="National ID Copies"
                          className="w-30 h-40 rounded shadow"
                        />
                      ))}
                  </div>
                ) : (
                  "Not uploaded"
                )}
              </dd>
            </div>
          </dl>
        </div>

        {/* Installations */}
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Wrench className="h-5 w-5 text-blue-800 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Installations
            </h2>
          </div>
          {dealer.installations ? (
            <div className="space-y-4">
              {(typeof dealer.installations === "string"
                ? JSON.parse(dealer.installations)
                : dealer.installations
              ).map((installation, index) => (
                <div
                  key={installation.id}
                  className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg"
                >
                  <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                    Installation {index + 1}
                  </h3>
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-slate-500 dark:text-slate-400">
                        System Description
                      </dt>
                      <dd className="text-slate-900 dark:text-white">
                        {installation.systemDescription}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 dark:text-slate-400">
                        Size of System
                      </dt>
                      <dd className="text-slate-900 dark:text-white">
                        {installation.sizeOfSystem}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 dark:text-slate-400">
                        Email
                      </dt>
                      <dd className="text-slate-900 dark:text-white">
                        {installation.email}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-slate-500 dark:text-slate-400">
                        Phone Number
                      </dt>
                      <dd className="text-slate-900 dark:text-white">
                        {installation.phoneNumber}
                      </dd>
                    </div>
                  </dl>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              No installations added
            </p>
          )}
        </div>
      </div>
      {/* Change Password */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-blue-800 dark:text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Change Password
            </h2>
          </div>
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="text-sm text-blue-800 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
          >
            {isChangingPassword ? "Cancel" : "Change"}
          </button>
        </div>

        {isChangingPassword && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <FormField
              label="Current Password"
              name="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              required
            />
            <FormField
              label="New Password"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              required
            />
            <FormField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              required
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
              >
                {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
/*{dealer.dealer_installations ? (
            <div className="space-y-4">
              {JSON.parse(dealer.dealer_installations).map(
                (installation, index) => (
                  <div
                    key={installation.id}
                    className="bg-slate-50 dark:bg-slate-700/30 p-4 rounded-lg"
                  >
                    <h3 className="font-medium text-slate-900 dark:text-white mb-2">
                      Installation {index + 1}
                    </h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm text-slate-500 dark:text-slate-400">
                          System Description
                        </dt>
                        <dd className="text-slate-900 dark:text-white">
                          {installation.systemDescription}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-slate-500 dark:text-slate-400">
                          Size of System
                        </dt>
                        <dd className="text-slate-900 dark:text-white">
                          {installation.sizeOfSystem}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-slate-500 dark:text-slate-400">
                          Email
                        </dt>
                        <dd className="text-slate-900 dark:text-white">
                          {installation.email}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-slate-500 dark:text-slate-400">
                          Phone Number
                        </dt>
                        <dd className="text-slate-900 dark:text-white">
                          {installation.phoneNumber}
                        </dd>
                      </div>
                    </dl>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400">
              No installations added
            </p>
          )}*/
