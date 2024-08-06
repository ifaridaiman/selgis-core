import React, { useEffect, useRef } from 'react'
import Basemap from '@arcgis/core/Basemap'
import MapView from '@arcgis/core/views/MapView'

type BasemapWidgetProps = {
    mapView: MapView
}

const BasemapWidget:React.FC<BasemapWidgetProps> = ({mapView}) => {

    const baseMapDiv  = useRef<Basemap | null>(null)

    useEffect(() => {
        if (!baseMapDiv.current && mapView) {
            baseMapDiv.current = new Basemap({
                baseLayers: [
                    {
                        url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer'
                    }
                ]
            })
            mapView.map.basemap = baseMapDiv.current
        }
    },[mapView])
  return null
}

export default BasemapWidget