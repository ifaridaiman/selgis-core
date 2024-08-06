import React from "react";
import { CiShare1 } from "react-icons/ci";
import { IoCloseOutline, IoShareSocialOutline } from "react-icons/io5";

type ModalProps = {
    closeModal: () => void;
    title?: string;
    };

const Modal:React.FC<ModalProps> = ({closeModal, title}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div
        className="fixed inset-0 bg-black opacity-75"
        onClick={closeModal}
      ></div>
      <div className="bg-white px-6 pt-6 pb-12 rounded-lg z-10 min-w-[500px]">
        <div className="flex justify-between items-center gap-8">
            <h2 className="text-xl font-bold">{title}</h2>
            <button className="text-2xl hover:bg-gray-200 p-1 hover:rounded-full transition-all duration-150 ease-in-out" onClick={closeModal}>
                <IoCloseOutline/>
            </button>
        </div>
        <div className="mt-4">
            <div className="">
                <p className="text-base font-bold">Lampiran Projek</p>
            </div>
            <div className="mt-4 flex gap-2 flex-col">
                <div className="flex items-center gap-4 border rounded-md p-2 border-gray-300 justify-between hover:bg-gray-100">
                    <p>Peta.pdf</p>
                    <CiShare1 className=" text-xl"/>
                </div>
                <div className="flex items-center gap-4 border rounded-md p-2 border-gray-300 justify-between hover:bg-gray-100">
                    <p>Peta.pdf</p>
                    <CiShare1 className=" text-xl"/>
                </div>
                <div className="flex items-center gap-4 border rounded-md p-2 border-gray-300 justify-between hover:bg-gray-100">
                    <p>Peta.pdf</p>
                    <CiShare1 className=" text-xl"/>
                </div>
            </div>
        </div>
        
      </div>
    </div>
  );
};

export default Modal;
