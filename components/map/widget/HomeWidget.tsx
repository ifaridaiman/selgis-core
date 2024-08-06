'use client'
import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import Home from "@arcgis/core/widgets/Home.js";

type HomeWidgetProps = {
    mapView: MapView;
};


const HomeWidget:React.FC<HomeWidgetProps> = ({mapView}) => {

    const homewidgetRef = useRef<Home | null>(null);

    useEffect(() => {
        if (!homewidgetRef.current && mapView) {
            homewidgetRef.current = new Home({
                view: mapView,
            });
            mapView.ui.add(homewidgetRef.current, "top-left");
        }
    }, [mapView]);

    return null;
};

export default HomeWidget;