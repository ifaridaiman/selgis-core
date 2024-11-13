import React, { useEffect, useState } from "react";
import { useJadualUlasan } from "./hooks/useJadualUlasan";
import {
  IoPencilOutline,
  IoTrashBin,
  IoTrashBinOutline,
} from "react-icons/io5";
import { AiOutlineFilePdf } from "react-icons/ai";

const JadualUlasanTable = () => {
  const [jadualUlasanData, setJadualUlasanData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const fetchJadualUlasan = async () => {
    try {
      const res = await fetch("/ulasan-teknikal/api/ulasan", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch jadual ulasan");
      }

      const data = await res.json();
      console.log("DATA JADUAL", data);
      setJadualUlasanData(data.ulasans); // Set the fetched data into state
      setFilteredData(data.ulasans);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching jadual ulasan:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJadualUlasan();
  }, []);

  useEffect(() => {
    const filtered = jadualUlasanData.filter((projek) =>
      projek.tajukProjek.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page on new search
  }, [searchTerm, jadualUlasanData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  async function handleDelete(id:any) {
    try {
      const response = await fetch('/ulasan-teknikal/api/ulasan', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Projek deleted successfully!");
        // Optionally, refresh data or update the UI here
      } else {
        console.error("Failed to delete Projek");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search Nama Projek"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="w-full">
        <thead>
          <tr>
            <th className="rounded-tl-xl bg-gray-300">
              <input type="checkbox" />
            </th>
            <th className="py-4 px-4 bg-gray-300 text-left">Nama Projek</th>
            <th className="py-4 px-4 bg-gray-300">Jenis Permohonan</th>
            <th className="py-4 px-4 bg-gray-300">Daerah</th>
            <th className="py-4 px-4 bg-gray-300">Mukim</th>
            <th className="py-4 px-4 bg-gray-300">Bahagian</th>
            <th className="py-4 px-4 bg-gray-300">Status</th>
            <th className="py-4 px-4 bg-gray-300 rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((projek) => (
            <tr key={projek.id}>
              <td className="py-4 px-4 text-center">
                <input type="checkbox" />
              </td>
              <td className="py-4 px-4">{projek.tajukProjek}</td>
              <td className="py-4 px-4 text-center">
                {projek.jenisPermohonan}
              </td>
              <td className="py-4 px-4 text-center">{projek.daerah}</td>
              <td className="py-4 px-4 text-center">{projek.mukim}</td>
              <td className="py-4 px-4 text-center">{projek.bahagian}</td>
              <td className="py-4 px-4 text-center">{projek.status}</td>
              <td className="py-4 px-4 text-center">
                <div className="flex flex-row gap-4 items-center">
                  <button >
                    <AiOutlineFilePdf />
                  </button>
                  <a
                    href={`/ulasan-teknikal/ulasan/${projek.id}`}
                    className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                    title="Kemaskini Ulasan"
                  >
                    <IoPencilOutline />
                  </a>
                  <button onClick={() => handleDelete(projek.id)}>
                    <IoTrashBinOutline />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default JadualUlasanTable;
