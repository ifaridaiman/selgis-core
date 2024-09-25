"use client";
import React, { useState, useEffect } from "react";
import { BiLayerPlus } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import { useNewProjek } from "@/hooks/dashboard/useNewProjek";
import UlasanContainer from "@/components/ulasan/UlasanContainer";
const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const HomeWidget = dynamic(() => import("@/components/map/widget/HomeWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const LayerListWidget = dynamic(() => import("@/components/map/widget/LayerListWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const MeasureWidget = dynamic(() => import("@/components/map/widget/MeasureWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const FeatureLayerWidget = dynamic(() => import("@/components/map/widget/FeatureLayerWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const BasemapWidget = dynamic(() => import("@/components/map/widget/BasemapWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const DrawWidget = dynamic(() => import("@/components/map/widget/DrawWidget"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const UlasanTeknikalPage = () => {
  const { lotNumber, setLotNumber, listOfLot, listOfMukim, listOfDaerah } =
    useMapContext();
  const [showDaftarProject, setShowDaftarProject] = useState<boolean>(false);

  const { nextStep, prevStep, currentStep } = useNewProjek();

  const { handleChangeDaerah } = useDashboard();

  let mapData = [];
  try {
    mapData = JSON.parse(process.env.mapData || "[]");
  } catch (error) {
    console.error("Failed to parse mapData:", error);
  }

  const { mapView} = useMapContext();

  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan Teknikal</h2>
        <button
          className="flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-75 py-2 px-3 rounded-md text-blue-100"
          onClick={() => setShowDaftarProject(!showDaftarProject)}
        >
          <BiLayerPlus className="text-base" /> Daftar Projek
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 mb-12">
        <div className="bg-gray-500 md:h-[40rem]">
          {/* Map Section */}
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
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Cipta Ulasan</h2>
          {currentStep === 1 && (
            <div id="step-1">
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
                <label className="block mb-2">Kordinat X</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Kordinat Y</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div id="step-2">
              <div className="mb-4">
                <label className="block mb-2 text-black">Tajuk Projek</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">
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
                <label className="block mb-2 text-black">No. Fail</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">Status</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-black">Bahagian</label>
                <input
                  type="text"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={lotNumber}
                  onChange={(e) => setLotNumber(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-4">
            <button
              onClick={prevStep}
              className={`bg-gray-400 text-gray-600 py-2 px-4 rounded-md ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentStep === 1}
            >
              {`Kembali`}
            </button>
            {currentStep === 2 ? (
              <button
                onClick={nextStep}
                className={`bg-blue-500 text-blue-200 py-2 px-4 rounded-md`}
              >
                {"Daftar"}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className={`bg-blue-500 text-blue-200 py-2 px-4 rounded-md ${
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

      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">Ulasan</h2>
      </div>
      <div className="bg-white p-7 rounded-lg">
        <div className="flex justify-between mb-4"></div>
        {/* <UlasanContainer /> */}
      </div>
    </>
  );
};

export default UlasanTeknikalPage;
