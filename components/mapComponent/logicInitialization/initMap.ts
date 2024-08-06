import TileLayer from "@arcgis/core/layers/TileLayer";
import Swipe from "@arcgis/core/widgets/Swipe";
import Measurement from "@arcgis/core/widgets/Measurement";
import IdentityManager from "@arcgis/core/identity/IdentityManager";
// import { oauthinfo } from "@/middleware/authMiddleware";
import { mapView, webmap } from "@/components/mapComponent/mapComponent";
let leadLayer: TileLayer;
let trailLayer: TileLayer;

const noop = () => {};

export const initialize = (
  container: HTMLDivElement,
  primaryUrl: string,
  secondaryUrl: string,
  mapType: string
) => {
  // IdentityManager.checkSignInStatus(oauthinfo.portalUrl + "/sharing")
  //   .then(() => {
  //     setupMap(container, mapType, primaryUrl, secondaryUrl);
  //   })
  //   .catch(() => {
  //     IdentityManager.getCredential(oauthinfo.portalUrl + "/sharing").then(
  //       () => {
  //         setupMap(container, mapType, primaryUrl, secondaryUrl);
  //       }
  //     );
  //   });
};

const setupMap = (
  container: HTMLDivElement,
  mapType: string,
  primaryUrl: string,
  secondaryUrl: string
) => {
  leadLayer = new TileLayer({
    url: primaryUrl
  });
  trailLayer = new TileLayer({
    url: secondaryUrl
  });

  const swipe = new Swipe({
    leadingLayers: [leadLayer],
    trailingLayers: [trailLayer],
    position: 35,
    view: mapView!
  });

  mapView!.container = container;

  mapView!
    .when()
    .then(() => {
      const measurement = new Measurement({
        view: mapView!,
        activeTool: "distance"
      });

      if (mapType === "swipe") {
        mapView!.ui.add(swipe);
      } else {
        mapView!.ui.remove(swipe);
      }

      webmap.removeAll();
      webmap.add(trailLayer);
      webmap.add(leadLayer);

      mapView!.ui.add(measurement, "top-right");
    })
    .catch((error) => {
      console.error("Error setting up map:", error);
      noop();
    });

  return () => {
    (mapView!.container as unknown as HTMLDivElement | null) = null;
  };
};
