import { loadScript, loadModules, loadCss } from "esri-loader";

declare let dojo: any;
declare let dojox: any;
declare let esri: any;

export default class MapLoader {

    public static loadCss(setting: any) {
        loadCss(`${setting.arcgisApi}esri/css/esri.css`);
        loadCss(`${setting.arcgisApi}dijit/themes/claro/claro.css`);
    }

    public static loadScript(setting: any) {
        const options = {
            url: `${setting.arcgisApi}init.js`
        };
        return loadScript(options);
    }

    public static loadModules(): Promise<any> {
        const options = {
            dojoConfig: {
                async: true,
                packages: [
                    {
                        location: "./static/esri/layers",
                        name: "extras"
                    }
                ]
            }
        };
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

                "esri/geometry/geometryEngine",
                "esri/renderers/ClassBreaksRenderer",

                "esri/map",
                "esri/toolbars/draw",
                "esri/toolbars/edit",
                "esri/SpatialReference",
                "esri/Color",
                "esri/units",
                "esri/layers/ArcGISImageServiceLayer",
                "esri/layers/GraphicsLayer",
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

                // "./static/lib/heatmap.js"
            ],
            options
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
                if (!esri.geometry.geometryEngine) {
                    esri.geometry.geometryEngine = geometryEngine;
                }
                // (<any>window).HeatmapLayer =  esri.layers.HeatmapLayer = heatmapLayer;
            }
        );
    }
}
