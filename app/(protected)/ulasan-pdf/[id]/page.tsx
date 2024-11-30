"use client";
import React, {useRef, useState, useEffect} from "react";
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";
import { useParams } from 'next/navigation'
import dynamic from "next/dynamic";
const MapImageUlasan = dynamic(() => import("@/app/(protected)/ulasan-pdf/_components/map/map-image/MapImage"),
{
  ssr: false,
  loading: () => <p>Loading...</p>,
}) ;

type UlasanItem = {
  id: number;
  ulasanID: string;
  projekId: number;
  ulasan: string;
  folderPath: string;
};



const UlasanPrint = () => {
  
  const [projectData, setProjectData] = useState<Record<string, string | number> | null>(null);
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
  const [bahagian, setBahagian] = useState("");
  const [ulasan, setUlasan] = useState<UlasanItem[]>([]); // Updated to handle array of ulasan

  const { id } = useParams();

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
        setProjectData({
          
          "Tarikh Ulasan": new Intl.DateTimeFormat('en-GB').format(new Date(result.projek.tarikhUlasan)) || "",
          "No Lot": result.projek.lotNumber || "",
          "Tajuk Projek": result.projek.tajukProjek || "",
          "Tajuk Surat": result.projek.tajukSurat || "",
          "Panjang (m)": result.projek.panjang || "",
          "Luas (m²/ha/ek)": result.projek.luas || "",
          Daerah: result.projek.daerah || "",
          Mukim: result.projek.mukim || "",
          "Koordinat X (Lat)": result.projek.koordinat_x || "",
          "Koordinat Y (Long)": result.projek.koordinat_y || "",
          "Jenis Permohonan": result.projek.jenisPermohonan || "",
          "No. Fail": result.projek.noFail || "",
        });
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
  

  const [mapImage, setMapImage] = useState<string | null>(null);

  const handleImageReady = (dataUrl: string) => {
    console.log("Map image ready:", dataUrl);
    setMapImage(dataUrl); // Save the image for display or further processing
  };

  const handlePrint = () => {
    window.print(); // Trigger the browser's print dialog
  };
  

  return (
    <div>
      <div className="flex justify-between items-center my-8 print:hidden">
        <p className="text-black font-bold text-2xl">Cetak Ulasan</p>
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Print PDF
        </button>
      </div>
      
      <div className="w-full flex justify-between py-4 px-2 bg-gray-300 md:hidden print:block">
        <img src="/ulasan-teknikal/assets/logo/logo_jpsselgis_print.png" className="w-28 h-auto" />
      </div>

      {/* Generate the map image */}
      <div className="bg-gray-500 md:h-[40rem] print:h-[20rem] print:w-full relative">
        <MapImageUlasan
          kordinatX={kordinatX}
          kordinatY={kordinatY}
          ring={rings}
          lot={lotNumber}
        />
      </div>

      <div className="mt-8">
        <p className="mb-2 font-bold text-lg">Maklumat Projek</p>
        <table className="border border-black w-full">
          <tbody>
          {projectData && Object.entries(projectData).map(([field, value], index) => (
              <tr key={index} className="border border-black p-2">
                <td className="border border-black p-2">{field}</td>
                <td className="border border-black p-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UlasanPrint;
