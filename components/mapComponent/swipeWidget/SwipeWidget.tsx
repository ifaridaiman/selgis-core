"use client";
import React, { useEffect, useRef } from "react";
import Swipe from "@arcgis/core/widgets/Swipe";
import MapView from "@arcgis/core/views/MapView";
import TileLayer from "@arcgis/core/layers/TileLayer";

interface SwipeWidgetProps {
    mapView: MapView;
}

const SwipeWidget: React.FC<SwipeWidgetProps> = ({ mapView }) => {
    const swipeWidgetRef = useRef<Swipe | null>(null);

    useEffect(() => {
        if (!swipeWidgetRef.current && mapView) {
            const leadLayer = new TileLayer({
                url: "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/WV03_Kilauea_20180519_ShortwaveInfrared/MapServer",
                maxScale: 3000
            });

            const trailLayer = new TileLayer({
                url: "https://tiles.arcgis.com/tiles/P3ePLMYs2RVChkJx/arcgis/rest/services/WV03_Kilauea_20180519_NearInfrared/MapServer",
                maxScale: 3000
            });

            swipeWidgetRef.current = new Swipe({
                leadingLayers: [leadLayer],
                trailingLayers: [trailLayer],
                position: 35,
                view: mapView
            });

            mapView.map.addMany([leadLayer, trailLayer]);
            mapView.ui.add(swipeWidgetRef.current);
        }
    }, [mapView]);

    return null;
};

export default SwipeWidget;
