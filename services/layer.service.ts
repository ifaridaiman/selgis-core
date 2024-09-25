import WebMap from '@arcgis/core/WebMap';

export const loadWebMap = () => {
  return new WebMap({
    portalItem: {
      id: 'c71e8e3c14b74f3483a4eaf3005e6a9a',
    },
  });
};
