import React from "react";
import { useModal } from "../../context/ModalContext";

const ConfirmModal = () => {
  const { modal, closeModal } = useModal();

  // Only render if the modal is open and is of type "confirm"
  if (!modal.isOpen || modal.type !== "confirm") return null;

  // Destructure necessary properties from the modal
  const { message, title = "Confirm Action", onConfirm } = modal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm w-full">
        <div className="p-6 text-center">
          <svg
            className="mb-4 w-12 h-12 text-red-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-500 mt-2">{message}</p>
        </div>
        <div className="flex border-t border-gray-200">
          <button
            className="w-1/2 py-3 text-sm font-semibold bg-gray-100 text-gray-800 hover:bg-gray-200"
            onClick={closeModal} // Close modal on cancel
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-3 text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700"
            onClick={() => {
              if (onConfirm) onConfirm(); // Trigger confirm action
              closeModal(); // Close modal after confirming
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
