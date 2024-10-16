'use client'
import React, { useState } from "react";
import { MdCopyAll } from "react-icons/md";

const DsmCalculator = () => {
  const [latitudeDegrees, setLatitudeDegrees] = useState("");
  const [latitudeMinutes, setLatitudeMinutes] = useState("");
  const [latitudeSeconds, setLatitudeSeconds] = useState("");

  const [longitudeDegrees, setLongitudeDegrees] = useState("");
  const [longitudeMinutes, setLongitudeMinutes] = useState("");
  const [longitudeSeconds, setLongitudeSeconds] = useState("");

  const [decimalLatitude, setDecimalLatitude] = useState("");
  const [decimalLongitude, setDecimalLongitude] = useState("");

  // Helper function to convert DMS to Decimal Degrees
  const convertDmsToDecimal = (degrees: number, minutes: number, seconds: number) => {
    return degrees + minutes / 60 + seconds / 3600;
  };

  const handleConvertToDecimal = () => {
    const latDegrees = parseFloat(latitudeDegrees) || 0;
    const latMinutes = parseFloat(latitudeMinutes) || 0;
    const latSeconds = parseFloat(latitudeSeconds) || 0;

    const longDegrees = parseFloat(longitudeDegrees) || 0;
    const longMinutes = parseFloat(longitudeMinutes) || 0;
    const longSeconds = parseFloat(longitudeSeconds) || 0;

    const decimalLat = convertDmsToDecimal(latDegrees, latMinutes, latSeconds);
    const decimalLong = convertDmsToDecimal(longDegrees, longMinutes, longSeconds);

    setDecimalLatitude(decimalLat.toFixed(6));
    setDecimalLongitude(decimalLong.toFixed(6));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="p-4 border border-gray-400 rounded-md max-w-80">
      <div id="dsmCalculator">
        <div>
          <p className="text-xs">Latitude</p>
          <div className="flex flex-row gap-4">
            <div>
              <label className="text-sm">Degrees</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={latitudeDegrees}
                onChange={(e) => setLatitudeDegrees(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Minutes</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={latitudeMinutes}
                onChange={(e) => setLatitudeMinutes(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Seconds</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={latitudeSeconds}
                onChange={(e) => setLatitudeSeconds(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-xs">Longitude</p>
          <div className="flex flex-row gap-4">
            <div>
              <label className="text-sm">Degrees</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={longitudeDegrees}
                onChange={(e) => setLongitudeDegrees(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Minutes</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={longitudeMinutes}
                onChange={(e) => setLongitudeMinutes(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm">Seconds</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={longitudeSeconds}
                onChange={(e) => setLongitudeSeconds(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-blue-400 w-full rounded p-2"
            onClick={handleConvertToDecimal}
          >
            Convert to Decimal
          </button>
        </div>

        <div className="border border-gray-400 p-2 mt-2">
          <div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Latitude</label>
              <button onClick={() => copyToClipboard(decimalLatitude)}>
                <MdCopyAll />
              </button>
            </div>
            <p className="text-blue-500">{decimalLatitude || "N/A"}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Longitude</label>
              <button onClick={() => copyToClipboard(decimalLongitude)}>
                <MdCopyAll />
              </button>
            </div>
            <p className="text-blue-500">{decimalLongitude || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsmCalculator;
