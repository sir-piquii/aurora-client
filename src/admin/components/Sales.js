/**
 * Sales management component for viewing, adding, editing, and deleting sales transactions.
 *
 * Fetches sales data from the API and displays it in a table.
 * Provides modals for adding, editing, and confirming deletion of sales.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered Sales management UI.
 *
 * @example
 * // Usage in a route or parent component
 * <Sales />
 *
 * @dependencies
 * - getSales: Function to fetch sales data from the API.
 * - addSale: Function to add a new sale via the API.
 * - Spinner: Loading spinner component.
 * - SalesTable: Table component for displaying sales.
 * - SaleForm: Form component for adding/editing a sale.
 * - DeleteConfirmation: Confirmation dialog for deleting a sale.
 * - Button: UI button component.
 * - Modal: Modal dialog component.
 * - toast: Notification utility from 'sonner'.
 *
 * @state
 * - sales: Array of sales data or null.
 * - isAddModalOpen: Boolean for add sale modal visibility.
 * - isEditModalOpen: Boolean for edit sale modal visibility.
 * - isDeleteModalOpen: Boolean for delete confirmation modal visibility.
 * - currentSale: The sale object currently being edited or deleted.
 * - loading: Boolean for loading state.
 *
 * @functions
 * - fetchSales: Fetches sales data from the API.
 * - handleAddSale: Handles adding a new sale.
 * - handleEditClick: Opens the edit modal for a selected sale.
 * - handleUpdateSale: Updates a sale in the state.
 * - handleDeleteClick: Opens the delete confirmation modal for a selected sale.
 * - handleConfirmDelete: Removes a sale from the state.
 */
import { getSales, addSale } from "../../api";
import Spinner from "../../components/Spinner";
import { useState, useEffect, useCallback } from "react";
import { Plus } from "lucide-react";
import SalesTable from "../components/sales/SalesTable";
import SaleForm from "../components/sales/SaleForm";
import DeleteConfirmation from "../components/sales/DeleteConfirmation";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { toast } from "sonner";

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
  const handleAddSale = async (newSale) => {
    try {
      setLoading(true);
      await addSale(newSale);
      toast.success("Sale Added!");
    } catch (error) {
      console.error(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
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

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-4 sm:p-6">
      <div className="w-full mx-auto">
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
        {sales ? (
          <SalesTable
            sales={sales}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        ) : (
          <span>No sales Recorder yet!</span>
        )}
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
