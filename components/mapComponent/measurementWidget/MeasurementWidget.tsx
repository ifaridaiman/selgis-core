"use client";
import React, { useEffect, useRef } from "react";
import Measurement from "@arcgis/core/widgets/Measurement";
import MapView from "@arcgis/core/views/MapView";

interface MeasurementWidgetProps {
    mapView: MapView;
}

const MeasurementWidget: React.FC<MeasurementWidgetProps> = ({ mapView }) => {
    const measurementWidgetRef = useRef<Measurement | null>(null);

    useEffect(() => {
        if (!measurementWidgetRef.current && mapView) {
            measurementWidgetRef.current = new Measurement({
                view: mapView,
                activeTool: "distance",
            });
            // mapView.ui.add(measurementWidgetRef.current, "top-right");
        }
    }, [mapView]);

    return null;
};

export default MeasurementWidget;
