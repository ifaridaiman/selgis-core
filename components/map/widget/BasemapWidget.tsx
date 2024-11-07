import React, { useEffect, useRef } from 'react'
import Basemap from '@arcgis/core/Basemap'
import MapView from '@arcgis/core/views/MapView'
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Expand from "@arcgis/core/widgets/Expand";

type BasemapWidgetProps = {
    mapView: MapView
}

const BasemapWidget:React.FC<BasemapWidgetProps> = ({mapView}) => {

    const baseMapDiv  = useRef<BasemapGallery | null>(null)

    useEffect(() => {
        if (!baseMapDiv.current && mapView) {
            baseMapDiv.current = new BasemapGallery({
                view: mapView
            })
            const baseMapExpand = new Expand({
                expandIconClass: "esri-icon-basemap",
                expandTooltip: "Basemap",
                view: mapView,
                expanded: false,
                content: baseMapDiv.current,
                group: "expandable-widgets"
            });
            mapView.ui.add(baseMapExpand, {position:"top-left",index:4});
        }
    },[mapView])
  return null
}

export default BasemapWidget