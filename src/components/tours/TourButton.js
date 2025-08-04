import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTour } from './TourProvider';

/**
 * TourButton component that triggers guided tours for different sections.
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.steps - Array of tour steps to execute
 * @param {string} props.tourType - Type identifier for the tour
 * @param {string} [props.label="Start Tour"] - Button label text
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.variant="primary"] - Button style variant
 * @returns {JSX.Element} Clickable button that starts a tour
 */
const TourButton = ({ 
  steps, 
  tourType, 
  label = "Start Tour", 
  className = "", 
  variant = "primary" 
}) => {
  const { startTour } = useTour();

  const handleStartTour = () => {
    startTour(steps, tourType);
  };

  const baseClasses = "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md";
  
  const variantClasses = {
    primary: "bg-orange-500 hover:bg-orange-600 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300",
    outline: "border-2 border-orange-500 text-orange-500 hover:bg-orange-50",
    small: "bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm px-3 py-1",
  };

  return (
    <button
      onClick={handleStartTour}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      title={`Start ${tourType} tour`}
    >
      <HelpCircle size={16} />
      {label}
    </button>
  );
};

export default TourButton;