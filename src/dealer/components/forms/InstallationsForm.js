import React, { useState } from "react";

import { Plus, Trash2, Loader2 } from "lucide-react";
import FormField from "../ui/FormField";

/**
 * InstallationsForm component allows users to add, edit, and remove multiple installation entries
 * for a dealer, each with system description, size, email, and phone number fields.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.dealer - The dealer object containing existing installations (as array or JSON string).
 * @param {Function} props.onSubmit - Callback function called with the installations data when the form is submitted and valid.
 * @param {boolean} props.isLoading - Indicates if the form is in a loading/submitting state.
 * 
 * @example
 * <InstallationsForm
 *   dealer={dealer}
 *   onSubmit={handleInstallationsSubmit}
 *   isLoading={isSubmitting}
 * />
 * 
 * @returns {JSX.Element} The rendered installations form.
 */
const InstallationsForm = ({ dealer, onSubmit, isLoading }) => {
  // Parse existing installations if available
  const parseInstallations = () => {
    if (!dealer.installations) return [];
    try {
      return typeof dealer.installations === "string"
        ? JSON.parse(dealer.installations)
        : dealer.installations;
    } catch (e) {
      return [];
    }
  };

  const [installations, setInstallations] = useState(parseInstallations());
  const [errors, setErrors] = useState({});

  const addInstallation = () => {
    const newInstallation = {
      id: Date.now().toString(),
      systemDescription: "",
      sizeOfSystem: "",
      email: "",
      phoneNumber: "",
    };

    setInstallations((prev) => [...prev, newInstallation]);
  };

  const removeInstallation = (id) => {
    setInstallations((prev) =>
      prev.filter((installation) => installation.id !== id)
    );

    // Remove errors for this installation
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[id];
      return newErrors;
    });
  };

  const handleChange = (id, field, value) => {
    setInstallations((prev) =>
      prev.map((installation) =>
        installation.id === id
          ? { ...installation, [field]: value }
          : installation
      )
    );

    // Clear error when user starts typing
    if (errors[id]?.[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (newErrors[id]) {
          delete newErrors[id][field];
          if (Object.keys(newErrors[id]).length === 0) {
            delete newErrors[id];
          }
        }
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    installations.forEach((installation) => {
      const installationErrors = {};

      if (!installation.systemDescription.trim()) {
        installationErrors.systemDescription = "System Description is required";
        isValid = false;
      }

      if (!installation.sizeOfSystem.trim()) {
        installationErrors.sizeOfSystem = "Size of System is required";
        isValid = false;
      }

      if (!installation.email.trim()) {
        installationErrors.email = "Email is required";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(installation.email)) {
        installationErrors.email = "Email is invalid";
        isValid = false;
      }

      if (!installation.phoneNumber.trim()) {
        installationErrors.phoneNumber = "Phone Number is required";
        isValid = false;
      }

      if (Object.keys(installationErrors).length > 0) {
        newErrors[installation.id] = installationErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (installations.length === 0) {
      addInstallation();
      return;
    }

    if (validateForm()) {
      // Convert installations to JSON string
      const dealer_installations = JSON.stringify(installations);
      onSubmit({ dealer_installations });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {installations.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            No installations added yet. Add your first installation.
          </p>
          <button
            type="button"
            onClick={addInstallation}
<<<<<<< HEAD
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
=======
            className="add-installation-btn inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Installation
          </button>
        </div>
      ) : (
        <>
          {installations.map((installation, index) => (
            <div
              key={installation.id}
              className="bg-slate-50 dark:bg-slate-700/30 p-6 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                  Installation {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeInstallation(installation.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="System Description"
                  name={`${installation.id}-systemDescription`}
                  value={installation.systemDescription}
                  onChange={(e) =>
                    handleChange(
                      installation.id,
                      "systemDescription",
                      e.target.value
                    )
                  }
                  error={errors[installation.id]?.systemDescription}
                  required
                />

                <FormField
                  label="Size of System"
                  name={`${installation.id}-sizeOfSystem`}
                  value={installation.sizeOfSystem}
                  onChange={(e) =>
                    handleChange(
                      installation.id,
                      "sizeOfSystem",
                      e.target.value
                    )
                  }
                  error={errors[installation.id]?.sizeOfSystem}
                  required
                />

                <FormField
                  label="Email"
                  name={`${installation.id}-email`}
                  type="email"
                  value={installation.email}
                  onChange={(e) =>
                    handleChange(installation.id, "email", e.target.value)
                  }
                  error={errors[installation.id]?.email}
                  required
                />

                <FormField
                  label="Phone Number"
                  name={`${installation.id}-phoneNumber`}
                  value={installation.phoneNumber}
                  onChange={(e) =>
                    handleChange(installation.id, "phoneNumber", e.target.value)
                  }
                  error={errors[installation.id]?.phoneNumber}
                  required
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={addInstallation}
<<<<<<< HEAD
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors"
=======
              className="add-installation-btn inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 transition-colors"
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Installation
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
              Save Installations
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default InstallationsForm;
