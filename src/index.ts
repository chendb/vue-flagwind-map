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

const components = {
    "fw-map": Map,
    "fw-point-layer": PointLayer,
    "fw-polygon-layer": PolygonLayer,
    "fw-polyline-layer": PolylineLayer,
    "fw-edit-layer": EditLayer,
    "fw-track-layer": TrackLayer,
    "fw-heatmap-layer": HeatmapLayer
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
