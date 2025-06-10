import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaUserCircle } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getTestimonials, BASE_URL } from "../api";

/**
 * TestimonialCarousel is a React functional component that displays a carousel of testimonials.
 * 
 * - Fetches testimonial data asynchronously on mount using the `getTestimonials` API.
 * - Uses the `react-slick` Slider component to render testimonials in a responsive carousel.
 * - Each testimonial displays an image (or a fallback icon), the person's role, and their message.
 * - Carousel settings include autoplay, infinite looping, and responsive breakpoints for different screen sizes.
 * - Utilizes Tailwind CSS classes for styling and transitions.
 * 
 * @component
 * @returns {JSX.Element} A styled, responsive testimonial carousel.
 */
function TestimonialCarousel() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="px-4 transform transition-transform duration-300 hover:scale-105 py-8"
          >
            <div className="bg-navy-900 text-white rounded-lg shadow-lg h-[600px] flex flex-col p-6 transform transition-transform ">
              {/* Image Section */}
              <div className="flex justify-center mb-4">
                {testimonial.image ? (
                  <img
                    src={`${BASE_URL}/testimonials/${testimonial.image}`}
                    alt={testimonial.person}
                    loading="lazy"
                    className="w-24 h-24 object-cover rounded-full transition-transform duration-300 group-hover:scale-110 hover:rotate-[20deg]"
                  />
                ) : (
                  <FaUserCircle className="w-24 h-24 text-gray-500 rounded-full transition-transform duration-300 hover:rotate-[20deg]" />
                )}
              </div>
              {/* Card Content */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-orange-500">
                  {testimonial.person_role}
                </h3>
                <p
                  className="text-sm mt-2 text-ellipsis line-clamp-[19]"
                  title={testimonial.message}
                >
                  {testimonial.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default TestimonialCarousel;
