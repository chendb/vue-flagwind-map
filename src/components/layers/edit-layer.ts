import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "components/component";
import Command from "models/command";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["onEditInfo"];

const EXCULDE_NAMES = ["command"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./edit-layer.html") })
export default class EditLayerComponent extends Component {
    @config({ type: Command })
    public command: Command<this>;

    /**
     * 地图类型
     */
    public get mapType() {
        if (!this.map) {
            return null;
        }
        return this.map.options.mapType;
    }

    public get mapComponent(): maps.IFlagwindEditLayer {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.IFlagwindEditLayer) {
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
        this.$watch(
            "command",
            (command: Command<maps.IFlagwindEditLayer>) => {
                if (this.mapComponent) {
                    command.execute(this.mapComponent);
                }
            },
            { deep: true }
        );
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
            // this.mapComponent.clear();
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

        if (this.$children.length === 0) {
            throw new Error("未添加待编辑的图层");
        }

        this.$children.forEach((child: Component) => {
            child.$emit("map-ready", this.map);
        });

        let layer = (<Component>this.$children[0]).mapComponent;

        this._mapComponent = this.getService<maps.IFlagwindEditLayer>(
            serviceType,
            layer,
            options
        );

        this.$emit("on-build", this._mapComponent);

        if (!options["onEditInfo"]) {
            console.warn("没有定义 onEditInfo 事件");
        }
    }

    private getMapServiceType() {
        if (this.mapType === "arcgis") {
            return maps["EsriEditLayer"];
        } else if (this.mapType === "arcgis") {
            return maps["MinemapEditLayer"];
        } else {
            throw new Error("不支持的地图类型" + this.mapType);
        }
    }
}
