
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["getImageUrl", "getImageAngle", "onPointChanged", "onMoveEvent", "onLineEndEvent"];

const EXCULDE_NAMES = ["map","options"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./track-layer.html") })
export default class TrackLayerComponent extends Component {

    @config({ type: Object })
    public options: any;

    @config({ type: Number,default: 100 })
    public speed: number;

    @config({ type: Object })
    public symbol: any;

    /**
     * 路径求解方式(Line,Segment)
     */
    @config({ type: String })
    public solveMode: string;

    public get mapComponent(): maps.FlagwindTrackLayer {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.FlagwindTrackLayer) {
        this._mapComponent = value;
    }

    public constructor() {
        super(EVENTS);
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
            this.mapComponent.clear();
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
    private async initialize(flagwindMap: maps.FlagwindMap): Promise<void> {
        if (!flagwindMap) {
            return;
        }

        this.map = flagwindMap;

        // 解析配置选项
        let options = this.resolveOptions();

        options = { ...this.options, ...options };

        let serviceType = this.getMapServiceType();

        if (this.$children.length === 0) {
            throw new Error("未添加轨迹的停靠点图层");
        }

        this.$children.forEach((child: Component) => {
            child.$emit("map-ready", this.map);
        });
        let layer = (<Component>this.$children[0]).mapComponent;
        this._mapComponent = this.getService<maps.FlagwindTrackLayer>(
            serviceType,
            layer,
            options
        );
        this.$emit("on-build", this._mapComponent);

        if (!options["getImageUrl"]) {
            console.warn("getImageUrl未设置，移动目标可能无法显示");
        }
        if (!options["getImageAngle"]) {
            console.warn("getImageAngle未设置，移动目标方向设置可能存在问题");
        }
    }

    private getMapServiceType() {
        if (this.getMapType() === "arcgis") {
            return maps["EsriTrackLayer"];
        } else if (this.getMapType() === "minemap") {
            return maps["MinemapTrackLayer"];
        } else {
            throw new Error("不支持的地图类型" + this.getMapType());
        }
    }
}
