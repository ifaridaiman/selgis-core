import React, { useState } from "react";
import HomeWidget from "./widget/HomeWidget";
import MeasureWidget from "./widget/MeasureWidget";
import LayerListWidget from "./widget/LayerListWidget";
import FeatureLayerWidget from "./widget/FeatureLayerWidget";
import BasemapWidget from "./widget/BasemapWidget";
import DrawWidget from "./widget/DrawWidget";
import MapView from "@arcgis/core/views/MapView";
import WebMapWidget from "./widget/WebMapWidget";

type MapContainerProps = {
  children: React.ReactNode;
  mapData: Array<{ title: string, id: string, isEditing?: boolean, isExtent?: boolean }>;
};

export let mapView: MapView | null = null;

const MapContainer: React.FC<MapContainerProps> = ({ children, mapData }) => {
  const [view, setView] = useState<MapView | null>(null);

  const handleMapViewReady = (mapViewInstance: MapView) => {
    mapView = mapViewInstance;
    setView(mapViewInstance);
  };

  return (
    <>
      <WebMapWidget mapData={mapData} onMapViewReady={handleMapViewReady} />
      {view && <HomeWidget mapView={view} />}
      {view && <LayerListWidget mapView={view} />}
      {view && <MeasureWidget mapView={view} />}
      {/* {view && <FeatureLayerWidget mapView={view} mapData={mapData} />} */}
      {view && <BasemapWidget mapView={view} />}
      {view && <DrawWidget mapView={view} />}
      {children}
    </>
  );
};

export default MapContainer;
