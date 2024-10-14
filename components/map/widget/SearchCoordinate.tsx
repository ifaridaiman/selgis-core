import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import Expand from "@arcgis/core/widgets/Expand";
import Point from "@arcgis/core/geometry/Point";

type SearchProps = {
  mapView: MapView;
};

const SearchCoordinate: React.FC<SearchProps> = ({ mapView }) => {
  const searchWidgetRef = useRef<Search | null>(null);

  useEffect(() => {
    if (!searchWidgetRef.current && mapView) {
      searchWidgetRef.current = new Search({
        view: mapView,
        allPlaceholder: "Search by coordinates (e.g., 101.6869, 3.139)",
        includeDefaultSources: false,
      });

      // Create the div to hold the input fields and button
      const expandContent = document.createElement("div");
      expandContent.style.padding = "10px";
      expandContent.style.height = "100%";
      expandContent.style.width = "100%";
      expandContent.style.backgroundColor = "white";
      expandContent.style.borderRadius = "5px";

      // Create input fields for longitude and latitude
      const longitudeInput = document.createElement("input");
      longitudeInput.type = "text";
      longitudeInput.placeholder = "Longitude";
      longitudeInput.style.marginRight = "5px";
      longitudeInput.style.padding = "2px 5px";
      longitudeInput.style.border = "1px solid #ccc";
      longitudeInput.style.marginBottom = "5px";
      longitudeInput.style.borderRadius = "5px";

      const latitudeInput = document.createElement("input");
      latitudeInput.type = "text";
      latitudeInput.placeholder = "Latitude";
      latitudeInput.style.marginRight = "5px";
      latitudeInput.style.padding = "2px 5px";
      latitudeInput.style.border = "1px solid #ccc";
      latitudeInput.style.marginBottom = "5px";
      latitudeInput.style.borderRadius = "5px";

      // Create search button
      const searchButton = document.createElement("button");
      searchButton.innerHTML = "Search";
      searchButton.style.padding = "2px 5px";
      searchButton.style.border = "1px solid #ccc";
      searchButton.style.backgroundColor = "#f4f4f4";
      searchButton.style.borderRadius = "5px";

      // Append inputs and button to the expand content
      expandContent.appendChild(longitudeInput);
      expandContent.appendChild(latitudeInput);
      expandContent.appendChild(searchButton);

      // Handle search button click
      searchButton.addEventListener("click", () => {
        const lon = parseFloat(longitudeInput.value);
        const lat = parseFloat(latitudeInput.value);

        // Check if the values are valid numbers
        if (!isNaN(lon) && !isNaN(lat)) {
          const point = new Point( {
            longitude: lon,
            latitude: lat,
          });

          // Pan the map to the specified point
          mapView.goTo({
            target: point,
            zoom: 15, // Adjust zoom level if needed
          }).catch((error) => {
            console.error("Error navigating to coordinates:", error);
          });
        } else {
          alert("Please enter valid numeric coordinates.");
        }
      });

      // Create the Expand widget for the search functionality
      const searchExpand = new Expand({
        expandIconClass: "esri-icon-search",
        expandTooltip: "Search by Coordinate",
        view: mapView,
        expanded: false,
        content: expandContent, // Set the content to the div with inputs and button
        group: "expandable-widgets",
      });

      mapView.ui.add(searchExpand, "top-right");

      // Optionally clear the search when collapsed
      searchExpand.watch("expanded", (isExpanded) => {
        if (!isExpanded) {
          searchWidgetRef.current?.clear();
        }
      });
    }
  }, [mapView]);

  return null;
};

export default SearchCoordinate;
