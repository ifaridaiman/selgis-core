import MapView from '@arcgis/core/views/MapView'
import Measurement from '@arcgis/core/widgets/Measurement'
import React, { useEffect, useRef } from 'react'
import Expand from '@arcgis/core/widgets/Expand'

type MeasureWidgetProps = {
    mapView:MapView
}

const MeasureWidget:React.FC<MeasureWidgetProps> = ({mapView}) => {
    const measureDiv = useRef<Measurement | null>(null)

    useEffect(() => {
        if (!measureDiv.current && mapView) {
            measureDiv.current = new Measurement({
                view: mapView,
            })

            const measureExpand = new Expand({
                expandIconClass: "esri-icon-measure-line",
                expandTooltip: "measure-line",
                view: mapView,
                expanded: false,
                content: measureDiv.current,
                group: "expandable-widgets"
            });

            measureExpand.watch("expanded", (isExpanded) => {
                if (isExpanded) {
                    if (measureDiv.current) {
                        measureDiv.current.activeTool = 'distance'; // Activate the distance tool on expansion
                    }
                } else {
                    measureDiv.current?.clear(); // Optional: Clear any active measurements
                }
            });
            mapView.ui.add(measureExpand, 'top-left')
        }
    },[mapView])

  return null;
}

export default MeasureWidget