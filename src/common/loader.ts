import { loadScript, loadModules, loadCss } from "esri-loader";

declare let dojo: any;
declare let dojox: any;
declare let esri: any;
// declare let mapv: any;

export default class MapLoader {
    protected static options: any;
    public static loadCss(setting: any) {
        loadCss(`${setting.arcgisApi}esri/css/esri.css`);
        loadCss(`${setting.arcgisApi}dijit/themes/claro/claro.css`);
    }

    public static loadScript(setting: any) {
        let index = window.location.href.lastIndexOf(window.location.hash);
        let url = window.location.href.substr(0, index);
        if (index < 0) {
            url = window.location.origin + "/";
        }

        const options = (MapLoader.options = {
            url: `${setting.arcgisApi}init.js`,
            dojoConfig: {
                async: true,
                packages: [
                    {
                        location: url + "static/esri/layers",
                        name: "extras"
                    },
                    {
                        location: url + "static/egova",
                        name: "egova1"
                    }
                ]
            }
        });

        return loadScript(options);
    }

    public static loadModules(): Promise<any> {
        return loadModules(
            [
                "dojo/parser",
                "dojo/_base/declare",
                "dojo/_base/lang",
                "dojo/_base/array",
                "dojo/dom",
                "dojo/on",
                "dojo/fx",
                "dojox/gfx/fx",
                "dojox/gesture/tap",
                "./static/esri/layers/ClusterLayer.js",
                "./static/esri/layers/EchartsLayer.js",
                // "./static/esri/layers/OverLayer.js",

                "./static/esri/layers/CanvasLayer.js",

                "esri/geometry/geometryEngine",
                "esri/renderers/ClassBreaksRenderer",
                "esri/renderers/HeatmapRenderer",

                "esri/map",
                "esri/toolbars/draw",
                "esri/toolbars/edit",
                "esri/SpatialReference",
                "esri/Color",
                "esri/units",
                "esri/layers/ArcGISImageServiceLayer",
                "esri/layers/GraphicsLayer",
                "esri/layers/FeatureLayer",
                "esri/layers/DynamicMapServiceLayer",
                "esri/layers/ArcGISTiledMapServiceLayer",
                "esri/layers/WebTiledLayer",
                "esri/graphic",
                "esri/graphicsUtils",
                "esri/geometry/Point",
                "esri/geometry/Multipoint",
                "esri/geometry/geometryEngine",
                "esri/geometry/Polyline",
                "esri/geometry/Circle",
                "esri/geometry/geodesicUtils",
                "esri/geometry/screenUtils",
                "esri/symbols/PictureMarkerSymbol",
                "esri/symbols/SimpleLineSymbol",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/symbols/SimpleFillSymbol",
                "esri/symbols/CartographicLineSymbol",
                "esri/tasks/RouteTask",
                "esri/tasks/RouteParameters",
                "esri/tasks/FeatureSet",
                "esri/dijit/InfoWindow"
            ]
        ).then(
            ([
                parser,
                dojoBaseDeclare,
                dojoBaselang,
                dojoBaseArray,
                dojoDom,
                dojoOn,
                dojoFx,
                dojoxGfxFx,
                dojoxGestureTap,
                clusterLayer,
                echartsLayer,
      
                canvasLayer,

                geometryEngine,
                esriRenderersClassBreaksRenderer
            ]) => {
                dojo._base = {
                    declare: dojoBaseDeclare,
                    lang: dojoBaselang,
                    array: dojoBaseArray
                };
                dojo.dom = dojoDom;
                dojo.on = dojoOn;
                dojo.fx = dojoFx;
                dojox.gfx.fx = dojoxGfxFx;
                dojox.gesture = {
                    tap: dojoxGestureTap
                };
                esri.renderers = {
                    ClassBreaksRenderer: esriRenderersClassBreaksRenderer
                };
                esri.layers.ClusterLayer = clusterLayer;
                esri.layers.EchartsLayer = echartsLayer;
   
                esri.layers.CanvasLayer = canvasLayer;
                if (!esri.geometry.geometryEngine) {
                    esri.geometry.geometryEngine = geometryEngine;
                }

            }
        );
    }
}
