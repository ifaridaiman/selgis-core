import MapView from '@arcgis/core/views/MapView'
import Measurement from '@arcgis/core/widgets/Measurement'
import React, { useEffect, useRef } from 'react'

type MeasureWidgetProps = {
    mapView:MapView
}

const MeasureWidget:React.FC<MeasureWidgetProps> = ({mapView}) => {
    const measureDiv = useRef<Measurement | null>(null)

    useEffect(() => {
        if (!measureDiv.current && mapView) {
            measureDiv.current = new Measurement({
                view: mapView,
                activeTool: 'distance'
            })
            mapView.ui.add(measureDiv.current, 'bottom-right')
        }
    },[mapView])

  return null;
}

export default MeasureWidget