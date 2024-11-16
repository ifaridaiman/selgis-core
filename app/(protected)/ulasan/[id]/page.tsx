"use client";
import React, { useState, useEffect } from "react";
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";
import { BiLayerPlus } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import { useParams } from "next/navigation";

import { useTable } from "@/hooks/dashboard/useTable";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useNewProjek } from "@/hooks/dashboard/useNewProjek";
import Image from "next/image";
import { LuFileEdit } from "react-icons/lu";
import { toast } from "react-toastify";
import UlasanComponent from "../_components/UlasanComponent";

const MapComponentUlasan = dynamic(
  () => import("@/components/map-ulasan/MapComponentUlasan"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

type UlasanItem = {
  id: number;
  ulasanID: string;
  projekId: number;
  ulasan: string;
  folderPath: string;
};

const UlasanTeknikalPage = () => {
  const [lotNumber, setLotNumber] = useState("");
  const [tajukProjek, setTajukProjek] = useState("");
  const [tajukSurat, setTajukSurat] = useState("");
  const [panjang, setPanjang] = useState("");
  const [luas, setLuas] = useState("");
  const [daerah, setDaerah] = useState("");
  const [mukim, setMukim] = useState("");
  const [kordinatX, setKordinatX] = useState("");
  const [kordinatY, setKordinatY] = useState("");
  const [rings, setRings] = useState("");
  const [jenisPermohonan, setJenisPermohonan] = useState("");
  const [noFail, setNoFail] = useState("");
  const [status, setStatus] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<
    { label: string; value: string }[]
  >([]);
  const [ulasan, setUlasan] = useState<UlasanItem[]>([]); // Updated to handle array of ulasan
  const [bahagian, setBahagian] = useState("");

  const { id } = useParams();
  const projectId = parseInt(Array.isArray(id) ? id[0] : id ?? "", 10);

  const fetchData = async () => {
    if (!id) {
      console.error("No 'no_lot' query parameter found.");
      return;
    }

    const response = await fetch(`/ulasan-teknikal/api/ulasan-teknikal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }), // Pass no_lot in the body
    });

    if (response.ok) {
      const result = await response.json();
      // const data = result.projek; // Assuming there's one item returned

      if (result.projek) {
        console.log("Projek:", result.projek);
        console.log("Ulasan:", result.ulasan);

        // Set your form fields or state here, e.g.:
        setLotNumber(result.projek.lotNumber || "");
        setTajukProjek(result.projek.tajukProjek || "");
        setTajukSurat(result.projek.tajukSurat || "");
        setPanjang(result.projek.panjang || "");
        setLuas(result.projek.luas || "");
        setDaerah(result.projek.daerah || "");
        setMukim(result.projek.mukim || "");
        setKordinatX(result.projek.koordinat_x || "");
        setKordinatY(result.projek.koordinat_y || "");
        setJenisPermohonan(result.projek.jenisPermohonan || "");
        setNoFail(result.projek.noFail || "");
        setRings(result.projek.rings || "");

        setBahagian(result.projek.bahagian || "");

        const bahagianData = senaraiBahagian.find(
          (bahagian) => bahagian.value === result.projek.bahagian
        );
        setFilteredStatus(bahagianData ? bahagianData.senaraiStatus : []);
        setStatus(result.projek.status || "");

        // If Ulasan is an array, handle it as needed
        if (result.ulasan && result.ulasan.length > 0) {
          setUlasan(result.ulasan || []);
        } else {
          setUlasan([]);
        }
      } else {
        console.log("No projek found.");
      }

      console.log("Submitted successfully:", result);
    } else {
      console.error("Failed to submit form:", response.statusText);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [inputValue, setInputValue] = useState("");
  const [folderName, setFolderName] = useState("");

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
            id: projectId, // Replace with dynamic project ID
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

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = e.target.value;
    setStatus(selectedStatus);
    console.log("Check Handle Change")

    // Send a request to update the status via API
    try {
      const response = await fetch("/ulasan-teknikal/api/update-ulasan/status/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: projectId,
          status: selectedStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error updating status:", errorData.message);
        alert("Failed to update status.");
        return;
      }

      toast.success("Status updated successfully")

      const data = await response.json();
      console.log("Status updated successfully:", data);
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred while updating status.");
    }
  };

  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan Teknikal</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-auto">
          {/* Map Section */}
          <MapComponentUlasan
            kordinatX={kordinatX}
            kordinatY={kordinatY}
            ring={rings}
            lot={lotNumber}
          />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">
            Ulasan Projek: {tajukProjek}
          </h2>
          <div className="mb-4">
            <label className="block mb-2">Jenis Permohonan</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={jenisPermohonan}
              onChange={(e) => setJenisPermohonan(e.target.value)}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">No. Lot</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={lotNumber}
              onChange={(e) => setLotNumber(e.target.value)}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Daerah</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={daerah}
              onChange={(e) => setLotNumber(e.target.value)}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mukim</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={mukim}
              onChange={(e) => setMukim(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Bahagian</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 w-full bg-gray-100 cursor-not-allowed"
              value={bahagian}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Status</label>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              name="status"
              value={status}
              onChange={handleChange}
            >
              <option value="">-- Pilih Status --</option>
              {filteredStatus.map((statusOption, index) => (
                <option key={index} value={statusOption.value}>
                  {statusOption.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan</h2>
      </div>
      <div className="bg-white p-7 rounded-lg">
        <div className="flex justify-between mb-4">
          
        </div>
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
              <div className="py-4">
                <ul>
                  {ulasan.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border border-gray-300 p-1 rounded mb-2"
                    >
                      <p>{item.ulasan}</p>
                      <a className="text-gray-500 text-sm" href={item.folderPath} download>{item.folderPath}</a>
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
      {/* <UlasanComponent /> */}
    </>
  );
};

export default UlasanTeknikalPage;
