"use client";
import React, { useEffect, useRef, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";
import { loadWebMap } from "@/services/layer.service";

const MapContainer = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<MapView | null>(null);

  useEffect(() => {
    const webmap = loadWebMap();

    const mapView = new MapView({
      map: webmap,
      container: mapDiv.current as HTMLDivElement,
      zoom: 10,
      center: [101.6869, 3.139],
    });

    setView(mapView);

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, []);
  
  return <div ref={mapDiv} style={{ height: "100%", width: "100%" }}></div>;
};

export default MapContainer;
