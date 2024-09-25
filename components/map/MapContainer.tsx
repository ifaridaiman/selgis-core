import React, { useState } from "react";
import HomeWidget from "./widget/HomeWidget";
import MeasureWidget from "./widget/MeasureWidget";
import LayerListWidget from "./widget/LayerListWidget";
import FeatureLayerWidget from "./widget/FeatureLayerWidget";
import BasemapWidget from "./widget/BasemapWidget";
import DrawWidget from "./widget/DrawWidget";
import MapView from "@arcgis/core/views/MapView";
import WebMapWidget from "./widget/WebMapWidget";
import { useMapContext } from "./MapContext";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

type MapContainerProps = {
  children: React.ReactNode;
  mapData: Array<{ title: string, id: string, isEditing?: boolean, isExtent?: boolean }>;
};


const MapContainer: React.FC<MapContainerProps> = ({ children, mapData }) => {

  const {mapView, setMapView} = useMapContext();
  const [graphicsLayer, setGraphicsLayer] = useState<GraphicsLayer | null>(null);
  
  const handleMapViewReady = (mapViewInstance: MapView) => {
    setMapView(mapViewInstance);
  };

  

  return (
    <>
      <WebMapWidget mapData={mapData} onMapViewReady={handleMapViewReady}/>
      {/* {mapView && <HomeWidget mapView={mapView} />}
      {mapView && <LayerListWidget mapView={mapView} />}
      {mapView && <MeasureWidget mapView={mapView} />}
      {mapView && <FeatureLayerWidget mapView={mapView} mapData={mapData} />}
      {mapView && <BasemapWidget mapView={mapView} />} */}
      {/* {mapView && <DrawWidget mapView={mapView} />} */}
      {children}
    </>
  );
};

export default MapContainer;
