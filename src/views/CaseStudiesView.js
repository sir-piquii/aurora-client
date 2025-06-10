import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCaseStudies, BASE_URL } from "../api";

/**
 * React component that displays a list of case studies in a responsive grid.
 * Fetches case studies from the backend on mount and displays each as a card with an image, project name, and location.
 * Clicking a card navigates to the detailed view of the selected case study.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Case Studies view.
 *
 * @example
 * // Usage in a React Router route
 * <Route path="/case-studies" element={<CaseStudies />} />
 *
 * @function
 *
 * @namespace CaseStudiesView
 *
 * @description
 * - Sets the document title to "Case Studies | Aurora Energy" on mount.
 * - Fetches case studies using the `getCaseStudies` API function.
 * - Displays each case study as a clickable card.
 * - Navigates to `/case-study/:id` with the selected case study's data in state.
 */
export default function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Case Studies | Aurora Energy";
    const fetchCaseStudies = async () => {
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error("Error fetching case studies:", error);
      }
    };
    fetchCaseStudies();
  }, []);

  const handleCaseStudyClick = (caseStudy) => {
    navigate(`/case-study/${caseStudy.id}`, { state: { caseStudy } });
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-24 flex items-center justify-center bg-navy-900 text-white text-5xl font-bold">
        Case Studies
      </div>

      <div className="w-10/12 mx-auto mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((caseStudy) => {
          const firstImage = caseStudy.images.split(",")[0]; // Get first image
          return (
            <div
              key={caseStudy.id}
              className="bg-white rounded-lg shadow-lg cursor-pointer hover:bg-gray-100"
              onClick={() => handleCaseStudyClick(caseStudy)}
            >
              <img
                src={`${BASE_URL}/caseStudyImages/${firstImage}`}
                alt={caseStudy.projectName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="p-4">
                <h3 className="font-bold text-xl">{caseStudy.projectName}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {caseStudy.location}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
