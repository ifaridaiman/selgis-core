import React, { createContext, useContext, useState, ReactNode } from "react";
import MapView from "@arcgis/core/views/MapView";

type MapContextType = {
  mapView: MapView | null;
  setMapView: (view: MapView | null) => void;
  lotNumber: string;
  setLotNumber: (lotNumber: string) => void;
  // Add any other state you want to share across the components
};

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

type MapProviderProps = {
  children: ReactNode;
};

export let mapView: MapView | null = null;

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [mapView, setMapView] = useState<MapView | null>(null);
  const [lotNumber, setLotNumber] = useState<string>('')

  return (
    <MapContext.Provider value={{ mapView, setMapView, lotNumber, setLotNumber }}>
      {children}
    </MapContext.Provider>
  );
};
