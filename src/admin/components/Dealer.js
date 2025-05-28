import { useState, useCallback, useEffect } from "react";
import { Search, Filter, ChevronDown, Loader } from "lucide-react";
import DealerCard from "./DealerCard";
import { getDealers } from "../../api";
import { toast } from "sonner";


const Dealers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [count, setCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(12);

  const fetchDealers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDealers(statusFilter, pageNumber, itemsToShow);
      setDealers(data.rows);
      setCount(data.count);
    } catch (error) {
      toast.error(
        "An Error Occurred whilst getting dealers please refresh page!"
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, pageNumber, itemsToShow]);

  useEffect(() => {
    fetchDealers();
  }, [fetchDealers]);

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch =
      dealer.user_full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.trading_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dealer.user_username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "" ||
      dealer.reg_status.toLowerCase().includes(statusFilter.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(count / itemsToShow);

  const handlePrevPage = () => {
    if (pageNumber > 1) setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) setPageNumber(pageNumber + 1);
  };

  const handlePageClick = (page) => {
    setPageNumber(page);
  };

  const handleItemsToShowChange = (e) => {
    setItemsToShow(Number(e.target.value));
    setPageNumber(1); // Reset to first page when changing items per page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dealer Verification
        </h2>
        <p className="text-gray-600">
          Manage dealer applications and verify their details
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            placeholder="Search dealers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="relative"></div>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-between w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <div className="flex items-center">
            <Filter size={18} className="mr-2 text-gray-400" />
            {statusFilter
              ? statusFilter || "Filter by status"
              : "Filter by status"}
          </div>
          <ChevronDown size={16} className="text-gray-400" />
        </button>
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <button
                onClick={() => {
                  setStatusFilter("");
                  setIsFilterOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                All Statuses
              </button>
              {["Approved", "Pending", "Rejected"].map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {filteredDealers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No dealers found matching your criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDealers.map((dealer) => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      )}
      {/* Pagination controls and items per page selector */}
      <div className="sticky bottom-0 flex flex-col mt-5 sm:flex-row items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={itemsToShow}
            onChange={handleItemsToShowChange}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          >
            {[6, 12, 24, 48].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">per page</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber === 1}
            className={`px-2 py-1 rounded ${
              pageNumber === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageClick(i + 1)}
              className={`px-2 py-1 rounded ${
                pageNumber === i + 1
                  ? "bg-orange-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={pageNumber === totalPages || totalPages === 0}
            className={`px-2 py-1 rounded ${
              pageNumber === totalPages || totalPages === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dealers;