import React, { useEffect, useState } from "react";
import { useJadualUlasan } from "./hooks/useJadualUlasan";
const JadualUlasanTable = () => {
  const [jadualUlasanData, setJadualUlasanData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJadualUlasan = async () => {
    try {
      const res = await fetch("/api/ulasan");
      if (!res.ok) {
        throw new Error("Failed to fetch jadual ulasan");
      }
      const data = await res.json();
      setJadualUlasanData(data.listOfLotUlasan); // Set the fetched data into state
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
        {jadualUlasanData.map((projek) => (
          <tr key={projek.id}>
            <td className="py-4 px-4 text-center">
              <input type="checkbox" />
            </td>
            <td className="py-4 px-4">{projek.tajukProjek}</td>
            <td className="py-4 px-4 text-center">{projek.jenisPermohonan}</td>
            <td className="py-4 px-4 text-center">{projek.daerah}</td>
            <td className="py-4 px-4 text-center">{projek.mukim}</td>
            <td className="py-4 px-4 text-center">{projek.bahagian}</td>
            <td className="py-4 px-4 text-center">{projek.status}</td>
            <td className="py-4 px-4 text-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">View Ulasan</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JadualUlasanTable;
