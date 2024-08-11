import React, { useRef, useEffect, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import Sketch from '@arcgis/core/widgets/Sketch.js';
import Expand from '@arcgis/core/widgets/Expand';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import TextSymbol from '@arcgis/core/symbols/TextSymbol';
import Point from '@arcgis/core/geometry/Point';

type DrawWidgetProps = {
  mapView: MapView;
};

const DrawWidget: React.FC<DrawWidgetProps> = ({ mapView }) => {
  const drawDiv = useRef<Sketch | null>(null);
  const graphicLayer = new GraphicsLayer();
  const [editingGraphic, setEditingGraphic] = useState<Graphic | null>(null);

  useEffect(() => {
    if (!drawDiv.current && mapView) {
      mapView.map.add(graphicLayer);

      drawDiv.current = new Sketch({
        view: mapView,
        layer: graphicLayer,
        tooltipOptions: {},
        availableCreateTools: ['polygon', 'point'],
      });

      drawDiv.current.on('create', (event) => {
        if (event.state === 'complete' && event.graphic.geometry.type === 'polygon') {
          // Calculate the centroid of the polygon
          const centroid = event.graphic.geometry.extent.center;

          // Create a text symbol to label the polygon
          const textSymbol = new TextSymbol({
            text: 'Click to Edit Label', // Default label text
            color: 'black',
            haloColor: 'white',
            haloSize: '1px',
            font: {
              size: 12,
              family: 'sans-serif',
            },
          });

          // Create a graphic for the label and add it to the graphic layer
          const labelGraphic = new Graphic({
            geometry: centroid,
            symbol: textSymbol,
            attributes: {
              label: 'Click to Edit Label', // Store the label text in attributes for easy access
            },
          });

          graphicLayer.add(labelGraphic);

          // Log the polygon's geometry and rings to the console
          const polygon = event.graphic.geometry as __esri.Polygon;
          console.log('Polygon Drawn:', {
            geometry: polygon.toJSON(),
            rings: polygon.rings,
            centroid: centroid.toJSON(),
          });
        }
      });

      // Enable label editing on click
      mapView.on('click', (event) => {
        mapView.hitTest(event).then((response) => {
          const results = response.results;

          const graphicHit = results.find((result): result is __esri.GraphicHit => result.type === 'graphic');

          if (graphicHit && graphicHit.graphic && graphicHit.graphic.attributes?.label) {
            const newLabel = prompt('Edit label:', graphicHit.graphic.attributes.label);
            if (newLabel !== null) {
              graphicHit.graphic.symbol = new TextSymbol({
                text: newLabel,
                color: 'black',
                haloColor: 'white',
                haloSize: '1px',
                font: {
                  size: 12,
                  family: 'sans-serif',
                },
              });
              graphicHit.graphic.attributes.label = newLabel;

              console.log('Sketch Info:', {
                geometry: graphicHit.graphic.geometry.toJSON(),
                label: newLabel,
                attributes: graphicHit.graphic.attributes,
              });
            }
          }
          
        });
      });

      const drawExpand = new Expand({
        expandIconClass: 'esri-icon-polygon',
        expandTooltip: 'LayerList',
        view: mapView,
        expanded: false,
        content: drawDiv.current,
        group: 'expandable-widgets',
      });

      mapView.ui.add(drawExpand, 'top-right');
    }
  }, [mapView]);

  return null;
};

export default DrawWidget;
