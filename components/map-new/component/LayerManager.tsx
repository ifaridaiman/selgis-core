import { useEffect } from 'react';
import MapView from '@arcgis/core/views/MapView';

interface LayerManagerProps {
  view: MapView;
}

const LayerManager = ({ view }: LayerManagerProps) => {
  useEffect(() => {
    const layers = view.map.allLayers;

    // Example: Logging all layers
    layers.forEach((layer) => {
      console.log('Layer found:', layer.title);
    });

    return () => {
      // Any cleanup logic if necessary
    };
  }, [view]);

  return null;
};

export default LayerManager;
