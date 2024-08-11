import React, { useEffect, useRef } from "react";
import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import esriConfig from "@arcgis/core/config";

type WebMapWidgetProps = {
  mapData: Array<{ title: string, id: string, isEditing?: boolean, isExtent?: boolean }>;
  onMapViewReady: (mapView: MapView) => void;
};

const WebMapWidget: React.FC<WebMapWidgetProps> = ({ mapData, onMapViewReady }) => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const portalEditingID: string[] = [];
  let portalExtentID: string | null = null;
  const allGroupLayer: GroupLayer[] = [];
  let countLayerLoad = 0;
  let countFeatAdd = 0;
  let mapImagePortalExtent: any = null;

  // Set custom portal URL
  const serverPortalRest = "http://jpsselgis.selangor.gov.my/portal/sharing/rest";
  esriConfig.portalUrl = serverPortalRest;

  const webMap = new WebMap({
    basemap: "streets-navigation-vector",
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

  useEffect(() => {
    if (!mapDiv.current) return;

    const initMap = async () => {
      try {
        const mapView = new MapView({
          container: mapDiv.current as HTMLDivElement,
          map: webMap,
          center: [101.6869, 3.139],
          zoom: 8,
        });

        mapView.when(() => {
          console.log("Map is ready");
          loadLayerFromPortal(); // Load layers from portal when the map is ready
          onMapViewReady(mapView);
        }).catch((error) => {
          console.log("Error initializing map: ", error);
        });
      } catch (err) {
        console.error("Error loading map: ", err);
      }
    };

    initMap();
  }, [mapDiv]);

  return <div ref={mapDiv} style={{ height: "100%" }} />;
};

export default WebMapWidget;
