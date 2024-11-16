"use client";
import React, {useRef, useState, useEffect} from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";
import { useParams } from 'next/navigation'
import { pdf, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import MapComponentUlasan from "@/components/map-ulasan/MapComponentUlasan";
import MapImageUlasan from "@/app/(protected)/ulasan-pdf/_components/map/map-image/MapImage";
import Image from "next/image";
import styles from "../styles/style"

type UlasanItem = {
  id: number;
  ulasanID: string;
  projekId: number;
  ulasan: string;
  folderPath: string;
};



const UlasanPrint = () => {
  const mapRef = useRef(null);
  
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
          "Lot Number": result.projek.lotNumber || "",
          "Tajuk Projek": result.projek.tajukProjek || "",
          "Tajuk Surat": result.projek.tajukSurat || "",
          Panjang: result.projek.panjang || "",
          Luas: result.projek.luas || "",
          Daerah: result.projek.daerah || "",
          Mukim: result.projek.mukim || "",
          "Koordinat X": result.projek.koordinat_x || "",
          "Koordinat Y": result.projek.koordinat_y || "",
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

  const handlePrint = async () => {
    const MyDocument = () =>(
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>Ulasan Teknikal</Text>
          {mapImage ? (
            <Image style={styles.mapImage} src={mapImage} alt="image" width={100} height={100} />
          ) : (
            <Text>Loading map...</Text>
          )}
          <View style={styles.table}>
          {projectData && Object.entries(projectData).map(([field, value], index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{field}</Text>
                <Text style={styles.tableCell}>{value}</Text>
              </View>
            ))}
          </View>
        </Page>
      </Document>
    );

    // Generate the PDF blob
    const blob = await pdf(<MyDocument />).toBlob();

    // Open the PDF in a new tab
    const blobURL = URL.createObjectURL(blob);
    const newTab = window.open(blobURL);
    if (newTab) {
      newTab.onload = () => {
        newTab.print(); // Print the PDF once the tab is loaded
      };
    }
  };

  return (
    <div>
      <button onClick={handlePrint} className="print-button">
        Print Document
      </button>

      {/* Generate the map image */}
      <div className="bg-gray-500 md:h-[40rem]">
        <MapImageUlasan
          kordinatX={kordinatX}
          kordinatY={kordinatY}
          ring={rings}
          lot={lotNumber}
          onImageReady={handleImageReady}
        />
      </div>
    </div>
  );
};

export default UlasanPrint;
