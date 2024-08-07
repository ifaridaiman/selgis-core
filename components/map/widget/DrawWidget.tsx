import React, { useRef,useEffect } from 'react'
import MapView from '@arcgis/core/views/MapView'
import Sketch from "@arcgis/core/widgets/Sketch.js";
import Expand from '@arcgis/core/widgets/Expand';
import GraphicLayer from '@arcgis/core/layers/GraphicsLayer'

type DrawWidgetProps = {
    mapView:MapView
}

const DrawWidget:React.FC<DrawWidgetProps> = ({mapView}) => {
    const drawDiv = useRef<Sketch | null>(null)
    const graphicLayer = new GraphicLayer();

    useEffect(() => {
      if(!drawDiv.current && mapView){
        drawDiv.current = new Sketch({
          view: mapView,
          layer: graphicLayer
        });

        const drawExpand = new Expand({
            expandIconClass: "esri-icon-polygon",
            expandTooltip: "LayerList",
            view: mapView,
            expanded: false,
            content: drawDiv.current,
            group: "expandable-widgets"
        });

        mapView.ui.add(drawExpand, 'top-right')
      }
    
      
    }, [mapView])
    
  return null;
}

export default DrawWidget