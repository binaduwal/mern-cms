import React from 'react';
import Modal from 'react-modal';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Confirm Action"
      className="absolute inset-0 flex justify-center items-center outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm border border-gray-100 relative">
        <div className="flex flex-col items-center">
          <p className="text-gray-600 text-center mb-6">
            {message || 'Are you sure you want to proceed?'}
          </p>
          <div className="flex gap-4 w-full justify-center">
            <button
              onClick={onConfirm}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium transition-all"
            >
              Yes, Confirm
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2 rounded-lg font-medium transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
