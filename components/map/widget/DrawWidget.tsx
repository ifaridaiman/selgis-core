import React, { useRef, useEffect, useState } from "react";
import MapView from "@arcgis/core/views/MapView";
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Expand from "@arcgis/core/widgets/Expand";
import Graphic from "@arcgis/core/Graphic";
import TextSymbol from "@arcgis/core/symbols/TextSymbol";
import { useMapContext } from "../MapContext";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Query from "@arcgis/core/rest/support/Query";
import Point from "@arcgis/core/geometry/Point";

type DrawWidgetProps = {
  mapView: MapView;
};

const DrawWidget: React.FC<DrawWidgetProps> = ({ mapView }) => {
  const drawDiv = useRef<Sketch | null>(null);
  const ringsWGS84Ref = useRef<number[][][]>([]); // Use ref to store rings in WGS84 format
  const { graphicLayer, setCiptaUlasanForm, ciptaUlasanForm } = useMapContext();

  const currentTajukProjek = ciptaUlasanForm.tajukProjek;
  const currentTajukSurat = ciptaUlasanForm.tajukSurat;

  let kordinatX = "";
  let kordinatY = "";
  let ring: number[][][] = [];

  useEffect(() => {
    if (!drawDiv.current && mapView) {
      mapView.map.allLayers.on("change", (event) => {
        if (event.added.length > 6) {
          mapView.map.add(graphicLayer);
        }
      });

      drawDiv.current = new Sketch({
        view: mapView,
        layer: graphicLayer,
        availableCreateTools: ["polygon", "point", "polyline"],
        creationMode: "update",
      });

      drawDiv.current.on("create", async (event) => {
        if (
          event.state === "complete" &&
          event.graphic.geometry.type === "polygon"
        ) {
          console.log("Polygon Drawn:", event.graphic.geometry.toJSON());

          console.log("graphicLayer", graphicLayer);

          // Calculate the centroid of the polygon
          const centroid = event.graphic.geometry.extent.center;
          const polygon = event.graphic.geometry as __esri.Polygon;
          // const extent = polygon.extent;
          ring = polygon.rings;

          // if(polygon.spatialReference.wkid !== 4326){
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
          // s}
          ringsWGS84Ref.current = ringsWGS84;

          console.log("Centroid: ", centroid)

          // Create a text symbol to label the polygon
          const textSymbol = new TextSymbol({
            text: "Click to Edit Label", // Default label text
            color: "black",
            haloColor: "white",
            haloSize: "1px",
            font: {
              size: 12,
              family: "sans-serif",
            },
          });

          // Create a graphic for the label and add it to the graphic layer
          const labelGraphic = new Graphic({
            geometry: centroid,
            symbol: textSymbol,
            attributes: {
              label: "Click to Edit Label", // Store the label text in attributes for easy access
            },
          });

          graphicLayer.add(labelGraphic);

          // xmin = extent.xmin;
          // ymin = extent.ymin;
          // xmax = extent.xmax;
          // ymax = extent.ymax;

          if (centroid.spatialReference.wkid !== 4326) {
            const centroidWGS84 =
              webMercatorUtils.webMercatorToGeographic(centroid);
            const centroidWGS84Json = centroidWGS84.toJSON();
            console.log("Centroid WGS84:", centroidWGS84.toJSON());
            console.log("Centroid WGS84 X:", centroidWGS84Json.x);
            kordinatX = centroidWGS84Json.x;
            kordinatY = centroidWGS84Json.y;

            setCiptaUlasanForm({
              lotNumber: "", // Keep this empty initially
              daerah: "", // Assuming daerah is set elsewhere
              mukim: "", // Assuming mukim is set elsewhere
              kordinatX: kordinatX,
              kordinatY: kordinatY,
              tajukProjek: currentTajukProjek, // Assuming tajukProjek is set elsewhere
              jenisPermohonan: "", // Assuming jenisPermohonan is set elsewhere
              noFail: "", // Assuming noFail is set elsewhere
              status: "", // Assuming status is set elsewhere
              bahagian: "", // Assuming bahagian is set elsewhere
              ulasan: "", // Assuming ulasan is set elsewhere
              folderPath: [], // Assuming folderPath is set elsewhere
              rings: ringsWGS84Ref.current,
              tajukSurat: currentTajukSurat,
              tarikhUlasan: new Date(),
              namaPemohon: "",
              namaPerunding: "",
              sempadanMulaLat: "",
              sempadanMulaLong: "",
              sempadanAkhirLat: "",
              sempadanAkhirLong: "",
            });
          }

          // Log the polygon's geometry and rings to the console
          console.log("Polygon Drawn:", {
            geometry: polygon.toJSON(),
            rings: polygon.rings,
            centroid: centroid.toJSON(),
          });
        }

        if (
          event.state === "complete" &&
          event.graphic.geometry.type === "polyline"
        ) {
          console.log("Polyline has been Created");

          const polyline = event.graphic.geometry as __esri.Polyline;
          ring = polyline.paths;

          const ringsWGS84 = polyline.paths.map((ring) =>
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
          // Create a text symbol to label the polygon
          const textSymbol = new TextSymbol({
            text: "Click to Edit Label", // Default label text
            color: "black",
            haloColor: "white",
            haloSize: "1px",
            font: {
              size: 12,
              family: "sans-serif",
            },
          });

          const firstPoint = new Point({
            x: ringsWGS84[0][0][0],
            y: ringsWGS84[0][0][1],
            spatialReference: { wkid: 4326 },
          });

          // Create a graphic for the label and add it to the graphic layer
          const labelGraphic = new Graphic({
            geometry: firstPoint,
            symbol: textSymbol,
            attributes: {
              label: "Click to Edit Label", // Store the label text in attributes for easy access
            },
          });

          graphicLayer.add(labelGraphic);

          kordinatX = JSON.stringify(ringsWGS84[0][0][0])
          kordinatY = JSON.stringify(ringsWGS84[0][0][1])

          setCiptaUlasanForm({
            lotNumber: "", // Keep this empty initially
            daerah: "", // Assuming daerah is set elsewhere
            mukim: "", // Assuming mukim is set elsewhere
            kordinatX: kordinatX,
            kordinatY: kordinatY,
            tajukProjek: currentTajukProjek, // Assuming tajukProjek is set elsewhere
            jenisPermohonan: "", // Assuming jenisPermohonan is set elsewhere
            noFail: "", // Assuming noFail is set elsewhere
            status: "", // Assuming status is set elsewhere
            bahagian: "", // Assuming bahagian is set elsewhere
            ulasan: "", // Assuming ulasan is set elsewhere
            folderPath: [], // Assuming folderPath is set elsewhere
            rings: ringsWGS84Ref.current,
            tajukSurat: currentTajukSurat,
            tarikhUlasan: new Date(),
            namaPemohon: "",
            namaPerunding: "",
            sempadanMulaLat: "",
            sempadanMulaLong: "",
            sempadanAkhirLat: "",
            sempadanAkhirLong: "",
          });
        

          console.log("POLYLINE: ", ringsWGS84);
        }
      });

      // Enable label editing on click
      mapView.on("click", (event) => {
        mapView.hitTest(event).then((response) => {
          const results = response.results;

          const graphicHit = results.find(
            (result): result is __esri.GraphicHit => result.type === "graphic"
          );

          if (
            graphicHit &&
            graphicHit.graphic &&
            graphicHit.graphic.attributes?.label
          ) {
            const newLabel = prompt(
              "Edit label:",
              graphicHit.graphic.attributes.label
            );
            if (newLabel !== null) {
              graphicHit.graphic.symbol = new TextSymbol({
                text: newLabel,
                color: "black",
                haloColor: "white",
                haloSize: "1px",
                font: {
                  size: 12,
                  family: "sans-serif",
                },
              });
              graphicHit.graphic.attributes.label = newLabel;

              setCiptaUlasanForm({
                lotNumber: newLabel, // Keep this empty initially
                daerah: "", // Assuming daerah is set elsewhere
                mukim: "", // Assuming mukim is set elsewhere
                kordinatX: kordinatX,
                kordinatY: kordinatY,
                tajukProjek: currentTajukProjek, // Assuming tajukProjek is set elsewhere
                jenisPermohonan: "", // Assuming jenisPermohonan is set elsewhere
                noFail: "", // Assuming noFail is set elsewhere
                status: "", // Assuming status is set elsewhere
                bahagian: "", // Assuming bahagian is set elsewhere
                ulasan: "", // Assuming ulasan is set elsewhere
                folderPath: [], // Assuming folderPath is set elsewhere
                rings: ringsWGS84Ref.current,
                tajukSurat: currentTajukSurat,
                tarikhUlasan: new Date(),
                namaPemohon: "",
                namaPerunding: "",
                sempadanMulaLat: "",
                sempadanMulaLong: "",
                sempadanAkhirLat: "",
                sempadanAkhirLong: "",
              });

              console.log("Sketch Info:", {
                geometry: graphicHit.graphic.geometry.toJSON(),
                label: newLabel,
                attributes: graphicHit.graphic.attributes,
              });
            }
          }
        });
      });

      const drawExpand = new Expand({
        expandIconClass: "esri-icon-polygon",
        expandTooltip: "LayerList",
        view: mapView,
        expanded: false,
        content: drawDiv.current,
        group: "expandable-widgets",
      });

      mapView.ui.add(drawExpand, { position: "top-right", index: 1 });
    }
  }, [mapView]);

  return null;
};

export default DrawWidget;
