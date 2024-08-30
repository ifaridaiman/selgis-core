import { useState } from "react";

type Mukim = {
    label: string;
    value: string;
    geom: any; // Replace `any` with the appropriate geometry type if known
};

const useMukimSelect = (featureMukimLayer: any) => {
    const [arrValueMukim, setArrValueMukim] = useState<Mukim[]>([]);
  
    const getMukimSelect = async (district: string) => {
      let layer = featureMukimLayer;
      let arrValue: Mukim[] = [];
  
      try {
        var query = layer.createQuery();
        query.where = `Lower(district) = Lower('${district}')`;
        query.outFields = ["Mukim"];
  
        const response = await layer.queryFeatures(query);
  
        response.features.forEach((element: any) => {
          let mukim = element.attributes.Mukim;
          let geom = element.geometry;
          if (!arrValue.some(e => e.label === mukim)) {
            arrValue.push({ label: mukim, value: mukim, geom: geom });
          }
        });
  
        setArrValueMukim(arrValue); // Update the state with the new list of Mukims
  
        // If you need to perform additional actions like generating a list, do it here
        generateListMukim(arrValue); // Ensure this function is defined or passed as a prop
  
      } catch (error) {
        console.error('Error querying MUKIM features:', error);
      }
    };
    
    const generateListMukim = (arrValue: Mukim[]) => {
        const doc = document.getElementById("dropdownMukim");
        if (doc) {
          let innerHTML = "";
          arrValue.forEach(element => {
            innerHTML += `<a class="dropdown-item" href="javascript:zoomToMukim('${element.value}');">${element.label}</a>`;
          });
          doc.innerHTML = innerHTML;
        }
    
      };
  
    return {
      arrValueMukim,
      getMukimSelect,
    };
  };

 
  
  export default useMukimSelect;