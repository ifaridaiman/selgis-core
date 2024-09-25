"use client";
import Image from "next/image";
import React, { useState } from "react";
import { LuFileEdit } from "react-icons/lu";
// import useUlasanStorage from "./hooks/useUlasanStorage";

const UlasanContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [folderName, setFolderName] = useState("");

  // const { ulasanItems, addUlasan } = useUlasanStorage("ulasanKey");

  const handleAddUlasan = () => {
    if (inputValue.trim() && folderName.trim()) {
      // addUlasan(inputValue, folderName);
      setInputValue(""); // Clear the input field after adding
      setFolderName(""); // Clear the folder input field after adding
    }
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-full">
        {/* {ulasanItems.length === 0 ? ( */}
          <div className="flex flex-col justify-center items-center py-16">
            <Image
              src="assets/icons/noData.svg"
              width={50}
              height={50}
              alt="No Data"
            />
            <p>Tiada Data Ulasan</p>
          </div>
        {/* ) : (
          <div className="p-4">
            <ul>
              {ulasanItems.map((item, index) => (
                <li key={index} className="py-2">
                  <strong>Ulasan:</strong> {item.ulasan} <br />
                  <strong>Folder:</strong> {item.folder}
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
      <hr />
      <div className="py-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col w-3/4">
            <input
              type="text"
              placeholder="Tulis Ulasan"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded-t-md px-4 py-2 w-full bg-gray-100 focus:bg-gray-50 placeholder-gray-600"
            />
            <input
              type="file"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="border border-gray-300 rounded-b-md px-4 py-2 w-full"
            />
          </div>
          <div className="">
            <button
              onClick={handleAddUlasan}
              className="bg-blue-600 py-2 px-3 flex gap-2 rounded-md text-blue-100 justify-center items-center"
            >
              <span>
                <LuFileEdit />
              </span>
              {"Tambah Ulasan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UlasanContainer;
