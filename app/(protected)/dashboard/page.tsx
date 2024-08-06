"use client";
import Modal from "@/components/modal";
import React, { useState, useEffect } from "react";
import { RiFunctionAddLine } from "react-icons/ri";
import Link from "next/link";
import { UrusanTeknikalMock } from "@/mock/urusanTeknikal.mock";
import { getPaginatedData } from "@/hooks/usePaginateData";
import { Table } from "@/components/table/Table";
import { TableHeader } from "@/components/table/TableHeader";
import TableRow from "@/components/table/TableRow";
import { TablePaginate } from "@/components/table/TablePaginate";
import { BiLayerPlus } from "react-icons/bi";
import dynamic from "next/dynamic";

const MapContainer = dynamic(() => import('@/components/map/MapContainer'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DashboardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalTitle, setIsModalTitle] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState(UrusanTeknikalMock.data);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const openModalAttachment = (namaPemaju: string) => {
    setIsModalOpen(true);
    setIsModalTitle(namaPemaju);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const filtered = UrusanTeknikalMock.data.filter((item: any) =>
      item.namaPemaju.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page on new search
  }, [searchInput]);

  const paginatedData = getPaginatedData(filteredData, currentPage);

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

  


  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Dashboard</h2>
        <Link className="flex justify-center items-center gap-2 bg-blue-500 py-2 px-3 rounded-md text-white" href={'/register'} ><BiLayerPlus className="text-base" /> Daftar Projek</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          {/* Map Section */}
          <MapContainer>
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
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Daerah</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mukim</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
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
          <Link
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
          />
        </div>

        <Table>
          <TableHeader />
          <tbody>
            {paginatedData.data.map((item: any, index: number) => (
              <TableRow
                key={index}
                item={item}
                openModalAttachment={openModalAttachment}
              />
            ))}
          </tbody>
        </Table>
        <TablePaginate
          currentPage={paginatedData.currentPage}
          totalPages={paginatedData.totalPages}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
        />
      </div>
      {isModalOpen && <Modal title={isModalTitle} closeModal={closeModal} />}
    </>
  );
};

export default DashboardPage;
