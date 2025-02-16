import React from "react";
import { useModal } from "../../context/ModalContext";


export default function WarningModal() {
  const { modal, closeModal } = useModal();

  if (!modal.isOpen || modal.type !== "warning") return null;

  return (
    <div
    className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 "
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
        <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
          <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
        </span>

        {/* Title */}
        <h3
          id="success-modal-title"
          className="mb-2 text-xl font-bold text-gray-800 dark:text-neutral-200"
        >
           Warning !
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
