import React, { useRef, useEffect } from "react";
import MapView from "@arcgis/core/views/MapView";
import Search from "@arcgis/core/widgets/Search";
import Expand from "@arcgis/core/widgets/Expand";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";

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

      const searchExpand = new Expand({
        expandIconClass: "esri-icon-search",
        expandTooltip: "Search by Coordinate",
        view: mapView,
        expanded: false,
        content: searchWidgetRef.current,
        group: "expandable-widgets",
      });

      searchExpand.watch("expanded", (isExpanded) => {
        if (isExpanded) {
            if (searchWidgetRef.current) {
                
            }
        } else {
            searchWidgetRef.current?.clear(); // Optional: Clear any active measurements
        }
    });
      mapView.ui.add(searchExpand, "top-right");
    }
  }, [mapView]);

  return null;
};

export default SearchCoordinate;
