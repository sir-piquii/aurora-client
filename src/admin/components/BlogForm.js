/**
 * BlogForm component for adding and editing blog posts.
 *
 * Features:
 * - Handles both creation and editing of blogs based on URL param `id`.
 * - Supports uploading, previewing, and removing up to 2 images per blog.
 * - Allows removal of existing images in edit mode.
 * - Uses FormData for submitting text and image data.
 * - Displays loading state while fetching or submitting data.
 *
 * @component
 * @returns {JSX.Element} Blog form UI
 */

/**
 * ImageUploader component for handling image uploads and previews.
 *
 * @param {Object} props
 * @param {number} props.maxImages - Maximum number of images allowed.
 * @param {File[]} props.images - Array of new image files selected by the user.
 * @param {function} props.setImages - Setter for updating the images array.
 * @param {string[]} [props.existingImageUrls=[]] - URLs of images already associated with the blog.
 * @param {function} [props.onRemoveExistingImage] - Callback for removing an existing image by URL.
 * @returns {JSX.Element} Image uploader UI
 */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBlogById, updateBlog, addBlog } from "../../api";
import { X, Upload } from "lucide-react";
import { toast } from "sonner";

// image uploader
const ImageUploader = ({
  maxImages,
  images,
  setImages,
  existingImageUrls = [],
  onRemoveExistingImage,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      addImages(files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) =>
        file.type.startsWith("image/")
      );
      addImages(files);
    }
  };

  const addImages = (newFiles) => {
    const totalCount = images.length + existingImageUrls.length;
    if (totalCount >= maxImages) {
      alert(`You can only upload a maximum of ${maxImages} images.`);
      return;
    }

    // Only add as many images as allowed by the max limit
    const availableSlots = maxImages - totalCount;
    const filesToAdd = newFiles.slice(0, availableSlots);

    setImages((prev) => [...prev, ...filesToAdd]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const canAddMoreImages = images.length + existingImageUrls.length < maxImages;

  return (
    <div className="mb-6">
      <label className="block text-gray-700 mb-2">
        Images (Maximum {maxImages})
      </label>

      {/* Existing images display */}
      {existingImageUrls.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Current images:</p>
          <div className="flex flex-wrap gap-4">
            {existingImageUrls.map((url, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded-lg overflow-hidden group"
              >
                <img
                  src={url}
                  alt={`Blog visual ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {onRemoveExistingImage && (
                  <button
                    type="button"
                    onClick={() => onRemoveExistingImage(url)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New images preview */}
      {images.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">New images to upload:</p>
          <div className="flex flex-wrap gap-4">
            {images.map((file, idx) => (
              <div
                key={idx}
                className="relative w-24 h-24 border rounded-lg overflow-hidden group"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Selected ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drag and drop area */}
      {canAddMoreImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            Drag and drop images here, or click to select files
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {`You can add ${
              maxImages - (images.length + existingImageUrls.length)
            } more image${
              maxImages - (images.length + existingImageUrls.length) !== 1
                ? "s"
                : ""
            }`}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple={maxImages > 1}
            onChange={handleFileSelect}
          />
        </div>
      )}
    </div>
  );
};
// blog form

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingImageUrls, setExistingImageUrls] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [removedImageUrls, setRemovedImageUrls] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
  });
  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchBlog = async () => {
        try {
          const data = await getBlogById(id);
          const blog = data[0];
          setFormData({
            title: blog.title,
            author: blog.author,
            body: blog.story,
          });

          // Set existing images if available
          if (blog.images && Array.isArray(blog.images)) {
            setExistingImageUrls(blog.images);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveExistingImage = (url) => {
    setExistingImageUrls((prev) => prev.filter((item) => item !== url));
    setRemovedImageUrls((prev) => [...prev, url]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const blogFormData = new FormData();
      // Add basic form fields
      blogFormData.append("title", formData.title);
      blogFormData.append("author", formData.author);
      blogFormData.append("body", formData.body);
      // Add new image files
      newImages.forEach((file) => {
        blogFormData.append("image", file);
      });
      // Add information about existing images
      blogFormData.append("existingImages", JSON.stringify(existingImageUrls));
      // Add information about removed images
      blogFormData.append("removedImages", JSON.stringify(removedImageUrls));
      if (isEditMode) {
        await updateBlog(id, blogFormData);
        toast.success("Blog updated successfully!");
      } else {
        await addBlog(blogFormData);
        toast.success("Blog added successfully!");
      }
      navigate("/admin/blogs");
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Failed to save blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        {isEditMode ? "Edit Blog" : "Add Blog"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="author"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            required
          />
        </div>

        <ImageUploader
          maxImages={2}
          images={newImages}
          setImages={setNewImages}
          existingImageUrls={existingImageUrls}
          onRemoveExistingImage={handleRemoveExistingImage}
        />

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="body"
          >
            Content
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all h-40"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            {isEditMode ? "Update Blog" : "Add Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
