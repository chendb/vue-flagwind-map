import "./styles/index.less";

// 地图加载器
import MapLoader from "src/common/loader";

import setting from "src/config";

// 组件
import Map from "src/components/map";

import PointLayer from "src/components/layers/point-layer";
import PolygonLayer from "src/components/layers/polygon-layer";
import PolylineLayer from "src/components/layers/polyline-layer";
import EditLayer from "src/components/layers/edit-layer";
import TrackLayer from "src/components/layers/track-layer";
import HeatmapLayer from "src/components/layers/heatmap-layer";

import { SelectBoxComponent, ContextMenuComponent,InfoWindowComponent,Overlay } from "src/components/widgets";

const components = {
    "fm-map": Map,
    "fm-point-layer": PointLayer,
    "fm-polygon-layer": PolygonLayer,
    "fm-polyline-layer": PolylineLayer,
    "fm-edit-layer": EditLayer,
    "fm-track-layer": TrackLayer,
    "fm-heatmap-layer": HeatmapLayer,
    "fm-select-box": SelectBoxComponent,
    "fm-context-menu": ContextMenuComponent,
    "fm-info-window": InfoWindowComponent,
    "fm-overlay": Overlay
};

const fmap = {
    installed: false,

    // init: MapLoader.loadModules,

    // tslint:disable-next-line:variable-name
    install: (Vue: any, opts: any = {}) => {
        if (fmap.installed) {
            return;
        }

        Object.keys(components).forEach(key => {
            Vue.component(key, components[key]);
        });

        fmap.installed = true;
    }
};

export { setting, MapLoader };

export default fmap;
