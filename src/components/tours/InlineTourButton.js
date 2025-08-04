import React from 'react';
import { HelpCircle } from 'lucide-react';
import { useTour } from './TourProvider';

/**
 * InlineTourButton component for adding help buttons directly within forms and components.
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.steps - Array of tour steps to execute
 * @param {string} props.tourType - Type identifier for the tour
 * @param {string} [props.tooltip="Get help with this form"] - Tooltip text
 * @returns {JSX.Element} Small help button for inline use
 */
const InlineTourButton = ({ steps, tourType, tooltip = "Get help with this form" }) => {
  const { startTour } = useTour();

  const handleStartTour = () => {
    startTour(steps, tourType);
  };

  return (
    <button
      onClick={handleStartTour}
      className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 transition-colors"
      title={tooltip}
      type="button"
    >
      <HelpCircle size={14} />
    </button>
  );
};

export default InlineTourButton;