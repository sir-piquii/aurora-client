import { getSales } from "../../api";
import Spinner from "../../components/Spinner";
import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import SalesTable from "../components/sales/SalesTable";
import SaleForm from "../components/sales/SaleForm";
import DeleteConfirmation from "../components/sales/DeleteConfirmation";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

const Sales = () => {
  const [sales, setSales] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentSale, setCurrentSale] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const fetchSales = useCallback(async () => {
    try {
      const data = await getSales();
      setSales(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchSales();
  }, [fetchSales]);
  // Add sale handler
  const handleAddSale = (newSale) => {
    setSales((prev) => [...prev, newSale]);
    setIsAddModalOpen(false);
  };

  // Edit sale handlers
  const handleEditClick = (sale) => {
    setCurrentSale(sale);
    setIsEditModalOpen(true);
  };

  const handleUpdateSale = (updatedSale) => {
    setSales((prev) =>
      prev.map((sale) =>
        sale.transaction === updatedSale.transaction ? updatedSale : sale
      )
    );
    setIsEditModalOpen(false);
  };

  // Delete sale handlers
  const handleDeleteClick = (sale) => {
    setCurrentSale(sale);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (currentSale) {
      setSales((prev) =>
        prev.filter((sale) => sale.transaction !== currentSale.transaction)
      );
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  if (sales === null) {
    return <span>No sales Recorder yet!</span>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Sales Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage all sales transactions
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button
            variant="primary"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            New Sale
          </Button>
        </div>

        {/* Sales Table */}
        <SalesTable
          sales={sales}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Add Sale Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Sale"
        size="lg"
      >
        <SaleForm
          onSubmit={handleAddSale}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Sale Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Sale"
        size="lg"
      >
        {currentSale && (
          <SaleForm
            sale={currentSale}
            onSubmit={handleUpdateSale}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
        size="sm"
      >
        {currentSale && (
          <DeleteConfirmation
            sale={currentSale}
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

export default Sales;
