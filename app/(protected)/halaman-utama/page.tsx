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
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

import { useTable } from "@/hooks/dashboard/useTable";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useNewProjek } from "@/hooks/dashboard/useNewProjek";
import TabContainer from "@/components/tab/TabContainer";
import Tab from "@/components/tab/Tab";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { useNav } from "@/hooks/useNav";

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { lotNumber, setLotNumber, listOfLot, listOfMukim, listOfDaerah } =
    useMapContext();
  const [filteredLotList, setFilteredLotList] = useState<any[]>([]);
  const [showDaftarProject, setShowDaftarProject] = useState<boolean>(false);

  const { handleSampleDocument } = useNav();

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
      const filtered = listOfLot.filter((item) => {
        return (
          item.No_Lot &&
          item.No_Lot.toLowerCase().includes(lotNumber.toLowerCase())
        );
      });
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

  const handleFormCarianSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (lotNumber) {
      const filtered = listOfLot.filter((item) => {
        return (
          item.No_Lot &&
          item.No_Lot.toLowerCase().includes(lotNumber.toLowerCase())
        );
      });
    }
  };

  const handleZoomtoLayer = (lotNumber: string) => {
    console.log("Zoom to layer", lotNumber);
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
        <h2 className="text-black font-bold text-2xl">Halaman Utama</h2>
        <Link
          href={`/cipta-ulasan`}
          className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-75 py-2 px-3 rounded-md text-white"
        >
          <BiLayerPlus className="text-base" /> Cipta Ulasan
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          <MapContainer mapData={mapData}>
            <div></div>
          </MapContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Carian</h2>
          <form onSubmit={handleFormCarianSubmit}>
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
              <input
                type="submit"
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-blue-600 text-blue-50 font-bold hover:bg-blue-700 transition-all duration-100 ease-linear"
                value={"Carian"}
              />
            </div>
          </form>
        </div>
      </div>
      <TabContainer>
        <Tab label="Jadual Carian">
          <Table>
            <thead>
              <tr>
                <th className="rounded-tl-xl bg-gray-300">
                  <input type="checkbox" onChange={handleSelectAllChange} />
                </th>
                <th className="py-4 px-4 bg-gray-300 text-left">No Lot</th>
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
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(index)}
                        />
                      </td>
                      <td className="py-4 px-4">{item.No_Lot}</td>
                      <td className="py-4 px-4 text-center">
                        {item.Nama_Daerah}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.Nama_Mukim}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center text-xl justify-center">
                          {/* <button
                            className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                            title="Delete Item"
                          >
                            <IoTrashBinOutline />
                          </button> */}
                          <button
                            className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                            title="Zoom to Lot"
                            onClick={() => handleZoomtoLayer(item.No_Lot)}
                          >
                            <FaMagnifyingGlassLocation />
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
        </Tab>
        <Tab label="Jadual Ulasan">
          <Table>
            <thead>
              <tr>
                <th className="rounded-tl-xl bg-gray-300">
                  <input type="checkbox" onChange={handleSelectAllChange} />
                </th>
                <th className="py-4 px-4 bg-gray-300 text-left">Nama Projek</th>
                <th className="py-4 px-4 bg-gray-300">Jenis Permohonan</th>
                <th className="py-4 px-4 bg-gray-300">Daerah</th>
                <th className="py-4 px-4 bg-gray-300">Mukim</th>
                <th className="py-4 px-4 bg-gray-300">Status</th>
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
                      <td className="text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleRowSelect(index)}
                        />
                      </td>
                      <td className="py-4 px-4">{"nama projek"}</td>
                      <td className="py-4 px-4 text-center">
                        {"jenis permohonan"}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.Nama_Daerah}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.Nama_Mukim}
                      </td>

                      <td className="py-4 px-4 text-center">{"status"}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center text-xl justify-center">
                          <button
                            className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                            title="Open Report"
                            onClick={() => handleSampleDocument()}
                          >
                            <MdOutlineDocumentScanner />
                          </button>
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
        </Tab>
      </TabContainer>
    </>
  );
};

export default DashboardPage;
