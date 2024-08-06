"use client";
import React, { useEffect, useRef } from "react";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
import MapView from "@arcgis/core/views/MapView";

interface LayerListWidgetProps {
    mapView: MapView;
}

const LayerListWidget: React.FC<LayerListWidgetProps> = ({ mapView }) => {
    const layerListWidgetRef = useRef<Expand | null>(null);

    useEffect(() => {
        if (!layerListWidgetRef.current && mapView) {
            const layerList = new LayerList({
                view: mapView,
            });
            layerListWidgetRef.current = new Expand({
                expandIcon: "layers",
                view: mapView,
                content: layerList,
            });
            // mapView.ui.add(layerListWidgetRef.current, "top-left");
        }
    }, [mapView]);

    return null;
};

export default LayerListWidget;
