'use client'
import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import LayerList from "@arcgis/core/widgets/LayerList";
import Expand from "@arcgis/core/widgets/Expand";
type LayerListProps = {
    mapView: MapView;
};

const LayerListWidget:React.FC<LayerListProps> = ({mapView}) => {
    const layerListRef = useRef<LayerList | null>(null);

    

    useEffect(() => {
        if(!layerListRef.current && mapView){
            layerListRef.current = new LayerList({
                view: mapView,
            });

            const layerListExpand = new Expand({
                expandIconClass: "esri-icon-layers",
                expandTooltip: "LayerList",
                view: mapView,
                expanded: false,
                content: layerListRef.current,
                group: "expandable-widgets"
            });
            mapView.ui.add(layerListExpand, "top-left");
        }
    }, [mapView]);
    
    return null;
}

export default LayerListWidget