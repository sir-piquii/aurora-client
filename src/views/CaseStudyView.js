import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BASE_URL, getCaseStudyById } from "../api";

/**
 * Displays the details of a single case study, including project information,
 * an image carousel, and an embedded YouTube video.
 *
 * - Fetches case study data by ID if not provided via navigation state.
 * - Allows navigation back to the case studies list.
 * - Shows project name, location, and system capacity.
 * - Provides an image carousel for case study images.
 * - Embeds a YouTube video related to the case study.
 *
 * @component
 * @returns {JSX.Element} The rendered case study detail view.
 *
 * @example
 * // Usage in a route
 * <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
 */
export default function CaseStudyDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [caseStudy, setCaseStudy] = useState(location.state?.caseStudy || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!caseStudy) {
      const fetchCaseStudy = async () => {
        try {
          const data = await getCaseStudyById(id);
          setCaseStudy(data);
        } catch (error) {
          console.error("Error fetching case study:", error);
        }
      };
      fetchCaseStudy();
    }
  }, [id, caseStudy]);

  if (!caseStudy) {
    return <p className="p-4">Case study not found.</p>;
  }

  const images = caseStudy.images.split(",");
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 hover:underline mb-4"
      >
        ← Back to Case Studies
      </button>

      <h1 className="text-3xl font-bold">{caseStudy.projectName}</h1>
      <p className="text-gray-500">{caseStudy.location}</p>
      <p className="mt-4 text-gray-800">
        <strong>System Capacity:</strong> {caseStudy.systemCapacity}
      </p>

      {/* Image Carousel */}
      <div className="relative w-full mt-6">
        <img
          src={`${BASE_URL}/caseStudyImages/${images[currentImageIndex]}`}
          alt="Case Study"
          className="w-full object-cover rounded-lg"
        />
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md transform -translate-y-1/2 hover:bg-gray-700"
        >
          Next
        </button>
      </div>
      {/* Video Player */}
      <div className="mt-6">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${caseStudy.video}`}
          title="Case Study Video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
