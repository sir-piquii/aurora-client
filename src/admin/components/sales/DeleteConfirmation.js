/**
 * DeleteConfirmation component displays a confirmation dialog for deleting a sale.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.sale - The sale object containing details to display.
 * @param {string} props.sale.customer_name - Name of the customer associated with the sale.
 * @param {string|number} props.sale.transaction - Transaction ID of the sale.
 * @param {string|number} props.sale.total_amount - Total amount of the sale.
 * @param {Function} props.onConfirm - Callback function invoked when the user confirms deletion.
 * @param {Function} props.onCancel - Callback function invoked when the user cancels the action.
 * @returns {JSX.Element} The rendered confirmation dialog.
 */
import { AlertTriangle } from "lucide-react";
import Button from "../../UI/Button";

const DeleteConfirmation = ({ sale, onConfirm, onCancel }) => {
  return (
    <div className="text-center">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
      </div>
      <div className="mt-3">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Delete Sale
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this sale? This action cannot be
            undone.
          </p>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Customer: {sale.customer_name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Transaction ID: {sale.transaction}
            </p>
            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
              Amount: ${parseFloat(sale.total_amount).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete Sale
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
