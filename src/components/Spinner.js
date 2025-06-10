import { Loader } from "lucide-react";
/**
 * Spinner component displays a centered loading spinner on the screen.
 * Utilizes a flexbox container to center the spinner both vertically and horizontally.
 * The Loader component is animated with a spinning effect.
 *
 * @component
 * @returns {JSX.Element} A full-screen centered spinner.
 */
const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin" />
    </div>
  );
};

export default Spinner;
