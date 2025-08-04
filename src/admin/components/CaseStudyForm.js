/**
 * YoutubeInput component for validating and previewing YouTube video links.
 *
 * @component
 * @param {Object} props
 * @param {string} props.value - The current YouTube URL value.
 * @param {function(string):void} props.onChange - Callback when the input value changes.
 * @returns {JSX.Element}
 */

/**
 * ImageUpload component for uploading and previewing images.
 *
 * @component
 * @param {Object} props
 * @param {string[]} [props.images=[]] - Array of existing image filenames.
 * @param {File[]} [props.newImages=[]] - Array of new image files to be uploaded.
 * @param {function(File[]):void} props.onAddNewImages - Callback to update new images.
 * @param {function(string[]):void} props.onChange - Callback to update existing images.
 * @param {number} [props.maxImages=5] - Maximum number of images allowed.
 * @returns {JSX.Element}
 */

/**
 * CaseStudyForm component for adding or editing a case study.
 *
 * @component
 * @returns {JSX.Element}
 */
import {
  getCaseStudyById,
  updateCaseStudy,
  addCaseStudy,
  BASE_URL,
} from "../../api";
import { useState, useEffect } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const YoutubeInput = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = `https://www.youtube.com/watch?v=${url}`.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Validate YouTube URL
  useEffect(() => {
    if (!value) {
      setIsValid(null);
      setShowPreview(false);
      return;
    }

    const videoId = getYoutubeVideoId(value);
    setIsValid(!!videoId);
    setShowPreview(!!videoId);
  }, [value]);
  const videoId = getYoutubeVideoId(value);

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className={`w-full px-3 py-2 border rounded-md transition-colors duration-200 ${
            isValid === true
              ? "border-green-500 pr-10"
              : isValid === false
              ? "border-red-500 pr-10"
              : "border-gray-300"
          }`}
        />
        {isValid !== null && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isValid ? (
              <CheckCircle2 className="text-green-500 w-5 h-5" />
            ) : (
              <AlertCircle className="text-red-500 w-5 h-5" />
            )}
          </div>
        )}
      </div>

      {isValid === false && (
        <p className="text-red-500 text-sm">Please enter a valid YouTube URL</p>
      )}

      {showPreview && videoId && (
        <div className="mt-4 relative pt-[56.25%] bg-gray-100 rounded-lg overflow-hidden">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

// Image upload form
const ImageUpload = ({
  images = [],
  newImages = [],
  onAddNewImages,
  onChange,
  maxImages = 5,
}) => {
  const [dragActive, setDragActive] = useState(false);

  // Remove old image by index
  const removeOldImage = (index) => {
    const updated = [...images];
    updated.splice(index, 1);
    onChange(updated);
  };

  // Remove new image by index
  const removeNewImage = (index) => {
    const updated = [...newImages];
    updated.splice(index, 1);
    onAddNewImages(updated);
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  // Handle files for new images only
  const handleFiles = (files) => {
    const safeNewImages = newImages || [];
    const totalImages = images.length + safeNewImages.length;
    if (totalImages >= maxImages) return;
    const remainingSlots = maxImages - totalImages;
    const filesToProcess = Math.min(files.length, remainingSlots);
    const newFiles = [];
    Array.from(files)
      .slice(0, filesToProcess)
      .forEach((file) => {
        newFiles.push(file);
        // Only update state after all files are processed
        if (newFiles.length === filesToProcess) {
          onAddNewImages([...safeNewImages, ...newFiles]);
        }
      });
  };

  return (
    <div className="space-y-4">
      {(images.length > 0 || (newImages && newImages.length > 0)) && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((src, index) => (
            <div
              key={`old-${index}`}
              className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
            >
              <img
                src={`${BASE_URL}/caseStudyImages/${src}`}
                alt={"Preview"}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeOldImage(index)}
                className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 text-gray-700 
								hover:bg-opacity-100 hover:text-red-500 transition-colors duration-200
								opacity-0 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          {newImages &&
            newImages.map((file, index) => (
              <div
                key={`new-${index}`}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-1 text-gray-700 
								hover:bg-opacity-100 hover:text-red-500 transition-colors duration-200
								opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
        </div>
      )}

      {images.length + (newImages ? newImages.length : 0) < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200
					${
            dragActive
              ? "border-orange-500 bg-orange-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="mb-3 w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
              {dragActive ? (
                <Upload className="w-6 h-6" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </div>
            <p className="mb-2 text-sm font-medium text-gray-700">
              Drag and drop images here, or{" "}
              <span className="text-orange-500">browse</span>
            </p>
            <p className="text-xs text-gray-500">
              {images.length + (newImages ? newImages.length : 0)} of{" "}
              {maxImages} images added
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="mt-4 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium 
							text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
            >
              Select Files
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
// case study form

const CaseStudyForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newImages, setNewImages] = useState(null);
  const [formStep, setFormStep] = useState(1);
  const [caseStudy, setCaseStudy] = useState({
    projectName: "",
    location: "",
    systemCapacity: "",
    images: null,
    video: "",
  });
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchCaseStudy = async () => {
        try {
          const data = await getCaseStudyById(id);
          console.log(data);
          if (data) {
            setCaseStudy({
              projectName: data[0].projectName || "",
              location: data[0].location || "",
              systemCapacity: data[0].systemCapacity || "",
              images: data[0].images.split(",") || "",
              video: data[0].video || "",
            });
          } else {
            console.error("Case study not found.");
          }
        } catch (error) {
          console.error("Error fetching case study:", error);
        }
      };
      fetchCaseStudy();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseStudy((prev) => ({ ...prev, [name]: value }));
  };
  const handleImagesChange = (images) => {
    setCaseStudy((prev) => ({ ...prev, images }));
  };
  const handleYoutubeLinkChange = (youtubeLink) => {
    setCaseStudy({ ...caseStudy, video: youtubeLink });
  };
  const handleNewImages = (images) => {
    setNewImages(images);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (isEditMode) {
      try {
        await updateCaseStudy(id, caseStudy);
        toast.success("Case Study Added!");
      } catch (error) {
        console.error(error);
        toast.error("Failed to update Case Study");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        const formData = new FormData();
        newImages.forEach((image) => formData.append("images", image));
        formData.append("projectName", caseStudy.projectName);
        formData.append("location", caseStudy.location);
        formData.append("systemCapacity", caseStudy.systemCapacity);
        // Extract YouTube video ID from the link
        const getYoutubeVideoId = (url) => {
          if (!url) return "";
          const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
          const match = url.match(regExp);
          return match && match[2].length === 11 ? match[2] : "";
        };
        formData.append("video", getYoutubeVideoId(caseStudy.video));
        await addCaseStudy(formData);
        toast.success("Case Study Added!");
      } catch (error) {
        console.error("Error saving case study:", error);
        toast.error("Error Adding Case Study!");
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  const nextStep = () => setFormStep(2);
  const prevStep = () => setFormStep(1);
  const isCoreInfoValid =
    caseStudy.projectName && caseStudy.location && caseStudy.systemCapacity;
  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
          {isEditMode ? "Edit Case Study" : "Add Case Study"}
        </h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
						${formStep >= 1 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              1
            </div>
            <div
              className={`h-1 w-12 ${
                formStep > 1 ? "bg-orange-500" : "bg-gray-200"
              }`}
            ></div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium 
						${formStep >= 2 ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-600"}`}
            >
              2
            </div>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
      >
        {formStep === 1 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Project Information
            </h3>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={caseStudy.projectName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={caseStudy.location}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  placeholder="City, State, Country"
                />
              </div>

              <div>
                <label
                  htmlFor="systemCapacity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  System Capacity <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="systemCapacity"
                  name="systemCapacity"
                  value={caseStudy.systemCapacity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  placeholder="e.g., 5 kW, 10 MW"
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>

              <button
                type="button"
                onClick={nextStep}
                disabled={!isCoreInfoValid}
                className={`px-6 py-2 rounded-lg text-white font-medium transition-colors duration-200
								${
                  isCoreInfoValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {formStep === 2 && (
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Media</h3>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Images{" "}
                  <span className="text-gray-500 text-xs">(up to 5)</span>
                </label>
                <ImageUpload
<<<<<<< HEAD
=======
                  className="case-study-images"
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
                  images={caseStudy.images || []}
                  newImages={newImages}
                  onChange={handleImagesChange}
                  onAddNewImages={handleNewImages}
                  maxImages={3}
                />
              </div>
              <div>
                <label
                  htmlFor="youtubeLink"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  YouTube Video Link
                </label>
                <YoutubeInput
<<<<<<< HEAD
=======
                  className="youtube-input"
>>>>>>> cfee8f14bef653bc47cb15acc68991b364a19270
                  value={caseStudy.video || ""}
                  onChange={handleYoutubeLinkChange}
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevStep}
                className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !isCoreInfoValid}
                className={`px-6 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors duration-200
								${
                  isSubmitting || !isCoreInfoValid
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                <Save className="w-4 h-4" />
                {isEditMode ? "Update Case Study" : "Save Case Study"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CaseStudyForm;
