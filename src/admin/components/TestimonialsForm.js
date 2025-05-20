import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getTestimonialById,
	addTestimonial,
	updateTestimonial,
} from '../../api';
import { toast } from "sonner";

const TestimonialForm = () => {
  const [testimonial, setTestimonial] = useState({
    person: "",
    person_role: "",
    message: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchTestimonial = async () => {
        try {
          const data = await getTestimonialById(id);
          setTestimonial({
            person: data.testimonial.person,
            person_role: data.testimonial.person_role,
            message: data.testimonial.message,
          });
          setImagePreview(
            `https://dev-api.auroraenergy.co.zw/testimonials/${data.testimonial.image}`
          );
        } catch (error) {
          console.error("Error fetching testimonial:", error);
        }
      };
      fetchTestimonial();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("person", testimonial.person);
    formData.append("role", testimonial.person_role);
    formData.append("message", testimonial.message);
    if (imageFile) {
      formData.append("picture", imageFile);
    }
    try {
      if (isEditing) {
        await updateTestimonial(id, formData);
        toast.success("Testimonial updated successfully");
      } else {
        await addTestimonial(formData);
        toast.success("Testimonial added successfully");
      }
      navigate("/admin/testimonials");
    } catch (error) {
      toast.error("Failed to perform task");
      console.error("Error submitting testimonial:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        {isEditing ? "Edit Testimonial" : "Add Testimonial"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg space-y-4"
        encType="multipart/form-data"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="person" className="font-semibold text-sm">
            Person Name
          </label>
          <input
            type="text"
            id="person"
            name="person"
            value={testimonial.person}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="image" className="font-semibold text-sm">
            Person Image
          </label>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleImageChange}
            accept="image/*"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-2 rounded-lg border"
            />
          )}
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="person_role" className="font-semibold text-sm">
            Person Role
          </label>
          <input
            type="text"
            id="person_role"
            name="person_role"
            value={testimonial.person_role}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="font-semibold text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={testimonial.message}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            rows="4"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-2 rounded-full"
          >
            {isEditing ? "Update Testimonial" : "Add Testimonial"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="ml-4 bg-gray-400 text-white px-6 py-2 rounded-full"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
