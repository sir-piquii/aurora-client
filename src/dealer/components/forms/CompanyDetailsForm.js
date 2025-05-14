import React, { useState } from "react";

import { Loader2 } from "lucide-react";
import FormField from "../ui/FormField";
const CompanyDetailsForm = ({ dealer, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    registered_company: dealer.registered_company || "",
    trading_name: dealer.trading_name || "",
    company_reg_number: dealer.company_reg_number || "",
    VAT_number: dealer.VAT_number || "",
    TIN: dealer.TIN || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.registered_company.trim()) {
      newErrors.registered_company = "Registered Company Name is required";
    }

    if (!formData.trading_name.trim()) {
      newErrors.trading_name = "Trading Name is required";
    }

    if (!formData.company_reg_number.trim()) {
      newErrors.company_reg_number = "Company Registration Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Registered Company Name"
          name="registered_company"
          value={formData.registered_company}
          onChange={handleChange}
          error={errors.registered_company}
          required
        />

        <FormField
          label="Trading Name"
          name="trading_name"
          value={formData.trading_name}
          onChange={handleChange}
          error={errors.trading_name}
          required
        />

        <FormField
          label="Company Registration Number"
          name="company_reg_number"
          value={formData.company_reg_number}
          onChange={handleChange}
          error={errors.company_reg_number}
          required
        />

        <FormField
          label="VAT Number (Optional)"
          name="VAT_number"
          value={formData.VAT_number || ""}
          onChange={handleChange}
        />

        <FormField
          label="TIN (Optional)"
          name="TIN"
          value={formData.TIN || ""}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
        >
          {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Save Company Details
        </button>
      </div>
    </form>
  );
};

export default CompanyDetailsForm;
