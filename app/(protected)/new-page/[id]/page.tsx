"use client";
import React, { useState, useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import { useMapContext } from "@/components/map/MapContext";
import { senaraiDaerahKodMukim, senaraiBahagian } from "@/contents/fieldInput";
import { CgCalculator } from "react-icons/cg";
import { MdCopyAll } from "react-icons/md";
import DsmCalculator from "@/components/calculator/DsmCalculator";
import FormGroup from "@/components/form/FormGroup";
import { useFormState } from "react-dom";
import { useCiptaUlasan } from "../_hooks/useCiptaUlasan";
import { useCalculator } from "@/components/calculator/hooks/useCalculator";
import { useRouter, useParams } from "next/navigation";

const MapComponentUlasan = dynamic(() => import("@/components/map-ulasan/MapComponentUlasan"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex justify-center items-center">Loading...</div>
  ),
});

const SearchCoordinate = dynamic(
  () => import("@/components/map/widget/SearchCoordinate"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

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
  const {
    selectedDaerah,
    selectedBahagian,
    handleChangeBahagian,
    handleChangeDaerah,
    handleInputChange,
    selectedFiles,
    handleFileChange,
  } = useCiptaUlasan();
  const { mapView, ciptaUlasanForm } = useMapContext();

  const { showCalculator, setShowCalcultor } = useCalculator();
  const [ulasanLoad, setUlasanLoad] = useState<boolean>(false);
  const [filteredJenisPermohonan, setFilteredJenisPermohonan] = useState<
    { label: string; value: string }[]
  >([]);
  const [filteredMukim, setFilteredMukim] = useState<
    { kodMukim: string; namaMukim: string }[]
  >([]);
  const router = useRouter();

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
  const [ulasan, setUlasan] = useState("");
  const [bahagian, setBahagian] = useState("");
  const [filteredStatus, setFilteredStatus] = useState<
    { label: string; value: string }[]
  >([]);
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

        const daerahData = senaraiDaerahKodMukim.find(
          (daerah) => daerah.daerah === result.projek.daerah
        );

        setFilteredMukim(daerahData ? daerahData.senaraiMukim : []);

        const bahagianData = senaraiBahagian.find(
          (bahagian) => bahagian.value === result.projek.bahagian
        );
        setFilteredStatus(bahagianData ? bahagianData.senaraiStatus : []);
        setFilteredJenisPermohonan(
          bahagianData ? bahagianData.senaraiJenisPermohonan : []
        );
        setStatus(result.projek.status || "");

        // If Ulasan is an array, handle it as needed
        if (result.ulasan && result.ulasan.length > 0) {
          setUlasan(result.ulasan.map((u: any) => u.ulasan).join(", ") || "");
        } else {
          setUlasan("");
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
  }, []);

  // const handleFormCiptaUlasan = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setUlasanLoad(true);
  //   const formData = new FormData();
  //   console.log("FORM DATA AT PAGE START: ", formData);

  //   // Append form fields
  //   formData.append("lotNumber", ciptaUlasanForm.lotNumber || "");
  //   formData.append("daerah", ciptaUlasanForm.daerah || "");
  //   formData.append("mukim", ciptaUlasanForm.mukim || "");
  //   formData.append("koordinat_x", ciptaUlasanForm.kordinatX.toString() || "");
  //   formData.append("koordinat_y", ciptaUlasanForm.kordinatY.toString() || "");
  //   formData.append("tajukProjek", ciptaUlasanForm.tajukProjek || "");
  //   formData.append("jenisPermohonan", ciptaUlasanForm.jenisPermohonan || "");
  //   formData.append("noFail", ciptaUlasanForm.noFail || "");
  //   formData.append("status", ciptaUlasanForm.status || "");
  //   formData.append("bahagian", ciptaUlasanForm.bahagian || "");
  //   formData.append("rings", JSON.stringify(ciptaUlasanForm.rings || ""));
  //   formData.append("panjang", ciptaUlasanForm.panjang?.toString() || "");
  //   formData.append("luas", ciptaUlasanForm.luas?.toString() || "");
  //   formData.append("ulasan", ciptaUlasanForm.ulasan || "");
  //   formData.append("tajukSurat", ciptaUlasanForm.tajukSurat || "");

  //   // Append files if there are any
  //   selectedFiles.forEach((file) => {
  //     formData.append("file", file);
  //   });

  //   console.log("FORM DATA AT END: ", formData);

  //   try {
  //     const response = await fetch("/ulasan-teknikal/api/ulasan", {
  //       method: "POST",
  //       body: formData,
  //     });

  //     if (response.ok) {
  //       const result = await response.json();
  //       console.log("Submitted successfully:", result);
  //       router.push("/halaman-utama");
  //     } else {
  //       console.error("Failed to submit form:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error during submission:", error);
  //   } finally {
  //     setUlasanLoad(false);
  //   }
  // };

  let mapData = [];
  try {
    mapData = JSON.parse(process.env.mapData || "[]");
  } catch (error) {
    console.error("Failed to parse mapData:", error);
  }

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <>
      <div className=" mb-6 flex justify-between items-center w-full">
        <h2 className="text-black font-bold text-2xl">
          Kemaskini Ulasan Teknikal
        </h2>
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
                    Kemaskini Ulasan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Kemaskini Ulasan teknikal untuk projek yang diusulkan.
                  </p>
                </div>
                {/* <form onSubmit={handleFormCiptaUlasan} ref={formRef}> */}
                <form ref={formRef}>
                  <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 mb-4">
                      <div>
                        <label
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          htmlFor="location"
                        >
                          {`Lokasi Lot`} <span className="text-red-500">*</span>
                        </label>{" "}
                        <div className="mt-1 text-sm text-gray-500">
                          Sketch untuk mendapatkan kordinat
                        </div>
                        <div>
                          <button
                            onClick={() => setShowCalcultor(!showCalculator)}
                            className="p-2 hover:bg-gray-200 transition-all duration-100 rounded-full"
                          >
                            <CgCalculator />
                          </button>
                          {showCalculator && (
                            <div className="relative -top-4 left-16">
                              <DsmCalculator />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="mt-1 sm:self-center flex items-center md:w-[50rem]">
                        <div className="w-full md:h-[30rem] border border-gray-400">
                          <MapComponentUlasan
                            kordinatX={kordinatX}
                            kordinatY={kordinatY}
                            ring={rings}
                            lot={lotNumber}
                          />
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
                          value={kordinatX}
                          onChange={(e) => setKordinatX(e.target.value)}
                          readOnly
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
                          value={kordinatY}
                          onChange={(e) => setKordinatY(e.target.value)}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                  <FormGroup label="No Lot" labelId="lotNumber">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="lotNumber"
                      value={lotNumber}
                      onChange={handleInputChange} // Update the form state on change
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup label="Tajuk Projek" labelId="tajukProjek">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="tajukProjek"
                      id="tajukProjek"
                      value={tajukProjek}
                      onChange={(e) => setTajukProjek(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Tajuk Surat" labelId="tajukSurat">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="tajukSurat"
                      id="tajukSurat"
                      value={tajukSurat}
                      onChange={(e) => setTajukSurat(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup label="Panjang (m)" labelId="panjang">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="panjang"
                      value={panjang}
                      onChange={(e) => setPanjang(e.target.value)} // Update the form state on change
                    />
                  </FormGroup>
                  <FormGroup label="Luas (m²)" labelId="luas">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="luas"
                      value={luas}
                      onChange={(e) => setLuas(e.target.value)} // Update the form state on change
                    />
                  </FormGroup>

                  <FormGroup label="Daerah" labelId="daerah">
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      value={daerah}
                      onChange={(e) => setDaerah(e.target.value)}
                      name="daerah"
                      disabled
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
                  </FormGroup>

                  <FormGroup label="Mukim" labelId="mukim">
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      name="mukim"
                      value={mukim}
                      onChange={(e) => setMukim(e.target.value)}
                      disabled
                    >
                      <option value="">-- Pilih Mukim --</option>
                      {filteredMukim.map((mukim, index) => (
                        <option key={index} value={mukim.namaMukim}>
                          {mukim.namaMukim}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="Bahagian" labelId="bahagian">
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      value={bahagian}
                      onChange={(e) => setBahagian(e.target.value)}
                      name="bahagian"
                      disabled
                    >
                      <option value="">-- Pilih Bahagian --</option>
                      {senaraiBahagian.map((bahagian, index) => (
                        <option key={index} value={bahagian.value}>
                          {bahagian.label}
                        </option>
                      ))}
                    </select>
                  </FormGroup>
                  <FormGroup label="Jenis Permohonan" labelId="jenisPermohonan">
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      name="jenisPermohonan"
                      value={jenisPermohonan}
                      onChange={(e) => setJenisPermohonan(e.target.value)}
                      disabled
                    >
                      <option value="">-- Pilih Jenis Permohonan --</option>
                      {filteredJenisPermohonan.map((permohonan, index) => (
                        <option key={index} value={permohonan.value}>
                          {permohonan.label}
                        </option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup label="No Fail" labelId="noFail">
                    <input
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      type="text"
                      name="noFail"
                      value={noFail}
                      onChange={(e) => setNoFail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup label="Status" labelId="status">
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">-- Pilih Status --</option>
                      {filteredStatus.map((status, index) => (
                        <option key={index} value={status.value}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </FormGroup>

                  <FormGroup label="Ulasan" labelId="ulasan">
                    <textarea
                      className="border border-gray-300 rounded-md px-4 py-2 w-full"
                      name="ulasan"
                      value={ulasan}
                      onChange={(e) => setUlasan(e.target.value)}
                    ></textarea>
                  </FormGroup>

                  <FormGroup label="Fail Sokongan" labelId="failSokongan">
                    <div className="max-w-xl">
                      <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                          </svg>
                          <span className="font-medium text-gray-600">
                            Drop files to Attach, or
                            <span className="text-blue-600 underline">
                              browse
                            </span>
                          </span>
                        </span>
                        <input
                          type="file"
                          name="file"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      <div className="mt-2">
                        {selectedFiles.length > 0 && (
                          <ul>
                            {selectedFiles.map((file, index) => (
                              <li key={index} className="text-sm text-gray-700">
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </FormGroup>

                  <div className="pt-6 space-y-6 sm:pt-10 sm:space-y-5">
                    <div className="sm:flex sm:gap-4 sm:justify-end sm:border-t sm:border-gray-200 sm:pt-5 ">
                      <button
                        type="submit"
                        className="bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-50 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                      >
                        {ulasanLoad ? "Loading ..." : "Kemaskini Ulasan"}
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
