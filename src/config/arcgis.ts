import * as maps from "flagwind-map";
const isInHome = true;
const arcgisSetting: maps.default.EsriSetting = {
    arcgisApi: isInHome
        ? "https://js.arcgis.com/3.25/"
        : "http://120.202.26.100:8081/arcgis4js/library/3.21/",
    routeUrl:
        "http://120.202.26.100:6080/arcgis/rest/services/Features/NAServer/Route",
    center: [118.573, 37.446],
    wkid: 4326,
    wkidFromApp: 4326,
    zoom: 3,
    slider: false,
    tiledUrls: isInHome ? [] : [
              {
                  id: "base_arcgis_tiled",
                  url:
                      "http://120.202.26.100:6080/arcgis/rest/services/dongying_dark/MapServer",
                  title: "瓦片图层"
              }
          ],
    baseUrl: "",
    extent: null,
    basemap: isInHome ? "oceans" : "",
    units: null,
    minZoom: isInHome ? undefined : 0,
    maxZoom: isInHome ? undefined : 8,
    logo: false,
    sliderPosition: "bottom-left"
};
export default arcgisSetting;
