import React, { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import esriConfig from "@arcgis/core/config";
import LayerList from "@arcgis/core/widgets/LayerList";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import Expand from "@arcgis/core/widgets/Expand";
import Point from "@arcgis/core/geometry/Point";
import { useMapContext } from "../map/MapContext";

type MapComponentLotProps = {
  lot: string;
  rings: string;
};

const MapComponentLot: React.FC<MapComponentLotProps> = ({ lot, rings }) => {
  const mapDiv = useRef<HTMLDivElement>(null);

  const { setCiptaUlasanForm } = useMapContext();


  const serverPortalRest =
    "http://jpsselgis.selangor.gov.my/portal/sharing/rest";
  esriConfig.portalUrl = serverPortalRest;

  const ringsParse = JSON.parse(rings);

  const polygon = new Polygon({
    rings: ringsParse,
    spatialReference: { wkid: 4326 }, // Ensure correct spatial reference
  });

  const centroid = polygon.extent.center;

  const centroidWGS84 = webMercatorUtils.webMercatorToGeographic(centroid);
  const centroidWGS84Json = centroidWGS84.toJSON();

  const centerX = centroidWGS84Json.x;
  const centerY = centroidWGS84Json.y;
  console.log("CenterX : ", centerX);
  console.log("CenterY", centerY);

  const ringsWGS84 = polygon.rings.map((ring) =>
    ring.map((coords) => {
      const pointWebMercator = new Point({
        x: coords[0],
        y: coords[1],
        spatialReference: { wkid: 3857 },
      });
      const pointWGS84 = webMercatorUtils.webMercatorToGeographic(
        pointWebMercator
      ) as Point;
      return [pointWGS84.x, pointWGS84.y];
    })
  );

  useEffect(() => {
    if (!mapDiv.current) return;

    const graphicLayer = new GraphicsLayer({
      title: "Sketch Layer",
    });

    const webMap = new WebMap({
      portalItem: {
        id: "9872a1ce1563482187ded7301adbc1a5",
      },
    });

    // Add graphicLayer to the map's operational layers
    webMap.add(graphicLayer);

    const view = new MapView({
      container: mapDiv.current,
      map: webMap,
      center: [centerX, centerY],
      zoom: 18,
      constraints: {
        minZoom: 18, // Set min and max zoom to the same value to disable zooming
        maxZoom: 18,
        snapToZoom: false, // Disable snapping to zoom levels
        rotationEnabled: false,
      },
      navigation: {
        gamepad: {
          enabled: false,
        },
        browserTouchPanEnabled: false,
        momentumEnabled: false,
        mouseWheelZoomEnabled: false,
      },
    });

    view.on("drag", function (event) {
      // prevents panning with the mouse drag event
      event.stopPropagation();
    });

    view
      .when(() => {
        console.log("Map is ready");

        const layerList = new LayerList({
          view: view,
        });

        const layerListExpand = new Expand({
          expandIconClass: "esri-icon-layers",
          expandTooltip: "LayerList",
          view: view,
          expanded: false,
          content: layerList,
          group: "expandable-widgets",
        });
        // Add the LayerList to the top-right corner of the view
        view.ui.add(layerListExpand, "top-right");

        const polygonWGS84 = new Polygon({
          rings: ringsWGS84,
          spatialReference: { wkid: 4326 },
        });

        // Define the fill symbol for the polygon
        const polygonSymbol = {
          type: "simple-fill",
          color: [51, 51, 204, 0.5], // semi-transparent blue
          outline: {
            color: [255, 255, 255], // white outline
            width: 1,
          },
        };

        // Create the polygon graphic
        const polygonGraphic = new Graphic({
          geometry: polygonWGS84,
          symbol: polygonSymbol,
        });

        // Add the polygon graphic to the graphics layer
        graphicLayer.add(polygonGraphic);

        // Add a text symbol at the centroid
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

        const textGraphic = new Graphic({
          geometry: centroid,
          symbol: textSymbol,
        });

        graphicLayer.add(textGraphic);


        setCiptaUlasanForm({
          lotNumber: lot, // Keep this empty initially
          daerah: "", // Assuming daerah is set elsewhere
          mukim: "", // Assuming mukim is set elsewhere
          kordinatX: centerX,
          kordinatY: centerY,
          tajukProjek: "", // Assuming tajukProjek is set elsewhere
          jenisPermohonan: "", // Assuming jenisPermohonan is set elsewhere
          noFail: "", // Assuming noFail is set elsewhere
          status: "", // Assuming status is set elsewhere
          bahagian: "", // Assuming bahagian is set elsewhere
          ulasan: "", // Assuming ulasan is set elsewhere
          folderPath: [], // Assuming folderPath is set elsewhere
          rings: ringsWGS84,
          tajukSurat: "",
          tarikhUlasan: new Date()
        });
      })
      .catch((error) => {
        console.log("Error initializing map: ", error);
      });

    // Cleanup function to destroy the view on component unmount
    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []); // Removed dependency array since no props are used

  return <div ref={mapDiv} style={{ height: "100%", width: "100%" }} />;
};

export default MapComponentLot;
