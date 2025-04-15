import React, { useContext } from "react";
import { inquiryItems } from "../utils/Elements";
import CustomButton from "../reusables/CustomButton";
import { MdDelete } from "react-icons/md";
import { AdminContext } from "../layout/AdminLayout";
import CustomModal from "../reusables/CustomModal";
import { useDispatch, useSelector } from "react-redux";
import { inquiryDesc } from "../app/slices/InquirySlice";
import { CiViewList } from "react-icons/ci";

const InquiryDetails = () => {
  const { openModal, closeModal, modalIsOpen } = useContext(AdminContext);
  const dispatch = useDispatch();

  const handleMessage = (item) => {
    dispatch(inquiryDesc(item));
    openModal();
  };
  const { message } = useSelector((state) => state.inquiryslice);
  console.log("message:", message);

  return (
    <div className=" min-w-[900px]">
      <table className=" w-full lg:overflow-x-hidden overflow-x-scroll">
        <thead className=" bg-indigo-400 text-white ">
          <tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Subject</Th>
            <Th width="18%">Message</Th>
            <Th>Date</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {inquiryItems?.map((item, idx) => {
            return (
              <tr
                key={idx}
                className={`${
                  idx !== inquiryItems.length - 1
                    ? " border-gray-200 border-b "
                    : ""
                }  font-[400] py-1 `}
              >
                <Td>{item.name}</Td>
                <Td>{item.email}</Td>
                <Td>{item.subject}</Td>
                <Td>
                  <CustomButton 
                    onClick={() => handleMessage(item.content)}
                    icon={<CiViewList />}
                  >
                    View Message
                  </CustomButton>
                </Td>

                <Td>{item.date}</Td>
                <Td>
                  <CustomButton icon={<MdDelete />} color="bg-[#de163a]">
                    Delete
                  </CustomButton>
                </Td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <CustomModal closeModal={closeModal} modalIsOpen={modalIsOpen} width="w-[60%]">
        <div className=" bg-white p-6 rounded-md">
          <h2 className=" pb-3 font-jamjure">Message</h2>
          <p className=" font-[500]">{message}</p>
        </div>
      </CustomModal>
    </div>
  );
};

export default InquiryDetails;

const Th = ({ children, width }) => {
  return (
    <th className={` py-3 px-2 text-left font-medium `} style={{ width }}>
      {children}
    </th>
  );
};

const Td = ({ children }) => {
  return <td className=" py-3 px-2 font-[400] text-[14px] ">{children}</td>;
};
