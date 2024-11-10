"use client";
import JadualUlasanTable from "@/features/halamanUtama/jadualUlasan";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TablePaginate } from "@/components/table/TablePaginate";
import { BiLayerPlus } from "react-icons/bi";
import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import { IoPencilOutline } from "react-icons/io5";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { useTable } from "@/hooks/dashboard/useTable";
import { useDashboard } from "@/hooks/dashboard/useDashboard";
import TabContainer from "@/components/tab/TabContainer";
import Tab from "@/components/tab/Tab";
import Graphic from "@arcgis/core/Graphic";
import { toast, Bounce } from "react-toastify";
import  FeatureLayer  from "@arcgis/core/layers/FeatureLayer";

const MapContainer = dynamic(() => import("@/components/map/MapContainer"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
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

import { senaraiDaerahKodMukim } from "@/contents/fieldInput";
import Polygon from "@arcgis/core/geometry/Polygon";
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';

const DashboardPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedDaerah, setSelectedDaerah] = useState("");
  const [filteredMukim, setFilteredMukim] = useState<{ kodMukim: string; namaMukim: string }[]>([]);
  const { lotNumber, setLotNumber, listOfLot, listOfMukim, listOfDaerah, allGroupLayers, mapView, graphicLayer } =
    useMapContext();
  const [filteredLotList, setFilteredLotList] = useState<any[]>([]);
  
  const handleChangeDaerah = (e: React.FormEvent<HTMLSelectElement>) => {
    const selected = (e.target as HTMLSelectElement).value;
    setSelectedDaerah(selected);

    const daerahData = senaraiDaerahKodMukim.find((daerah) => daerah.daerah === selected);

    setFilteredMukim(daerahData ? daerahData.senaraiMukim : []);
    
  };

  const {
    handleRowSelect,
    handleSelectAll,
    selectedRows,
    handlePaginatedData,
  } = useTable();
  // const { handleChangeDaerah } = useDashboard();

  let mapData = [];
  try {
    mapData = JSON.parse(process.env.mapData || "[]");
  } catch (error) {
    console.error("Failed to parse mapData:", error);
  }

  useEffect(() => {
    setFilteredLotList(listOfLot);
    setCurrentPage(1); // Reset to the first page on new search
  }, [lotNumber, listOfLot]);

  const paginatedData = handlePaginatedData(filteredLotList, currentPage);

  // const ulasanData = handlePaginatedData(ulasanDataFetch, currentPage);

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
    e.preventDefault();
    console.log("Form Carian Submit");
    const form = e.target as HTMLFormElement;
    let lotNumber = form.lotNumber.value;
    let daerah = form.daerah.value;
    let mukim = form.mukim.value;

    if (lotNumber && lotNumber.length > 0) {
      
      const filtered = listOfLot.filter((item) => {

        // Start with filtering by Lot Number if it's provided
        let matchesLot = lotNumber && lotNumber.length > 0
        ? item.attributes.No_Lot && item.attributes.No_Lot.toLowerCase().includes(lotNumber.toLowerCase())
        : true;

        // If Daerah is provided, also filter by Daerah
        let matchesDaerah = daerah && daerah.length > 0
          ? item.attributes.Nama_Daerah && item.attributes.Nama_Daerah.toLowerCase().includes(daerah.toLowerCase())
          : true;

        // If Mukim is provided, also filter by Mukim
        let matchesMukim = mukim && mukim.length > 0
          ? item.attributes.Nama_Mukim && item.attributes.Nama_Mukim.toLowerCase().includes(mukim.toLowerCase())
          : true;
        
        console.log("matchesLot", matchesLot);
        console.log("matchesDaerah", matchesDaerah);
        console.log("matchesMukim", matchesMukim);
        console.log("item.attributes.Daerah", item.attributes)

        // Return true if all provided conditions match
        return matchesLot && matchesDaerah && matchesMukim;
      });

      if (filtered.length == 0) {
        toast.error("Rekod tidak ditemui", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }

      setFilteredLotList(filtered);
    }
  };

  const handleZoomtoLayer = (rings: number[][][], No_Lot: number)  => {

    if(!mapView) return;

    console.log("Rings: ", rings);

    if (rings && rings.length > 0) {
      // Create the graphic layer if not already added
      let graphicLayer = mapView.map.findLayerById('polygonGraphicLayer') as GraphicLayer;
      if (!graphicLayer) {
        graphicLayer = new GraphicLayer({ id: 'polygonGraphicLayer' });
        mapView.map.add(graphicLayer);
      }

      // Construct polygon geometry using the rings provided
      const polygon = new Polygon( {
        rings: rings,
        spatialReference: { wkid: 3857 }, // Assuming your data is in WGS84 (wkid: 4326)
      });

      const fillSymbol = new SimpleFillSymbol({
        color: [227, 139, 79, 0.8], // RGBA color
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
      });

      // Create a graphic and add it to the graphic layer
      const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
      });
  
      graphicLayer.removeAll(); // Clear any existing graphics before adding a new one
      graphicLayer.add(polygonGraphic);

      // Calculate the centroid of the polygon
    const centroid = polygon.centroid;

    // Create a text symbol to display No_Lot at the centroid of the polygon
    const textSymbol = new TextSymbol({
      color: 'black',
      haloColor: 'white',
      haloSize: '1px',
      text: No_Lot.toString(),  // Convert the No_Lot to a string
      font: {
        size: 12,
        family: 'sans-serif',
        weight: 'bold',
      }
    });

    // Create a graphic for the text symbol and add it to the graphic layer
    const textGraphic = new Graphic({
      geometry: centroid,  // Use the centroid of the polygon as the location for the text
      symbol: textSymbol,
    });

    graphicLayer.add(textGraphic);

      // Zoom to the polygon geometry
      mapView.goTo(polygon.extent).catch((error) => {
        console.error("Error zooming to the layer:", error);
      });
    } else {
      console.error("Rings are not available for the selected lot");
    }
  };
  
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
            {mapView && <HomeWidget mapView={mapView} />}
            {mapView && <LayerListWidget mapView={mapView} />}
            {mapView && <MeasureWidget mapView={mapView} />}
            {mapView && (
              <FeatureLayerWidget mapView={mapView} mapData={mapData} />
            )}
            {mapView && <BasemapWidget mapView={mapView} />}
          </MapContainer>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold mb-4">Carian</h2>
          <form onSubmit={handleFormCarianSubmit}>
            <div className="mb-4">
              <label className="block mb-2">No. Lot</label>
              <input
                name="lotNumber"
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Daerah</label>
              <select
                name="daerah"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                onChange={handleChangeDaerah}
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
            <div className="mb-4">
              <label className="block mb-2">Mukim</label>
              <select
                name="mukim"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
              >
                <option value="">-- Pilih Mukim --</option>
                {filteredMukim.map((mukim, index) => (
                  <option key={index} value={mukim.namaMukim}>
                    {mukim.namaMukim}
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
          <table className="w-full">
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
                      <td className="py-4 px-4">{item.attributes.No_Lot}</td>
                      <td className="py-4 px-4 text-center">
                        {item.attributes.Nama_Mukim}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.attributes.Nama_Daerah || item.attributes.Nama_Daera}
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
                            onClick={() => handleZoomtoLayer(item.geometry?.rings, item.attributes.No_Lot)}
                          >
                            <FaMagnifyingGlassLocation />
                          </button>
                          <a
                            href={`/ulasan-teknikal/cipta-ulasan?no_lot=${item.attributes.No_Lot}&rings=${item.geometry?.rings}`}
                            className="p-2 hover:bg-gray-200 transition-all duration-150 ease-in-out hover:rounded-full"
                            title="Cipta Ulasan Berdasarkan lot"
                          >
                            <IoPencilOutline />
                          </a>

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
          </table>
          <TablePaginate
            currentPage={paginatedData.currentPage}
            totalPages={paginatedData.totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </Tab>
        <Tab label="Jadual Ulasan">
        {/* <table className="w-full">
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
      </table> */}
          <JadualUlasanTable />
        </Tab>
      </TabContainer>
    </>
  );
};

export default DashboardPage;
