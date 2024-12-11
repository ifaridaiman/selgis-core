import React, { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Polygon from "@arcgis/core/geometry/Polygon";
import Polyline from "@arcgis/core/geometry/Polyline";
import Graphic from "@arcgis/core/Graphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import LayerList from "@arcgis/core/widgets/LayerList";
import { toast } from "react-toastify";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";

type MapComponentUlasanProps = {
  kordinatX: string;
  kordinatY: string;
  ring: string;
  lot:string
};

const MapComponentUlasan: React.FC<MapComponentUlasanProps> = ({kordinatX, kordinatY, ring, lot}) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!mapDiv.current) return;

  //   const graphicLayer = new GraphicsLayer({
  //     title: "Sketch Layer",
  //   });

  //   const webMap = new WebMap({
  //     basemap: "satellite",
  //   });

  //   // Add graphicLayer to the map's operational layers
  //   webMap.add(graphicLayer);

  //   const centerX = parseFloat(kordinatX);
  //   const centerY = parseFloat(kordinatY);

  //   let rings = [];
  //   try {
  //     rings = JSON.parse(ring); // Attempt to parse the "ring" JSON string
  //   } catch (error) {
  //     console.error("Invalid JSON for ring:", error);
  //     // Fallback: Replace with a simple default array or subset
  //     toast.error("Polygon not closed correctly, please check.")
  //   }
  //   const view = new MapView({
  //     container: mapDiv.current,
  //     map: webMap,
  //     center: [centerX, centerY],
  //     zoom: 18,
  //     // constraints: {
  //     //   minZoom: 18, // Set min and max zoom to the same value to disable zooming
  //     //   maxZoom: 18,
  //     //   snapToZoom: false, // Disable snapping to zoom levels
  //     //   rotationEnabled: false
  //     // },
  //     // navigation: {
  //     //   gamepad: {
  //     //     enabled: false
  //     //   },
  //     //   browserTouchPanEnabled: false,
  //     //   momentumEnabled: false,
  //     //   mouseWheelZoomEnabled: false
  //     // },
  //   });

  //   view.on("drag", function(event){
  //     // prevents panning with the mouse drag event
  //     event.stopPropagation();
  //   });

  //   view.when(() => {
  //     console.log("Map is ready");
  //     const polygon = new Polygon({
  //       rings: rings,
  //       spatialReference: { wkid: 4326 }, // Set to the correct spatial reference
  //     });

  //     let polylineSymbol = {
  //       type: "simple-fill", // autocasts as new SimpleFillSymbol()
  //       color: [51, 51, 204, 0.5], // semi-transparent blue
  //       outline: {
  //         color: [255, 255, 255], // white outline
  //         width: 1,
  //       },
  //     }

  //     const polygonGraphic = new Graphic({
  //       geometry: polygon,
  //       symbol: polylineSymbol,
  //     });

  //     graphicLayer.add(polygonGraphic);

  //     // Calculate the centroid of the polygon for placing the text symbol
  //     const centroid = polygon.extent.center;

  //     // Define the text symbol for the lot text
  //     const textSymbol = new TextSymbol({
  //       text: lot,
  //       color: "black",
  //       haloColor: "white",
  //       haloSize: "1px",
  //       font: {
  //         size: 12,
  //         family: "sans-serif",
  //       },
  //     });

  //     // Create a graphic for the lot text and place it at the centroid
  //     const textGraphic = new Graphic({
  //       geometry: centroid,
  //       symbol: textSymbol,
  //     });

  //     // Add the text graphic to the graphics layer
  //     graphicLayer.add(textGraphic);

      

  //   }).catch((error) => {
  //     console.log("Error initializing map: ", error);
  //   });

  //   // Cleanup function to destroy the view on component unmount
  //   return () => {
  //     if (view) {
  //       view.destroy();
  //     }
  //   };
  // }, [kordinatX, kordinatY, ring]); // Removed dependency array since no props are used

  useEffect(() => {
    if (!mapDiv.current) return;
  
    const graphicLayer = new GraphicsLayer({
      title: "Sketch Layer",
    });
  
    const webMap = new WebMap({
      basemap: "satellite",
    });
  
    // Add graphicLayer to the map's operational layers
    webMap.add(graphicLayer);
  
    const centerX = parseFloat(kordinatX);
    const centerY = parseFloat(kordinatY);
  
    let rings = [];
    try {
      rings = JSON.parse(ring); // Attempt to parse the "ring" JSON string
    } catch (error) {
      console.error("Invalid JSON for ring:", error);
      toast.error("Polygon not closed correctly, please check.");
      return;
    }
  
    const view = new MapView({
      container: mapDiv.current,
      map: webMap,
      center: [centerX, centerY],
      zoom: 18,
    });
  
    view.on("drag", (event) => {
      event.stopPropagation(); // Prevents panning with the mouse drag event
    });
  
    view.when(() => {
      console.log("Map is ready");
  
      if (rings.length > 0) {
        const firstPoint = rings[0][0];
        const lastPoint = rings[0][rings[0].length - 1];
  
        let geometry;
        let symbol;
  
        // Check if the first and last points are the same
        const isClosed =
          firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1];
  
        if (isClosed) {
          // Create a polygon if the first and last points are the same
          geometry = new Polygon({
            rings: rings,
            spatialReference: { wkid: 4326 },
          });
  
          symbol = new SimpleFillSymbol({
            color: [51, 51, 204, 0.5], // semi-transparent blue
            outline: {
              color: [255, 255, 255], // white outline
              width: 1,
            },
          });
        } else {
          // Create a polyline if the first and last points are not the same
          geometry = new Polyline ({
            paths: rings,
            spatialReference: { wkid: 4326 },
          });
  
          symbol = new SimpleLineSymbol({
            color: [255, 0, 0], // red line
            width: 2,
          });
        }
  
        const graphic = new Graphic({
          geometry: geometry,
          symbol: symbol,
        });
  
        graphicLayer.add(graphic);
  
        // Calculate the centroid of the geometry for placing the text symbol
        const centroid = geometry.extent.center;
  
        // Define the text symbol for the lot text
        const textSymbol = new TextSymbol({
          text: lot,
          color: "black",
          haloColor: "white",
          haloSize: "1px",
          font: {
            size: 12,
            family: "sans-serif",
          },
        });
  
        // Create a graphic for the lot text and place it at the centroid
        const textGraphic = new Graphic({
          geometry: centroid,
          symbol: textSymbol,
        });
  
        graphicLayer.add(textGraphic);
      }
    }).catch((error) => {
      console.error("Error initializing map: ", error);
    });
  
    // Cleanup function to destroy the view on component unmount
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, [kordinatX, kordinatY, ring, lot]);
  
  return <div ref={mapDiv} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponentUlasan;
