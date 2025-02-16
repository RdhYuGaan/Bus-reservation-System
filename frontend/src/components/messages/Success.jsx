import React from "react";
import { useModal } from "../../context/ModalContext";

export default function SuccessModal() {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen || modal.type !== "success") return null; // Render only if open and type is 'success'

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
      role="dialog"
      aria-labelledby="success-modal-title"
      aria-modal="true"
    >
      <div className="relative flex flex-col bg-white shadow-lg rounded-xl w-full max-w-lg m-3 sm:mx-auto">
        {/* Close Button */}
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={closeModal}
            className="p-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 text-center">
          {/* Icon */}
          <span className="mb-4 inline-flex justify-center items-center w-12 h-12 rounded-full border-4 border-green-50 bg-green-100 text-green-500">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
            </svg>
          </span>

          {/* Title */}
          <h3
            id="success-modal-title"
            className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
          >
             Successfully !
          </h3>

          {/* Message */}
          <p className="text-gray-500 dark:text-neutral-500">
           
            {modal.message}
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center gap-x-4">
            <button
              type="button"
              onClick={closeModal}
              className="py-2 px-3 text-sm font-medium rounded-lg px-4 py-2 text-sm font-semibold  text-white bg-gray-900 rounded-xl hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
