import React, { useState } from "react";

import { Upload, X, FileText, Check, Loader2 } from "lucide-react";

/**
 * DocumentUploadsForm component allows users to upload required dealer documents.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.dealer - Dealer object containing existing document file names.
 * @param {string} [props.dealer.tax_clearance] - Existing tax clearance document file name.
 * @param {string} [props.dealer.certificate_of_incorporation] - Existing certificate of incorporation file name.
 * @param {string|string[]} [props.dealer.national_ID_Copies_of_the_Directors] - Existing national ID copies file name(s).
 * @param {Function} props.onSubmit - Callback function called with selected files when the form is submitted and valid.
 * @param {boolean} props.isLoading - Indicates if the form is in a loading state (e.g., during upload).
 *
 * @returns {JSX.Element} The rendered document upload form.
 *
 * @example
 * <DocumentUploadsForm
 *   dealer={dealer}
 *   onSubmit={handleSubmit}
 *   isLoading={isUploading}
 * />
 */
const DocumentUploadsForm = ({ dealer, onSubmit, isLoading }) => {
  const [files, setFiles] = useState({
    tax_clearance: null,
    certificate_of_incorporation: null,
    national_ID_Copies_of_the_Directors: null,
  });

  const [fileNames, setFileNames] = useState({
    tax_clearance: dealer.tax_clearance || "",
    certificate_of_incorporation: dealer.certificate_of_incorporation || "",
    national_ID_Copies_of_the_Directors:
      dealer.national_ID_Copies_of_the_Directors || "",
  });

  const [errors, setErrors] = useState({});

  const handleFileChange = (e, field) => {
    const selectedFile = e.target.files?.[0] || null;

    if (selectedFile) {
      setFiles((prev) => ({ ...prev, [field]: selectedFile }));
      setFileNames((prev) => ({ ...prev, [field]: selectedFile.name }));

      // Clear error when file is selected
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const removeFile = (field) => {
    setFiles((prev) => ({ ...prev, [field]: null }));
    setFileNames((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!fileNames.tax_clearance) {
      newErrors.tax_clearance = "Tax Clearance document is required";
    }

    if (!fileNames.certificate_of_incorporation) {
      newErrors.certificate_of_incorporation =
        "Certificate of Incorporation is required";
    }

    if (!fileNames.national_ID_Copies_of_the_Directors) {
      newErrors.national_ID_Copies_of_the_Directors =
        "National ID Copies of Directors is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(files);
    }
  };

  const renderFileUpload = (
    field,
    label,
    accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
    multiple
  ) => {
    const fileName = fileNames[field];
    const error = errors[field];

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}{" "}
          {field !== "VAT_number" && field !== "TIN" && (
            <span className="text-red-500">*</span>
          )}
        </label>

        <div
          className={`border-2 border-dashed rounded-lg p-4 transition-colors duration-200 ${
            fileName &&
            (Array.isArray(fileName) ? fileName.length > 0 : fileName)
              ? "border-green-500 bg-green-50 dark:bg-green-900/10"
              : error
              ? "border-red-500 bg-red-50 dark:bg-red-900/10"
              : "border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400"
          }`}
        >
          {fileName &&
          (Array.isArray(fileName) ? fileName.length > 0 : fileName) ? (
            <div className="flex flex-col space-y-2">
              {(Array.isArray(fileName) ? fileName : [fileName]).map(
                (name, idx) => (
                  <div className="flex items-center justify-between" key={idx}>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-green-500" />
                      <span className="text-sm truncate max-w-xs">{name}</span>
                      {dealer[field] && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (multiple) {
                          setFiles((prev) => ({
                            ...prev,
                            [field]: (prev[field] || []).filter(
                              (_, i) => i !== idx
                            ),
                          }));
                          setFileNames((prev) => ({
                            ...prev,
                            [field]: (prev[field] || []).filter(
                              (_, i) => i !== idx
                            ),
                          }));
                        } else {
                          removeFile(field);
                        }
                      }}
                      disabled={multiple}
                      className="text-slate-500 hover:text-red-500 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                )
              )}
            </div>
          ) : (
            <div>
              <input
                id={field}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={(e) => {
                  const selectedFiles = Array.from(e.target.files || []);
                  if (multiple) {
                    setFiles((prev) => ({
                      ...prev,
                      [field]: selectedFiles,
                    }));
                    setFileNames((prev) => ({
                      ...prev,
                      [field]: selectedFiles.map((file) => file.name),
                    }));
                    if (errors[field]) {
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors[field];
                        return newErrors;
                      });
                    }
                  } else {
                    handleFileChange(e, field);
                  }
                }}
                className="hidden"
              />
              <label
                htmlFor={field}
                className="flex flex-col items-center justify-center cursor-pointer py-3"
              >
                <Upload className="h-8 w-8 text-slate-400 mb-2" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  PDF, DOC, DOCX, JPG, JPEG, PNG (max 10MB)
                </span>
              </label>
            </div>
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {renderFileUpload(
          "tax_clearance",
          "Tax Clearance",
          ".pdf,.doc,.docx,.jpg,.jpeg,.png",
          false
        )}

        {renderFileUpload(
          "certificate_of_incorporation",
          "Certificate of Incorporation",
          ".pdf,.doc,.docx,.jpg,.jpeg,.png",
          false
        )}

        {renderFileUpload(
          "national_ID_Copies_of_the_Directors",
          "National ID Copies of Directors (at least 3)",
          ".pdf,.jpg,.jpeg,.png",
          true
        )}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-md shadow-sm transition-colors duration-200 flex items-center"
        >
          {isLoading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
          Upload Documents
        </button>
      </div>
    </form>
  );
};

export default DocumentUploadsForm;
