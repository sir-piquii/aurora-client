import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Modal component that displays a centered dialog overlay.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.isOpen - Controls whether the modal is visible.
 * @param {Function} props.onClose - Callback function to close the modal.
 * @param {string} props.title - Title text displayed at the top of the modal.
 * @param {React.ReactNode} props.children - Content to be rendered inside the modal body.
 * @param {'sm'|'md'|'lg'|'xl'} [props.size='md'] - Size of the modal (small, medium, large, extra-large).
 *
 * @example
 * <Modal
 *   isOpen={isModalOpen}
 *   onClose={() => setModalOpen(false)}
 *   title="My Modal"
 *   size="lg"
 * >
 *   <p>Modal content goes here.</p>
 * </Modal>
 *
 * @returns {JSX.Element|null} The modal dialog if open, otherwise null.
 */
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
  const modalRef = useRef(null);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    // Handle ESC key to close
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEsc);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden animate-scale-in`}
      >
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-4 max-h-[calc(90vh-120px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
