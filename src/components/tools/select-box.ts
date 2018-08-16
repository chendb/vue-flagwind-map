
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "components/component";
import Command from "models/command";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["onCheckChanged"];

const EXCULDE_NAMES = ["command"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./select-box.html")  })
export default class SelectBoxComponent extends Component {
    @config({ type: Command })
    public command: Command<this>;

    @config({ type: Number, default: maps.SelectMode.multiple })
    public selectMode: maps.SelectMode;

    /**
     * 地图类型
     */
    public get mapType() {
        if (!this.map) {
            return null;
        }
        return this.map.options.mapType;
    }

    public get mapComponent(): maps.IFlagwindSelectBox {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.IFlagwindSelectBox) {
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
        this.$watch("command",(command: Command<maps.IFlagwindSelectBox>) => {
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
            this.mapComponent.destroy();
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
        // 解析配置选项
        const options = this.resolveOptions();
        this.map = map;

        let serviceType = this.getMapServiceType();

        let selecbox = this.getService<maps.IFlagwindSelectBox>(serviceType, this.map, options);

        this.$children.forEach(child => {
            child.$emit("map-ready", this.map);
            selecbox.addLayer((<any>child).mapComponent);
        });

        this._mapComponent = selecbox;

        this.$emit("on-build", this._mapComponent);

    }

    private getMapServiceType() {
        if (this.mapType === "arcgis") {
            return maps["EsriSelectBox"];
        } else if (this.mapType === "arcgis") {
            return maps["MinemapSelectBox"];
        } else {
            throw new Error("不支持的地图类型" + this.mapType);
        }
    }
}
