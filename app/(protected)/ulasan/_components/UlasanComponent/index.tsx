import React, { useState } from "react";
import { LuFileEdit } from "react-icons/lu";
import Image from "next/image";

interface Ulasan {
  ulasan: string;
  folderPath: string;
}

const UlasanComponent: React.FC = () => {
  const [ulasan, setUlasan] = useState<Ulasan[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [folderName, setFolderName] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleAddUlasan = async () => {
    if (!inputValue.trim()) {
      alert("Ulasan content cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        "/ulasan-teknikal/api/update-ulasan/ulasan-tambah",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "1", // Replace with dynamic project ID
            ulasan: inputValue,
            folderPath: folderName || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error adding ulasan:", errorData.message);
        alert("Failed to add ulasan.");
        return;
      }

      const newUlasan = await response.json();
      setUlasan((prev) => [...prev, newUlasan]);
      setInputValue("");
      setFolderName("");
      alert("Ulasan added successfully.");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while adding ulasan.");
    }
  };

  return (
    <div className="bg-white p-7 rounded-lg">
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-full">
          {ulasan.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-16">
              <Image
                src="assets/icons/noData.svg"
                width={50}
                height={50}
                alt="No Data"
              />
              <p>Tiada Data Ulasan</p>
            </div>
          ) : (
            <div className="p-4">
              <ul>
                {ulasan.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-gray-300 p-1 rounded mb-2"
                  >
                    <p>{item.ulasan}</p>
                    <p className="text-gray-500 text-sm">{item.folderPath}</p>
                  </div>
                ))}
              </ul>
            </div>
          )}
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
    </div>
  );
};

export default UlasanComponent;
