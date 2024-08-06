"use client";
import React, { useEffect, useRef, useState } from "react";
import esriConfig from "@arcgis/core/config";
import { oauthinfo, authMiddleware } from "@/middleware/authMiddleware";
import { featureLayerDistricts, mapSheetLayer, semenanjungFS } from "@/app/_components/mapComponent/featureLayer/featureLayers";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
import dynamic from "next/dynamic";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const SearchWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/searchWidget/SearchWidget"), { ssr: false });
const HomeWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/homeWidget/HomeWidget"), { ssr: false });
const LayerListWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/layerListWidget/LayerListWidget"), { ssr: false });
const NavigationWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/navigationWidget/NavigationWidget"), { ssr: false });
const MeasurementWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/measurementWidget/MeasurementWidget"), { ssr: false });
const SwipeWidget = dynamic<{ mapView: MapView }>(() => import("@/app/_components/mapComponent/swipeWidget/swipeWidget"), { ssr: false });

esriConfig.portalUrl = "https://psdev.esrimy.com/portal";

export let mapView: MapView | null = null; // Updated to export mapView
export const webmap = new WebMap({
    portalItem: {
        id: "fe4c7f637d2843f4bd5c61430a800031", // Ensure this is the correct WebMap ID
    },
});

const MapComponent = () => {
    const mapDiv = useRef<HTMLDivElement>(null);
    const [view, setView] = useState<MapView | null>(null);
    const widgetsInitializedRef = useRef<boolean>(false); // Track if widgets are initialized

    useEffect(() => {
          

        const initializeMap = async () => {
            try {
                const userInfo = await authMiddleware();

                if (userInfo && !mapView) {
                    mapView = new MapView({
                        container: mapDiv.current as HTMLDivElement,
                        map: webmap,
                        center: [101.6869, 3.139],
                        zoom: 13,
                    });

                    mapView.when(async () => {
                        console.log("MapView is ready");
                        mapSheetLayer.opacity = 0.5; // Opacity fixation 
                        mapView!.map.add(mapSheetLayer);
                        setView(mapView);

                        if (!widgetsInitializedRef.current) {
                            // Dynamically import ArcGIS widgets
                            const [Home, LayerList, Expand, Measurement, Search] = await Promise.all([
                                import("@arcgis/core/widgets/Home"),
                                import("@arcgis/core/widgets/LayerList"),
                                import("@arcgis/core/widgets/Expand"),
                                import("@arcgis/core/widgets/Measurement"),
                                import("@arcgis/core/widgets/Search")
                            ]);

                            // Initialize and add widgets
                            const homeWidget = new Home.default({ view: mapView! });
                            const layerList = new LayerList.default({ view: mapView! });
                            const layerListExpand = new Expand.default({
                                expandIcon: "layers",
                                view: mapView!,
                                content: layerList,
                            });
                            const measurement = new Measurement.default({
                                view: mapView!,
                                activeTool: "distance",
                            });

                            const searchWidget = new Search.default({
                                view: mapView!,
                                includeDefaultSources: false,
                                sources: [
                                    {
                                        layer: featureLayerDistricts,
                                        searchFields: ["LEMBAR"],
                                        displayField: "LEMBAR",
                                        exactMatch: false,
                                        outFields: ["*"],
                                        name: "Borneo",
                                        placeholder: "example: BW41064",
                                    },
                                    {
                                        layer: semenanjungFS,
                                        searchFields: ["NAM"],
                                        displayField: "NAM",
                                        exactMatch: false,
                                        outFields: ["*"],
                                        name: "Semenanjung",
                                        placeholder: "example: FN14183",
                                    },
                                ] as any,
                            });

                            mapView!.ui.add(homeWidget, "top-left");
                            mapView!.ui.add(layerListExpand, "top-left");
                            mapView!.ui.add(measurement, "top-right");
                            mapView!.ui.add(searchWidget, "top-right");

                            widgetsInitializedRef.current = true; // Mark widgets as initialized
                        }
                    }).catch((error) => {
                        console.error("Error initializing MapView:", error);
                    });
                } else if (!userInfo) {
                    console.error("User is not authenticated");
                }
            } catch (error) {
                console.error("Error during map initialization:", error);
            }
        };

        initializeMap();

        return () => {
            if (mapView) {
                mapView.destroy();
                mapView = null;
            }
        };
    }, [mapDiv]);

    return (
        <><div style={{
            position: "relative", height: "96vh", width: "98vw", marginLeft: "-15px"
        }}>


            {view && (
                <SwipeWidget mapView={view} />
            )}
        </div><div ref={mapDiv} style={{ height: "100%", padding: "10px" }}>
                {view && (
                    <>
                        <SearchWidget mapView={view} />
                        <HomeWidget mapView={view} />
                        <LayerListWidget mapView={view} />
                        <NavigationWidget mapView={view} />
                        <MeasurementWidget mapView={view} />
                    </>
                )}
            </div></>
    );
};

export default MapComponent;
