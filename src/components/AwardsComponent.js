import { useEffect, useState, useCallback } from "react";
import { getAwards, BASE_URL } from "../api";
import { AwardIcon, Loader } from "lucide-react";
const AwardCard = ({ award }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="h-48 overflow-hidden bg-gray-200 relative">
          {award.image ? (
            <img
              src={`${BASE_URL}/awards/${award.image}`}
              alt={award.name}
              style={{ mixBlendMode: "multiply" }}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <AwardIcon size={64} />
            </div>
          )}

          {/* Control overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between p-3 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {award.name}
          </h3>
        </div>
      </div>
    </>
  );
};

/**
 * Awards component fetches and displays a list of awards.
 *
 * - Fetches awards data asynchronously on mount.
 * - Shows a loading spinner while data is being fetched.
 * - Renders a list of AwardCard components for each award.
 *
 * @component
 * @returns {JSX.Element} The rendered Awards component.
 */
function Awards() {
  const [awards, setAwards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAwards = useCallback(async () => {
    try {
      const data = await getAwards();
      setAwards(data);
    } catch (error) {
      console.error("Error fetching awards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAwards();
  }, [fetchAwards]);
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="w-full flex gap-3 flex-wrap justify-center">
        {awards?.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </div>
  );
}

export default Awards;
