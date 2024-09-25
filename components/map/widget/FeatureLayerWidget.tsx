'use client'
import React, { useEffect, useRef } from "react";
import MapView from "@arcgis/core/views/MapView";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

type FeatureLayerProps = {
    mapView: MapView;
    mapData: Array<{ title: string, id: string }>;
};


const FeatureLayerWidget:React.FC<FeatureLayerProps> = ({mapView,mapData}) => {

    const FeatureLayerRef = useRef<FeatureLayer | null>(null);

    useEffect(() => {
        if (!FeatureLayerRef.current && mapView) {
            mapData.forEach((layer: any) => {
                console.log(layer);
                const featureLayer = new FeatureLayer({
                    url: `http://jpsselgis.selangor.gov.my/portal/sharing/rest/services/${layer.id}/FeatureServer/0`,
                    title: layer.title,
                });
                console.log("feature layer created", featureLayer.title);
                mapView.map.add(featureLayer);
            });
        }
    }, [mapView,mapData]);

    return null;
};

export default FeatureLayerWidget;