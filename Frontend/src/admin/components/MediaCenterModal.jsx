import React from 'react';
import Modal from 'react-modal';
import { IoMdCloseCircleOutline } from "react-icons/io";
import MediaCenter from "../pages/MediaCenter";

const MediaCenterModal = ({ isOpen, onClose, onMediaSelect }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      className="bg-white rounded-xl shadow-2xl w-[90%] h-[90vh] max-w-6xl outline-none p-0"
      appElement={document.getElementById('root')}
    >
      <div className="flex justify-end p-2">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 bg-transparent"
        >
          <IoMdCloseCircleOutline size={23} />
        </button>
      </div>
      <MediaCenter onClose={onClose} onAdd={onMediaSelect} />
    </Modal>
  );
};

export default MediaCenterModal;