import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";
import SETTING from "src/config";
import { MapLoader } from "src/common";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = [
    "onFormPoint", // 从地图上的点坐标转换成业务的经纬度
    "onToPoint", // 从业务的经纬度转换地图上的点坐标
    "onMapLoad",
    "onClick", // 鼠标左键单击事件
    "onDbClick", // 地图平移时触发事件
    "onMouseOut",
    "onMouseOver",
    "onMouseMove",
    "onMouseWheel",
    "onZoom",
    "onZoomStart",
    "onZoomEnd",
    "onPan",
    "onPanStart",
    "onPanEnd",
    "onUpdateStart",
    "onUpdateEnd",
    "onExtentChange",
    "onResize"
];

const EXCULDE_NAMES = ["setting", "vid", "options"];

/**
 * 高德地图组件。
 * @class
 * @version 1.0.0
 */
@component({ template: require("./map.html") })
export default class MapComponent extends Component {

    /**
     * 获取地图的DOM节点。
     * @public
     * @property
     * @returns HTMLDivElement
     */
    public get $map(): HTMLDivElement {
        return this.$refs.map as HTMLDivElement;
    }

    @config({ type: Object })
    public setting: Object;

    @config({ type: Object })
    public options: any;

    /**
     * 获取或设置地图容器的ID。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns string
     */
    @config({ type: String })
    public vid: string;

    /**
     * 获取或设置地图显示的缩放级别。
     * @description 静态属性，仅支持初始化配置。3D地图下，zoom值，可以设置为浮点数。
     * @public
     * @config
     * @returns number
     */
    @config({ type: Number })
    public zoom: number;

    /**
     * 获取或设置地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3,19]，取值范围[3-19]
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Array<number>
     */
    @config({ type: Array })
    public zooms: [number, number];

    /**
     * 获取或设置地图中心点坐标值。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Array<number>
     */
    @config({ type: Array })
    public center: [number, number];

    /**
     * 获取或设置地图显示的参考坐标系。
     * @description 静态属性，仅支持初始化配置。地图显示的参考坐标系，取值范围："EPSG3857"，"EPSG3395"，"EPSG4326"
     * @public
     * @config
     * @returns Number
     */
    @config({ type: Number })
    public wkid: Number;

    /**
     * 获取或设置地图类型，目前arcgis和minemap两种
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns string
     */
    // @config({ type: String, default: "arcgis" })
    public mapType: string;

    public constructor() {
        super(EVENTS);
    }

    /**
     * 准备创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected created(): void {
        this.mapType = SETTING.mapType;
    }

    /**
     * 当创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void {
        // 调用基类方法
        super.mounted();

        MapLoader.loadModules(this.mapType).then(() => {
            // 初始化高德地图
            this.initialize();
        });
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected destroyed(): void {
        if (this.map) {
            // 组件销毁
        }
    }

    protected excludeNames(): Array<String> {
        return EXCULDE_NAMES;
    }

    /**
     * 初始化高德地图。
     * @private
     * @returns void
     */
    private async initialize(): Promise<void> {
        if (this.map) {
            return;
        }

        // 解析配置选项
        let options = this.resolveOptions();
        (<any>options).mapType = this.mapType;
        options = { ...this.options, ...options };
       
        let defaultSetting: any =
            SETTING.mapType === "arcgis" ? SETTING.arcgis : SETTING.minemap;
        let setting = <maps.IMapSetting>{ ...defaultSetting, ...this.setting };

        let serviceType = this.getMapServiceType();
        this.map = this.mapComponent = this.getService<maps.FlagwindMap>(
            serviceType,
            setting,
            this.vid,
            options
        );
        this.$emit("on-build", this._mapComponent);
        // 通知外部组件地图已准备就绪
        this.$emit("map-ready", this.map);

        // 通知所有子组件地图已准备就绪
        this.$children.forEach(child => {
            child.$emit("map-ready", this.map);
        });
    }

    /**
     * 根据地图类型设置，动态获取地图类型
     */
    private getMapServiceType() {
        if (this.mapType === "arcgis") {
            return maps["EsriMap"];
        } else if (this.mapType === "minemap") {
            return maps["MinemapMap"];
        } else {
            throw new Error("不支持的地图类型" + this.mapType);
        }
    }
}
