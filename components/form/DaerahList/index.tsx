import { useMapContext } from "@/components/map/MapContext";
import React, { useEffect, useState } from "react";

type DaerahListProps = {};

const DaerahList: React.FC<DaerahListProps> = () => {
  const { mapView } = useMapContext();
  const [daerahOptions, setDaerahOptions] = useState<
    Array<{ label: string; value: string }>
  >([]);

  useEffect(() => {
    // if (mapView) {
    //     const layers = mapView.map?.layers?.items; // safer access to layers
        
    //     if (layers && layers.length > 0) {
    //         layers.forEach((element) => {
    //           console.log({ type: element.type, item: element });
    //         });
    //       }
      
    // }
  }, [mapView]);
  return (
    <select>
      <option value="">Select Daerah</option>
      
    </select>
  );
};

export default DaerahList;
