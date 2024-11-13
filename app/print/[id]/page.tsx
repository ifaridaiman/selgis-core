"use client";
import React, {useRef, useState, useEffect} from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import { useParams } from 'next/navigation'

const UlasanPrint = () => {
  const mapRef = useRef(null);
  const handlePrint = () => {
    window.print();
  };

  const [lotNumber, setLotNumber] = useState("");
  const [tajukProjek, setTajukProjek] = useState("");
  const [tajukSurat, setTajukSurat] = useState("");
  const [panjang, setPanjang] = useState("");
  const [luas, setLuas] = useState("");
  const [daerah, setDaerah] = useState("");
  const [mukim, setMukim] = useState("");
  const [kordinatX, setKordinatX] = useState("");
  const [kordinatY, setKordinatY] = useState("");
  const [jenisPermohonan, setJenisPermohonan] = useState("");
  const [noFail, setNoFail] = useState("");
  const [status, setStatus] = useState("");
  const [ulasan, setUlasan] = useState("");
  const [bahagian, setBahagian] = useState("")
  const params = useParams<{id: string}>()
  
  const fetchData = async () => {
    

    if (!params) {
      console.error("No 'no_lot' query parameter found.");
      return;
    }

    console.log('USE PARAMS: ',params)

    // const response = await fetch(
    //   `/ulasan-teknikal/api/ulasan-teknikal`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ no_lot: no_lot }), // Pass no_lot in the body
    //   }
    // );

    // if (response.ok) {
    //   const result = await response.json();
    //   const data = result.ulasans[0]; // Assuming there's one item returned

    //   console.log("Data: ",data)
    //   // Set each form field with fetched data
    //   setLotNumber(data.lotNumber || "");
    //   setTajukProjek(data.tajukProjek || "");
    //   setTajukSurat(data.tajukSurat || "");
    //   setPanjang(data.panjang || "");
    //   setLuas(data.luas || "");
    //   setDaerah(data.daerah || "");
    //   setMukim(data.mukim || "");
    //   setKordinatX(data.koordinat_x || "");
    //   setKordinatY(data.koordinat_y || "");
    //   setJenisPermohonan(data.jenisPermohonan || "");
    //   setNoFail(data.noFail || "");
    //   setStatus(data.status || "");
    //   setUlasan(data.ulasan || "");
    //   setBahagian(data.bahagian || "");
    //   console.log("Submitted successfully:", result);
    // } else {
    //   console.error("Failed to submit form:", response.statusText);
    // }
  };

  useEffect(() => {
    fetchData();
  }, [])
  

  return (
    <div className="printable-container">
      <h1>Printable Report</h1>
      <p>This is a sample page designed for printing as a PDF.</p>
      <div></div>
      {/* Your printable content here */}
      <div className="content">
        <h2>Report Summary</h2>
        <p>This is where the main content of the report goes.</p>
      </div>

      {/* Hide this button when printing */}
      <button onClick={handlePrint} className="print-button">
        Print or Save as PDF
      </button>

      <style jsx>{`
        .printable-container {
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .content {
          margin-top: 20px;
        }

        .print-button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }

        /* Print styles */
        @media print {
          .print-button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default UlasanPrint;
