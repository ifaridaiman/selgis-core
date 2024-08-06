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
import Map from "@/components/map";
import UlasanContainer from "@/components/ulasan/UlasanContainer";

const UlasanPage = () => {
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
      <div className=" mb-6">
        <h2 className="text-black font-bold text-2xl">{'Ulasan Projek'}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500">
          {/* Map Section */}
          <Map/>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">{"Maklumat Projek"}</h2>
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
      <div className=" mb-6">
        <h2 className="text-black font-bold text-2xl">{'Ulasan'}</h2>
      </div>
      <div className="bg-white p-7 rounded-lg">
        <UlasanContainer/>
      </div>
      {isModalOpen && <Modal title={isModalTitle} closeModal={closeModal} />}
    </>
  );
};

export default UlasanPage;
