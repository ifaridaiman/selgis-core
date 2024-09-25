import React, { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { lotAttributes, useMapContext } from "../MapContext";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

type WebMapWidgetProps = {
  mapData: Array<{
    title: string;
    id: string;
    isEditing?: boolean;
    isExtent?: boolean;
  }>;
  onMapViewReady: (mapView: MapView) => void;
};

const WebMapWidget: React.FC<WebMapWidgetProps> = ({
  mapData,
  onMapViewReady,
}) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const portalEditingID: string[] = [];
  let portalExtentID: string | null = null;
  const allGroupLayer: GroupLayer[] = [];
  let countLayerLoad = 0;
  let countFeatAdd = 0;
  let mapImagePortalExtent: any = null;

  // Set custom portal URL
  const serverPortalRest =
    "http://jpsselgis.selangor.gov.my/portal/sharing/rest";
  esriConfig.portalUrl = serverPortalRest;

  const {
    setListOfMukim,
    listOfLot,
    setListOfLot,
    listOfDaerah,
    listOfMukim,
    setListOfDaerah,
    graphicLayer,
    setMapView
  } = useMapContext();

  const webMap = new WebMap({
    basemap: "satellite",
  });

  const checkIsAllLayerLoad = () => {
    console.log("Checking if all layers are loaded");
  };

  const checkIsFeatLoaded = () => {
    console.log("Checking if feature layers are loaded");
  };

  const addToFeatService = (item: any) => {
    console.log("Adding to feature service", item);
  };

  const symbolGraphicCarian = {
    type: "simple-fill", // autocasts as new SimpleFillSymbol()
    color: [128, 10, 204, 0.5],
    style: "solid",
    outline: {
      // autocasts as new SimpleLineSymbol()
      color: "gray",
      width: 1,
    },
  };

  const lotLayer = new FeatureLayer({
    source: listOfLot, // array of graphics objects
    objectIdField: "OBJECTID",
    fields: [
      {
        name: "OBJECTID",
        type: "oid",
      },
      {
        name: "Lot No",
        type: "string",
      },
      {
        name: "Daerah",
        type: "string",
      },
      {
        name: "Mukim",
        type: "string",
      },
    ],
  });

  const loadLayerFromPortal = () => {
    checkIsAllLayerLoad();
    mapData.forEach((element) => {
      const portalWebMap = new WebMap({
        portalItem: {
          id: element.id,
        },
      });

      if (element.isEditing) {
        portalEditingID.push(element.id);
      }
      if (element.isExtent) {
        portalExtentID = element.id;
      }

      portalWebMap.load().then((evt) => {
        if (evt.allLayers) {
          let mySubLayers: any[] = [];
          let isNoMapImage = false;
          evt.allLayers.items.forEach((item: any, index: any) => {
            if (item.type === "map-image") {
              if (portalEditingID.includes(evt.portalItem.id)) {
                countFeatAdd += 1;
                addToFeatService(item);
              }
              mySubLayers.push(item);
              if (evt.portalItem.id === portalExtentID) {
                mapImagePortalExtent = item;
              }
            } else if (index === 0) {
              isNoMapImage = true;
              mySubLayers.push(item);
            } else if (isNoMapImage) {
              mySubLayers.push(item);
            }
          });

          if (portalEditingID.length > 0) {
            checkIsFeatLoaded();
          }

          const groupLayer = new GroupLayer({
            title: element.title,
            layers: mySubLayers,
          });

          allGroupLayer.push(groupLayer);
          countLayerLoad += 1;
          webMap.add(groupLayer);
        }
      });
    });
  };

  const queryLotKadasterLayer = async () => {
    try {
      // Find the GroupLayer for Lot Kadaster
      const lotKadasterLayer = allGroupLayer.find(
        (layer) => layer.title === "Lot Kadaster"
      );

      if (!lotKadasterLayer) {
        console.error("Lot Kadaster layer not found");
        return;
      }

      let lotListing = [];
      let daerahListing = [];
      let mukimsListing = [];

      // Iterate through all sublayers and query each one
      for (let i = 0; i < lotKadasterLayer.layers.length; i++) {
        const featureLayer = lotKadasterLayer.layers.getItemAt(
          i
        ) as FeatureLayer;

        if (!featureLayer) {
          console.error(
            `FeatureLayer not found within Lot Kadaster layer at index ${i}`
          );
          continue;
        }

        const resultLotList = await featureLayer.queryFeatures({
          where: "1=1", // Modify this query as needed
          outFields: ["*"], // Retrieve all fields
          returnGeometry: true, // Include geometry in the results
        });

        console.log(`Results for sublayer ${i}:`, resultLotList.features);

        const lotList = resultLotList.features.map(
          (feature) => feature.attributes
        );
        console.log(`Lot List for sublayer ${i}:`, lotList);
        lotListing.push(lotList);
        // setListOfLot((prevList) => [...prevList, ...lotList]);

        const mukimLists = resultLotList.features.map(
          (feature) => feature.attributes.Nama_Mukim
        );
        const mukimListUnique = [...new Set(mukimLists)];
        console.log(`Mukim List for sublayer ${i}:`, mukimListUnique);
        mukimsListing.push(mukimListUnique);
        // setListOfMukim(prevList) => [...prevList, ...mukimListUnique];);

        const daerahLists = resultLotList.features.map(
          (feature) => feature.attributes.Nama_Daerah
        );
        const daerahListUnique = [...new Set(daerahLists)];
        console.log(`Daerah List for sublayer ${i}:`, daerahListUnique);
        daerahListing.push(daerahListUnique);
        // setListOfDaerah(prevList) => [...prevList, ...daerahListUnique]);
      }
      console.log("Lot Listing:", lotListing.flat());
      setListOfLot(lotListing.flat());
      setListOfMukim(mukimsListing.flat());
      setListOfDaerah(daerahListing.flat());
    } catch (err) {
      console.error("Error querying Lot Kadaster:", err);
    }
  };

  useEffect(() => {
    if (!mapDiv.current) return;

    const initMap = async () => {
      try {
        const view = new MapView({
          container: mapDiv.current as HTMLDivElement,
          map: webMap,
          center: [101.6869, 3.139],
          zoom: 8,
        });

        view
          .when(async () => {
            console.log("Map is ready");

            setMapView(view);
            await loadLayerFromPortal(); // Load layers from portal when the map is ready


            onMapViewReady(view);

            setTimeout(queryLotKadasterLayer, 2000);

            view.map.add(graphicLayer);
            // Query the Lot Kadaster layer
          })
          .catch((error) => {
            console.log("Error initializing map: ", error);
          });

        // view.map.allLayers.on("change", (event) => {
        //   if (event.added.length > 6) {
        //     console.log("Ape ni", event.added[0].title);
            
        //   }
        // });
      } catch (err) {
        console.error("Error loading map: ", err);
      }
    };

    initMap();
  }, [mapDiv]);

  return <div ref={mapDiv} style={{ height: "100%" }} />;
};

export default WebMapWidget;
