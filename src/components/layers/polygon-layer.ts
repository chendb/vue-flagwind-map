
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "components/component";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = [
    "changeStandardModel",
    "getInfoWindowContext",
    "getDataList",
    "getLastStatus",
    "onLayerClick",
    "onMapLoad",
    "onCheckChanged",
    "onPositionChanged",
    "onVisibleChanged",
    "onEvent"
];
const EXCULDE_NAMES = ["requestData", "requestStatus", "vid", "source"];

/**
 * 面图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./polygon-layer.html") })
export default class PolygonLayerComponent extends Component {
    /**
     * 获取或设置图层ID。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns string
     */
    @config({ type: String })
    public vid: string;

    @config({ type: Object })
    public symbol: any;

    /**
     * 选择模式（1为多选，2为单选）
     */
    @config({ type: Number })
    public selectMode: number;

    /**
     * 要素单击时，是否显示信息窗口
     */
    @config({ type: Boolean })
    public showInfoWindow: boolean;

    /**
     * 是否异常请求数据
     */
    @config({ type: Boolean })
    public requestData: boolean;

    /**
     * 是否异常请求状态
     */
    @config({ type: Boolean })
    public requestStatus: boolean;

    /**
     * 要素悬停时，是否显示tooltip信息
     */
    @config({ type: Boolean })
    public showTooltip: boolean;

    /**
     * 数据源
     */
    @config({ type: Array })
    public source: Array<object>;

    /**
     * 地图类型
     */
    public get mapType() {
        if (!this.map) {
            return null;
        }
        return this.map.options.mapType;
    }

    public get mapComponent(): maps.FlagwindBusinessLayer {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.FlagwindBusinessLayer) {
        this._mapComponent = value;
    }

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
        // 监听 "source" 选项变动
        this.$watch(
            "source",
            (source: Array<any>) => {
                if (this.mapComponent) {
                    this.mapComponent.clear();
                    this.mapComponent.saveGraphicList(source);
                }
            },
            { deep: true }
        );

        this.$watch(
            "requestStatus",
            (v: boolean) => {
                if (this.mapComponent) {
                    if (v) {
                        this.mapComponent.start();
                    } else {
                        this.mapComponent.stop();
                    }
                }
            },
            { deep: true }
        );

        // 监听其他选项变动

        let watched = [
            "showTooltip",
            "showInfoWindow"
        ];

        for (let prop of watched) {
            this.$watch(
                prop,
                v => {
                    if (this.mapComponent) {
                        this.mapComponent.options[prop] = v;
                    }
                },
                { deep: true }
            );
        }
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
        // 初始化标记组件
        this.$on("map-ready", this.initialize);
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected destroyed(): void {
        if (this.mapComponent) {
            (<maps.FlagwindBusinessLayer>this.mapComponent).clear();
        }
    }

    protected excludeNames(): Array<String> {
        return EXCULDE_NAMES;
    }

    /**
     * 初始化图层。
     * @private
     * @returns void
     */
    private async initialize(map: maps.FlagwindMap): Promise<void> {
        if (!map) {
            return;
        }
        this.map = map;

        // 解析配置选项
        const options = this.resolveOptions();

        let serviceType = this.getMapServiceType();

        this._mapComponent = this.getService<maps.FlagwindBusinessLayer>(
            serviceType,
            this.map,
            this.vid,
            options
        );

        this.$emit("on-build", this._mapComponent);

        this.$children.forEach(child => {
            child.$emit("layer-ready", this._mapComponent);
        });

        if (options["showInfoWindow"] && !options["getInfoWindowContext"]) {
            console.warn("没有定义getInfoWindowContext事件");
        }

        if (this.source && this.source.length > 0) {
            this._mapComponent.clear();
            this._mapComponent.saveGraphicList(this.source);
        }

        if (this.requestData && !options["showDataList"]) {
            console.warn("requestData为true时，必须定义showDataList事件");
        }

        if (this.requestStatus && !options["getLastStatus"]) {
            console.warn("requestStatus为true时，必须定义getLastStatus事件");
        }

        if (this.requestData && options["showDataList"]) {
            this._mapComponent.showDataList();
        }

        if (this.requestStatus && options["getLastStatus"]) {
            this._mapComponent.start();
        }
    }

    private getMapServiceType() {
        if (this.mapType === "arcgis") {
            return maps["EsriPolylineLayer"];
        } else if (this.mapType === "arcgis") {
            return maps["MinemapPolylineLayer"];
        } else {
            throw new Error("不支持的地图类型" + this.mapType);
        }
    }
}
