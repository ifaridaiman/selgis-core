"use client";
import Modal from "@/components/modal";
import React, { useState, useEffect } from "react";
import { RiFunctionAddLine } from "react-icons/ri";
import Link from "next/link";
import { UrusanTeknikalMock } from "@/mock/urusanTeknikal.mock";
import { Table } from "@/components/table/Table";
import { TableHeader } from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import { TablePaginate } from "@/components/table/TablePaginate";
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

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DashboardPage = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { lotNumber, setLotNumber, listOfLot, listOfMukim, listOfDaerah } = useMapContext();
  const [filteredLotList, setFilteredLotList] = useState<any[]>([]);

  const {handleRowSelect, handleSelectAll, selectedRows, handlePaginatedData } = useTable();
  const {handleChangeDaerah} = useDashboard();

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
        <h2 className="text-black font-bold text-2xl">Dashboard</h2>
        <Link
          className="flex justify-center items-center gap-2 bg-blue-500 py-2 px-3 rounded-md text-white"
          href={"/register"}
        >
          <BiLayerPlus className="text-base" /> Daftar Projek
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          {/* Map Section */}
          <MapContainer mapData={mapData}>
            <div></div>
          </MapContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Carian</h2>

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
            <select className="border border-gray-300 rounded-md px-4 py-2 w-full"
            onChange={handleChangeDaerah}>
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
            <input
              type="submit"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-blue-600 text-blue-50 font-bold hover:bg-blue-700 transition-all duration-100 ease-linear"
              value={"Carian"}
            />
          </div>
        </div>
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

        <Table>
          <thead>
            <tr>
              <th className="rounded-tl-xl bg-gray-300">
                <input type="checkbox" onChange={handleSelectAllChange} />	
              </th>
              <th className="py-4 px-4 bg-gray-300 text-left">
                No Lot
              </th>
              <th className="py-4 px-4 bg-gray-300">Mukim</th>
              <th className="py-4 px-4 bg-gray-300">Daerah</th>
              <th className="py-4 px-4 bg-gray-300 rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData ? (
              paginatedData.data.map((item: any, index: number) => {
                const isChecked = selectedRows.includes(index);
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-300 odd:bg-white even:bg-gray-100"
                  >
                    <td className="text-center" ><input type="checkbox" checked={isChecked} onChange={() => handleRowSelect(index)} /></td>
                    <td className="py-4 px-4">{item.No_Lot}</td>
                    <td className="py-4 px-4 text-center">
                      {item.Nama_Daerah}
                    </td>
                    <td className="py-4 px-4 text-center">{item.Nama_Mukim}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center text-xl justify-center">
                        <button
                          className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                          title="Delete Item"
                        >
                          <IoTrashBinOutline />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                          title="Update Item"
                        >
                          <IoPencilOutline />
                        </button>
                        {/* <button
                        className='p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full'
                        onClick={() => openModalAttachment(item.namaPemaju)}
                        title='Project File Attachment'
                      >
                        <IoDocumentAttachOutline />
                      </button> */}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <TablePaginate
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
      {/* {isModalOpen && <Modal title={isModalTitle} closeModal={closeModal} />} */}
    </>
  );
};

export default DashboardPage;
