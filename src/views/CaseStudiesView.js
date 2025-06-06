import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCaseStudies, BASE_URL } from "../api";

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
  console.log(caseStudies);
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
