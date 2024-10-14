"use client";
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex justify-center items-center">Loading...</div>
  ),
});

const HomeWidget = dynamic(() => import("@/components/map/widget/HomeWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const LayerListWidget = dynamic(
  () => import("@/components/map/widget/LayerListWidget"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const MeasureWidget = dynamic(
  () => import("@/components/map/widget/MeasureWidget"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const FeatureLayerWidget = dynamic(
  () => import("@/components/map/widget/FeatureLayerWidget"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const BasemapWidget = dynamic(
  () => import("@/components/map/widget/BasemapWidget"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const DrawWidget = dynamic(() => import("@/components/map/widget/DrawWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const UlasanTeknikalPage = () => {

  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [filteredMukim, setFilteredMukim] = useState<{ kodMukim: string; namaMukim: string }[]>([]);
  const [selectedBahagian, setSelectedBahagian] = useState("");
  const [filteredJenisPermohonan, setFilteredJenisPermohonan] = useState<{ label: string; value: string }[]>([]);
  const [filteredStatus, setFilteredStatus] = useState<{ label: string; value: string }[]>([]);

  const { mapView, ciptaUlasanForm, setCiptaUlasanForm } = useMapContext();

  const handleChangeDaerah = (e: React.FormEvent<HTMLSelectElement>) => {
    const selected = (e.target as HTMLSelectElement).value;
    setSelectedDaerah(selected);
    setCiptaUlasanForm({ ...ciptaUlasanForm, daerah: selected });

    const daerahData = senaraiDaerahKodMukim.find((daerah) => daerah.daerah === selected);

    setFilteredMukim(daerahData ? daerahData.senaraiMukim : []);
    
  };

  const handleChangeBahagian = (e: React.FormEvent<HTMLSelectElement>) => {
    const selected = (e.target as HTMLSelectElement).value;
    setSelectedBahagian(selected);
    setCiptaUlasanForm({ ...ciptaUlasanForm, bahagian: selected });

    const bahagianData = senaraiBahagian.find((bahagian) => bahagian.value === selected);

    setFilteredJenisPermohonan(bahagianData ? bahagianData.senaraiJenisPermohonan : []);
    setFilteredStatus(bahagianData ? bahagianData.senaraiStatus : []);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setCiptaUlasanForm({
      ...ciptaUlasanForm, // Spread the current state to retain other field values
      [name]: value, // Update only the specific field by its name
    });
  };

  const handleFormCiptaUlasan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      lotNumber: ciptaUlasanForm.lotNumber,
      daerah: ciptaUlasanForm.daerah,
      mukim: ciptaUlasanForm.mukim,
      koordinat_x: ciptaUlasanForm.kordinatX,
      koordinat_y: ciptaUlasanForm.kordinatY,
      tajukProjek: ciptaUlasanForm.tajukProjek,
      jenisPermohonan: ciptaUlasanForm.jenisPermohonan,
      noFail: ciptaUlasanForm.noFail,
      status: ciptaUlasanForm.status,
      bahagian: ciptaUlasanForm.bahagian,
      ulasans: [
        {
          ulasan: ciptaUlasanForm.ulasan,
          folderPath: ciptaUlasanForm.folderPath,
        },
      ],
    };

    try {
      const response = await fetch("/api/ulasan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Projek and Ulasan created successfully:", result);
      } else {
        console.error("Failed to create projek and ulasan");
      }
    } catch (error) {
      console.error("Error submitting projek and ulasan:", error);
    }
  };

  

  let mapData = [];
  try {
    mapData = JSON.parse(process.env.mapData || "[]");
  } catch (error) {
    console.error("Failed to parse mapData:", error);
  }
  
  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan Teknikal</h2>
        {/* <button
          className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-75 py-2 px-3 rounded-md text-blue-100"
        >
          <BiLayerPlus className="text-base" /> Daftar Projek
        </button> */}
      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg mt-4">
        <div className="px-4 py-5 sm:p-6">
          <div>
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Cipta Ulasan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Ulasan teknikal untuk projek yang diusulkan.
                  </p>
                </div>
                <form onSubmit={handleFormCiptaUlasan}>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="tajukProjek"
                      >
                        {`Nama Project`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          type="text"
                          name="tajukProjek"
                          id="tajukProjek"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          htmlFor="location"
                        >
                          {`Location`} <span className="text-red-500">*</span>
                        </label>{" "}
                        <div className="mt-1 text-sm text-gray-500">
                          Sketch untuk mendapatkan kordinat
                        </div>
                      </div>
                      <div className="mt-1 sm:self-center flex items-center">
                        <div className="w-full md:h-[30rem] border border-gray-400">
                          <MapContainer mapData={mapData}>
                            {mapView && <HomeWidget mapView={mapView} />}
                            {mapView && <LayerListWidget mapView={mapView} />}
                            {mapView && <MeasureWidget mapView={mapView} />}
                            {mapView && (
                              <FeatureLayerWidget
                                mapView={mapView}
                                mapData={mapData}
                              />
                            )}
                            {mapView && <BasemapWidget mapView={mapView} />}
                            {mapView && <DrawWidget mapView={mapView} />}
                            {/* {mapView && <SearchCoordinate mapView={mapView} />} */}
                          </MapContainer>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="kordinatX"
                      >
                        {`Koordinat X`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="kordinatX"
                          value={ciptaUlasanForm.kordinatX}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-starts mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="kordinatY"
                      >
                        {`Koordinat Y`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          type="text"
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="kordinatY"
                          value={ciptaUlasanForm.kordinatY}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="lotNumber"
                      >
                        {`No Lot`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          type="text"
                          name="lotNumber"
                          value={ciptaUlasanForm.lotNumber || ""}
                          onChange={handleInputChange} // Update the form state on change
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="daerah"
                      >
                        {`Daerah`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <select
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          onChange={handleChangeDaerah}
                          value={selectedDaerah}
                          name="daerah"
                        >
                          <option value="">-- Pilih Daerah --</option>
                          {senaraiDaerahKodMukim.map(
                            (daerah: {
                              daerah: string;
                              kodDaerah: string;
                              senaraiMukim: {
                                kodMukim: string;
                                namaMukim: string;
                              }[];
                            }) => (
                              <option key={daerah.daerah} value={daerah.daerah}>
                                {daerah.daerah}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="mukim"
                      >
                        {`Mukim`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <select
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="mukim"
                          onChange={handleInputChange}
                          value={ciptaUlasanForm.mukim}
                        >
                          <option value="">-- Pilih Mukim --</option>
                          {filteredMukim.map((mukim, index) => (
                            <option key={index} value={mukim.namaMukim}>
                              {mukim.namaMukim}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="bahagian"
                      >
                        {`Bahagian`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <select
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          onChange={handleChangeBahagian}
                          value={selectedBahagian}
                          name="bahagian"
                        >
                          <option value="">-- Pilih Bahagian --</option>
                          {senaraiBahagian.map((bahagian, index) => (
                            <option key={index} value={bahagian.value}>
                              {bahagian.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5  mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="jenisPermohonan"
                      >
                        {`Jenis Permohonan`}{" "}
                        <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <select
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="jenisPermohonan"
                          onChange={handleInputChange}
                          value={ciptaUlasanForm.jenisPermohonan}
                        >
                          <option value="">-- Pilih Jenis Permohonan --</option>
                          {filteredJenisPermohonan.map((permohonan, index) => (
                            <option key={index} value={permohonan.value}>
                              {permohonan.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="noFail"
                      >
                        {`No Fail`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          type="text"
                          name="noFail"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="status"
                      >
                        {`Status`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <select
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="status"
                          onChange={handleInputChange}
                          value={ciptaUlasanForm.status}
                        >
                          <option value="">-- Pilih Status --</option>
                          {filteredStatus.map((status, index) => (
                            <option key={index} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="ulasan"
                      >
                        {`Ulasan`} <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <textarea
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          name="ulasan"
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                      <label
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        htmlFor="failSokongan"
                      >
                        {`Fail Sokongan`}{" "}
                        <span className="text-red-500">*</span>
                      </label>{" "}
                      <div className="mt-1 sm:self-center flex items-center">
                        <input
                          type="file"
                          className="border border-gray-300 rounded-md px-4 py-2 w-full"
                          multiple
                          name="folderPath"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 space-y-6 sm:pt-10 sm:space-y-5">
                    <div className="sm:flex sm:gap-4 sm:justify-end sm:border-t sm:border-gray-200 sm:pt-5 ">
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      >
                        Cipta Ulasan
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          <MapContainer mapData={mapData}>
            {mapView && <HomeWidget mapView={mapView} />}
            {mapView && <LayerListWidget mapView={mapView} />}
            {mapView && <MeasureWidget mapView={mapView} />}
            {mapView && (
              <FeatureLayerWidget mapView={mapView} mapData={mapData} />
            )}
            {mapView && <BasemapWidget mapView={mapView} />}
            {mapView && <DrawWidget mapView={mapView} />}
          </MapContainer>
        </div>
      </div> */}
    </>
  );
};

export default UlasanTeknikalPage;
