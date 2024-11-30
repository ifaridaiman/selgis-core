"use client";
import React from "react";
import { MdCopyAll } from "react-icons/md";
import { useCalculator } from "./hooks/useCalculator";

const DsmCalculator = () => {
  const {
    latitudeDegrees,
    latitudeMinutes,
    latitudeSeconds,
    setLatitudeDegrees,
    setLatitudeMinutes,
    setLatitudeSeconds,
    longitudeDegrees,
    longitudeMinutes,
    longitudeSeconds,
    setLongitudeDegrees,
    setLongitudeMinutes,
    setLongitudeSeconds,
    decimalLatitude,
    decimalLongitude,
    handleConvertToDecimal,
    copyToClipboard,
  } = useCalculator();

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
            type="button"
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
              <button type="button" onClick={(e) => copyToClipboard(decimalLatitude, e)}>
                <MdCopyAll />
              </button>
            </div>
            <p className="text-blue-500">{decimalLatitude || "N/A"}</p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Longitude</label>
              <button type="button" onClick={(e) => copyToClipboard(decimalLongitude,e)}>
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
