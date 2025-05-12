import { useEffect, useState, useCallback } from "react";
import { getAwards, getAwardById, uploadAward, BASE_URL } from "../../api";
import { AwardIcon, Pencil, Trash2, PlusCircle } from "lucide-react";
import AwardForm from "./AwardForm";
import { toast } from "sonner";
const AwardCard = ({ award, onEdit }) => {
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
          >
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(award)}
                className="p-2 bg-blue-950 text-white rounded-full hover:bg-blue-800 transition-colors"
                title="Edit Award"
              >
                <Pencil size={16} />
              </button>
              <button
                className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-400 transition-colors"
                title="Delete Award"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {award.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            added on: {new Date(award.createdAt).toDateString()}
          </p>
        </div>
      </div>
    </>
  );
};

function Awards() {
  const [awards, setAwards] = useState([]);
  const [, setIsLoading] = useState(true);
  const [openAddAward, setOpenAddAward] = useState(false);
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

  const onEdit = async (award) => {
    try {
      const data = await getAwardById(award.id);
      console.log("Award data:", data);
    } catch (error) {
      console.error("Error fetching award by ID:", error);
    }
  };
  const onDelete = async (award) => {
    // Implement delete logic here
    console.log("Delete award:", award);
  };
  const handleAddAward = async (newAward) => {
    // Implement add award logic here
    try {
      await uploadAward(newAward);
      toast.success("Award added successfully");
    } catch (error) {
      console.error("Error adding award:", error);
      toast.error("Failed to add award");
    } finally {
      setOpenAddAward(false);
      fetchAwards();
    }
  };
  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-blue-950 flex items-center">
              <AwardIcon className="mr-2 text-orange-500" size={32} />
              <span>Awards Management</span>
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your company's awards and achievements
            </p>
          </div>
          <button
            onClick={() => setOpenAddAward(true)}
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors shadow-sm"
          >
            <PlusCircle className="mr-2" size={20} />
            <span>Add New Award</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {awards?.map((award) => (
          <AwardCard
            key={award.id}
            award={award}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
      <AwardForm
        isOpen={openAddAward}
        onCancel={() => setOpenAddAward(false)}
        onSubmit={handleAddAward}
        award={null}
      />
    </div>
  );
}

export default Awards;
