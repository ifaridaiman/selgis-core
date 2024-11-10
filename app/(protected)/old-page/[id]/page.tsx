"use client";
import Modal from "@/components/modal";
import React, { useState, useEffect } from "react";
import { RiFunctionAddLine } from "react-icons/ri";

import { BiLayerPlus } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import {
  IoTrashBinOutline,
  IoPencilOutline,
  IoDocumentAttachOutline,
} from "react-icons/io5";
import { useTable } from "@/hooks/dashboard/useTable";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useNewProjek } from "@/hooks/dashboard/useNewProjek";
import { IoIosCloseCircleOutline } from "react-icons/io";
import UlasanContainer from "@/components/ulasan/UlasanContainer";

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const UlasanTeknikalPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { lotNumber, setLotNumber, listOfLot, listOfMukim, listOfDaerah } =
    useMapContext();
  const [filteredLotList, setFilteredLotList] = useState<any[]>([]);
  const [showDaftarProject, setShowDaftarProject] = useState<boolean>(false);

  const { nextStep, prevStep, currentStep } = useNewProjek();
  const {
    handleRowSelect,
    handleSelectAll,
    selectedRows,
    handlePaginatedData,
  } = useTable();
  const { handleChangeDaerah } = useDashboard();

  let mapData = [];
  try {
    mapData = JSON.parse(process.env.mapData || "[]");
  } catch (error) {
    console.error("Failed to parse mapData:", error);
  }

  useEffect(() => {
    if (lotNumber) {
      const filtered = listOfLot.filter((item) =>
        item.No_Lot.toLowerCase().includes(lotNumber.toLowerCase())
      );
      setFilteredLotList(filtered);
    } else {
      setFilteredLotList(listOfLot);
    }
    setCurrentPage(1); // Reset to the first page on new search
  }, [lotNumber, listOfLot]);

  const paginatedData = handlePaginatedData(filteredLotList, currentPage);

  const handleNextPage = () => {
    if (currentPage < paginatedData.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSelectAll(paginatedData.data, e.target.checked);
  };

  // var findValue = (arrValue,field,fieldReturn,value)=>{
  //   let dataReturn = [];
  //   arrValue.forEach(element => {
  //     if(element[field] == value){
  //       dataReturn = element[fieldReturn];
  //     }
  //   });
  //   return dataReturn;
  // };

  // var geoms = findValue(arrValueDaerah,"value","geoms",value);

  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan Teknikal</h2>
        <button
          className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-75 py-2 px-3 rounded-md text-white"
          onClick={() => setShowDaftarProject(!showDaftarProject)}
        >
          <BiLayerPlus className="text-base" /> Daftar Projek
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          {/* Map Section */}
          <MapContainer mapData={mapData}>
            <div></div>
          </MapContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Ulasan Projek: {}</h2>
          <div className="mb-4">
            <label className="block mb-2">Jenis Permohonan</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">No. Lot</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Daerah</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              onChange={handleChangeDaerah}
            >
              <option value="">-- Pilih Daerah --</option>
              {listOfDaerah.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mukim</label>
            <select className="border border-gray-300 rounded-md px-4 py-2 w-full">
              <option value="">-- Pilih Mukim --</option>
              {listOfMukim.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Lampiran</label>
            <div className="rounded border border-gray-300 p-2 max-h-24 h-24 overflow-auto">
                <div className="flex justify-between items-center border border-gray-300 p-1 rounded mb-2">
                    <p>{`test semarak`}</p>
                </div>
                <div className="flex justify-between items-center border border-gray-300 p-1 rounded mb-2">
                    <p>{`test semarak`}</p>
                </div>
                <div className="flex justify-between items-center border border-gray-300 p-1 rounded mb-2">
                    <p>{`test semarak`}</p>
                </div>
            </div>
          </div>
          
        </div>
      </div>

      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan</h2>
        
      </div>
      <div className="bg-white p-7 rounded-lg">
        <div className="flex justify-between mb-4">
          {/* <Link
            href="/pengguna/projek"
            className="bg-blue-500 text-white py-2 px-4 rounded-md flex gap-4 items-center justify-center"
          >
            <span>
              <RiFunctionAddLine />
            </span>
            Daftar Projek
          </Link>
          <input
            type="text"
            placeholder="Carian"
            className="border border-gray-300 rounded-md px-4 py-2 w-1/4"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          /> */}
        </div>
        <UlasanContainer/>

        
      </div>
      {showDaftarProject && (
        <div
          className={`w-[350px] bg-blue-600 fixed top-0 right-0 min-h-screen p-4`}
        >
          <div className="flex justify-between items-center mb-6">
            <p className="text-white text-xl font-bold ">Daftar Projek</p>
            <button
              onClick={() => setShowDaftarProject(!showDaftarProject)}
              className="text-white hover:text-gray-400 duration-100 transition-all"
              title="Close Panel"
            >
              <IoIosCloseCircleOutline />
            </button>
          </div>

          <div>
            {currentStep == 1 && (
              <div id="step-1">
                <div className="mb-4">
                  <label className="block mb-2 text-white">No. Lot</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Mukim</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Daerah</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Koordinat X</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Koordinat Y</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep == 2 && (
              <div id="step-2">
                <div className="mb-4">
                  <label className="block mb-2 text-white">Tajuk Projek</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">
                    Jenis Permohonan
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">No. Fail</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Status</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Bahagian</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            {currentStep == 3 && (
              <div id="step-3">
                <div className="mb-4">
                  <label className="block mb-2 text-white">Catatan</label>
                  <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full" />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-white">Attachment</label>
                  <input
                    type="file"
                    className="border border-gray-300 rounded-md px-4 py-2 w-full bg-white "
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={prevStep}
                className={`bg-gray-400 text-white py-2 px-4 rounded-md ${
                  currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentStep === 1}
              >
                {`Kembali`}
              </button>
              {currentStep === 3 ? (
                <button
                  onClick={nextStep}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-md`}
                >
                  {"Daftar"}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  className={`bg-blue-500 text-white py-2 px-4 rounded-md ${
                    currentStep === 3 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={currentStep === 3}
                >
                  {"Seterusnya"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UlasanTeknikalPage;
