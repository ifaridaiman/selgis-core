"use client";
import React, { useEffect } from "react";
import { featureLayerDistricts, semenanjungFS } from "@/components/mapComponent/featureLayer/featureLayers";
import MapView from "@arcgis/core/views/MapView";  // Corrected import

interface SearchWidgetProps {
    mapView: MapView;
}

const SearchWidget: React.FC<SearchWidgetProps> = ({ mapView }) => {
    useEffect(() => {
        const initializeSearch = async () => {
            const { default: Search } = await import("@arcgis/core/widgets/Search");

            const search = new Search({
                view: mapView,
                includeDefaultSources: false,
                container: "searchDiv",
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

            // mapView.ui.add(search, "top-right");
        };

        if (mapView) {
            initializeSearch();
        }
    }, [mapView]);

    return <div id="searchDiv"></div>;
};

export default SearchWidget;
