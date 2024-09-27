import React, { createContext, useContext, useState, ReactNode } from "react";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import WebMap from "@arcgis/core/WebMap";

export type lotAttributes = {
  OBJECTID: number;
  No_Lot: string;
  Nama_Mukim: string;
  Nama_Daerah: string;
};

export type CiptaUlasanFormType = {
  noLot: string;
  daerah: string;
  mukim: string;
  kordinatX: string;
  kordinatY: string;
  tajukProjek: string;
};

type MapContextType = {
  mapView: MapView | null;
  setMapView: (view: MapView | null) => void;
  lotNumber: string;
  setLotNumber: (lotNumber: string) => void;
  listOfDaerah: string[];
  setListOfDaerah: (listOfDaerah: string[]) => void;
  listOfMukim: string[];
  setListOfMukim: (listOfMukim: string[]) => void;
  listOfLot: any[];
  setListOfLot: (listOfLot: any[]) => void;
  zoomToDaerah: (daerah: string) => void;
  graphicLayer: GraphicsLayer;
  ciptaUlasanForm: CiptaUlasanFormType;
  setCiptaUlasanForm: (form: CiptaUlasanFormType) => void;

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
  const [listOfMukim, setListOfMukim] = useState<string[]>([]);
  const [lotNumber, setLotNumber] = useState<string>("");
  const [listOfLot, setListOfLot] = useState<lotAttributes[]>([]);
  const [listOfDaerah, setListOfDaerah] = useState<string[]>([]);
  const [ciptaUlasanForm, setCiptaUlasanForm] = useState<CiptaUlasanFormType>({
    noLot: "",
    daerah: "",
    mukim: "",
    kordinatX: "",
    kordinatY: "",
    tajukProjek: "",
  })

  const zoomToDaerah = (daerah: string) => {
    if (mapView) {
      // Example: You may need to adjust this to fit your data structure and coordinate system
      const targetLayer = mapView.map.layers.find(
        (layer) => layer.title === "DaerahLayer" // Replace with your actual layer title or ID
      );

      // if (targetLayer) {
      //   targetLayer.queryFeatures({
      //     where: `DaerahName = '${daerah}'`, // Replace with your actual field name
      //     returnGeometry: true,
      //   }).then((response: any) => {
      //     const feature = response.features[0];
      //     if (feature) {
      //       const extent = feature.geometry.extent.expand(1.2); // Slightly expand the extent for better view
      //       mapView.goTo(extent);
      //     }
      //   });
      // }
    }
  };

  
  const graphicLayer = new GraphicsLayer({
    title: "Sketch Layer",
  });


  

  return (
    <MapContext.Provider
      value={{
        mapView,
        setMapView,
        lotNumber,
        setLotNumber,
        listOfMukim,
        setListOfMukim,
        listOfLot,
        setListOfLot,
        listOfDaerah,
        setListOfDaerah,
        zoomToDaerah,
        graphicLayer,
        ciptaUlasanForm,
        setCiptaUlasanForm
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
