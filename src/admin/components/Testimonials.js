/**
 * Admin panel component for managing testimonials.
 *
 * Fetches testimonials from the API, displays them in a paginated grid,
 * and provides options to add, edit, or delete testimonials.
 *
 * Features:
 * - Fetches testimonials on mount and sets the document title.
 * - Displays testimonials with person, role, image, and message.
 * - Supports pagination with configurable testimonials per page.
 * - Allows deletion of testimonials with confirmation prompt.
 * - Provides navigation to add and edit testimonial forms.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered testimonials management UI.
 */
import { useEffect, useState } from "react";
import { getTestimonials, deleteTestimonial } from "../../api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 10;

  useEffect(() => {
    document.title = "Testimonials | Admin Panel";
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  const indexOfLastTestimonial = currentPage * testimonialsPerPage;
  const indexOfFirstTestimonial = indexOfLastTestimonial - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(
    indexOfFirstTestimonial,
    indexOfLastTestimonial
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = (testimonialId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this testimonial?"
    );

    if (confirmDelete) {
      const deleteTestimonialAsync = async () => {
        try {
          await deleteTestimonial(testimonialId);
          setTestimonials(
            testimonials.filter(
              (testimonial) => testimonial.id !== testimonialId
            )
          );
          console.log("Testimonial deleted successfully.");
        } catch (error) {
          console.error("Error deleting testimonial:", error);
        }
      };
      deleteTestimonialAsync();
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-navy-900">
        Manage Testimonials
      </h2>

      <Link
        to="/admin/testimonials/add"
        className="bg-orange-500 text-white px-4 py-2 rounded-full mb-6 inline-block"
      >
        Add Testimonial
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentTestimonials.length > 0 ? (
          currentTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-lg shadow-lg p-4 relative"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  {testimonial.image && (
                    <img
                      src={`https://api.auroraenergy.co.zw/testimonials/${testimonial.image}`}
                      alt={testimonial.person}
                      className="w-14 h-14 object-cover rounded-full"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg text-navy-900">
                      {testimonial.person}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.person_role}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to={`/admin/testimonials/edit/${testimonial.id}`}
                    className="text-navy-900"
                  >
                    <FaEdit className="cursor-pointer" />
                  </Link>
                  <FaTrash
                    onClick={() => handleDelete(testimonial.id)}
                    size={16}
                    className="text-orange-500 cursor-pointer"
                  />
                </div>
              </div>
              <p className="mt-4 text-gray-700">{testimonial.message}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-600">
            No testimonials available.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-10 space-x-2">
        {Array.from(
          {
            length: Math.ceil(testimonials.length / testimonialsPerPage),
          },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 rounded-full text-white transition-all ${
                currentPage === i + 1
                  ? "bg-orange-500"
                  : "bg-navy-900 hover:bg-orange-400"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Testimonials;
