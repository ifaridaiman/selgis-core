import React, { useState,useRef, useEffect } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import HomeWidget from "./widget/HomeWidget";
import MeasureWidget from "./widget/MeasureWidget";

type MapContainerProps = {
  children: React.ReactNode;
};

export let mapView: MapView | null = null; // Updated to export mapView

const MapContainer: React.FC<MapContainerProps> = ({ children }) => {
  
  const [view, setView] = useState<MapView | null>(null);
  const mapDiv = useRef<HTMLDivElement>(null);


  const webMap = new WebMap({
    basemap: "streets-navigation-vector",
  })

  useEffect(() => {
    if (!mapDiv.current) return;

    const initMap = async () => {
      try {
        mapView = new MapView({
          container: mapDiv.current as HTMLDivElement,
          map: webMap,
          center: [101.6869, 3.139],
          zoom: 13,
        });

        mapView.when( () => {
          console.log("map is ready");
          setView(mapView);
        }).catch((error) => {
          console.log("error init Map: ", error);
        });
      } catch (err) {
        console.error("error loading map: ", err);
      }
    };

    initMap();
  }, [mapDiv]);

  return (
    <>
      <div ref={mapDiv} style={{ height: "100%" }}>
        {view && <HomeWidget mapView={view} />}
        {view && <MeasureWidget mapView={view} />}
        {children}
      </div>
    </>
  );
};

export default MapContainer;
