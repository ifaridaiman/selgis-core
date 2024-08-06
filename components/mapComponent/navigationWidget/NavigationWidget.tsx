"use client";
import React, { useEffect, useRef } from "react";
import Home from "@arcgis/core/widgets/Home";
import Zoom from "@arcgis/core/widgets/Zoom";
import MapView from "@arcgis/core/views/MapView";

interface NavigationWidgetProps {
    mapView: MapView;
}

const NavigationWidget: React.FC<NavigationWidgetProps> = ({ mapView }) => {
    const homeWidgetRef = useRef<Home | null>(null);
    const zoomWidgetRef = useRef<Zoom | null>(null);

    useEffect(() => {
        if (!homeWidgetRef.current && mapView) {
            homeWidgetRef.current = new Home({
                view: mapView,
            });
            // mapView.ui.add(homeWidgetRef.current, "top-left");
        }

        if (!zoomWidgetRef.current && mapView) {
            zoomWidgetRef.current = new Zoom({
                view: mapView,
            });
            // mapView.ui.add(zoomWidgetRef.current, "top-left");
        }
    }, [mapView]);

    return null;
};

export default NavigationWidget;
