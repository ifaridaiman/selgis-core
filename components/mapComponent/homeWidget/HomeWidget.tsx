"use client";
import React, { useEffect, useRef } from "react";
import Home from "@arcgis/core/widgets/Home";
import MapView from "@arcgis/core/views/MapView";

interface HomeWidgetProps {
    mapView: MapView;
}

const HomeWidget: React.FC<HomeWidgetProps> = ({ mapView }) => {
    const homeWidgetRef = useRef<Home | null>(null);

    useEffect(() => {
        if (!homeWidgetRef.current && mapView) {
            homeWidgetRef.current = new Home({
                view: mapView,
            });
            // mapView.ui.add(homeWidgetRef.current, "top-left");
        }
    }, [mapView]);

    return null;
};

export default HomeWidget;
