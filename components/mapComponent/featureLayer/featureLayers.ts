import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export const featureLayerDistricts = new FeatureLayer({
  url: "https://psdev.esrimy.com/gisserver/rest/services/MY701_5K/MapServer",
  popupTemplate: {
    title: "LEMBAR {LEMBAR}",
    overwriteActions: true
  }
});

export const semenanjungFS = new FeatureLayer({
  url: "https://psdev.esrimy.com/gisserver/rest/services/MY711_5K/MapServer",
  popupTemplate: {
    title: "LEMBAR {NAM}",
    overwriteActions: true
  }
});

export const mapSheetLayer = new FeatureLayer({
  url: "https://services7.arcgis.com/V7CrZmPvAESPN510/arcgis/rest/services/MY701/FeatureServer/0"
});

export const poiFS = new FeatureLayer({
  url: "https://psdev.esrimy.com/gisserver/rest/services/POI/MapServer",
  popupTemplate: {
    title: "LEMBAR {NAM}",
    overwriteActions: true
  }
});
