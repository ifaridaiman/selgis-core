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
                activeTool: 'distance',
            })

            const measureExpand = new Expand({
                expandIconClass: "esri-icon-measure-line",
                expandTooltip: "measure-line",
                view: mapView,
                expanded: false,
                content: measureDiv.current,
                group: "expandable-widgets"
            });
            mapView.ui.add(measureExpand, 'top-left')
        }
    },[mapView])

  return null;
}

export default MeasureWidget