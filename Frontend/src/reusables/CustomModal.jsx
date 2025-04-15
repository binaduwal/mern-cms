import React from "react";
import Modal from "react-modal";

const CustomModal = ({ children, modalIsOpen, closeModal,width }) => {
  // const customStyles = {
  //   content: {
  //     top: "50%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     zIndex: "99",
  //     padding: "1.5rem",
  //     borderRadius: "5px",
  //     backgroundColor: "rgb(250 250 250)",
  //   },
  // };
  return (
    <Modal
      className={` ${width} mx-auto z-[50] `}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-[40] content-center"
      ariaHideApp={false}
    >  
      {children}
    </Modal>
  );
};

export default CustomModal;
