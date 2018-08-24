
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["onClick"];

const EXCULDE_NAMES = ["enabled"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: ""  })
export default class ContextMenuComponent extends Component {

    @config({ type: Array})
    public menus: Array<string>;

    @config({ type: Boolean})
    public enabled: boolean;

    public get mapComponent(): maps.FlagwindContextMenu {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.FlagwindContextMenu) {
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

        // 监听 "command" 选项变动
        this.$watch("enabled", (enabled: boolean) => {
            if (this.mapComponent) {
                if (enabled) {
                    this.mapComponent.enable();
                } else {
                    this.mapComponent.disable();
                }
            }
        });
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
            this.mapComponent.disable();
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
        const options = <maps.ContextMenuEventArgs>this.resolveOptions();
        this.map = map;

        let serviceType = this.getMapServiceType();

        let contextMenu = this.getService<maps.FlagwindContextMenu>(serviceType, this.map);

        contextMenu.startup(options);

        if (this.enabled) {
            contextMenu.enable();
        } else {
            contextMenu.disable();
        }

        this._mapComponent = contextMenu;

        this.$emit("on-build", this._mapComponent);

    }

    private getMapServiceType() {
        if (this.getMapType() === "arcgis") {
            return maps["EsriContextMenu"];
        } else if (this.getMapType() === "arcgis") {
            return maps["MinemapContextMenu"];
        } else {
            throw new Error("不支持的地图类型" + this.getMapType());
        }
    }
}
