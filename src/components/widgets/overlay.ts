
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";
import "./overlay.less";
/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["click"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./overlay.html") })
export default class Overlay extends Component {

    public visible: boolean = true;

    @config({ type: Number, default: 0 })
    public offsetX: number;

    @config({ type: Number, default: 0 })
    public offsetY: number;

    @config({ type: Number, default: 100 })
    public width: number;

    @config({ type: Number, default: 100 })
    public height: number;

    public zooming: boolean = false;

    @config({ type: Object })
    public point: { lon: number; lat: number; data: any };

    public get mapComponent(): maps.FlagwindMap {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.FlagwindMap) {
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
        this.$watch("point", (point: maps.FlagwindPoint) => {
            if (this.map) {
                this.onPointChanged(point);
            }
        });
    }

    protected onPointChanged(point: any) {
        this.$nextTick(() => {
            let pt = (<any>this.map).toScreen(point);
            let overlay = <HTMLElement>this.$refs.overlay;
    
            if (overlay) {
                overlay.style.top = `${pt.y  - overlay.offsetHeight / 2 + 10 + this.offsetY}px`;
                overlay.style.left = `${pt.x - overlay.offsetWidth / 2 + this.offsetX}px`;
            }
        });
    }

    /**
     * 触发按钮事件
     * @param event 按钮事件对象
     */
    protected triggerEvent(event: any): void {
        let el = <HTMLElement>event.target;
        let eventName = el.attributes["event"] || event.target.dataset.event || "click";
        this.$emit(eventName, {
            target: event.target,
            attributes: this.point
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
            // this.mapComponent.disable();
        }
    }

    protected excludeNames(): Array<String> {
        return [];
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

        this._mapComponent = map;

        this.registerEvent();

    }

    private registerEvent() {
        let overlay = <HTMLElement>this.$refs.overlay;

        let top: number;
        let left: number;

        this.map.on("onZoomStart", () => {
            this.zooming = true;
            if(!this.point) return;
        }, this);

        this.map.on("onZoomEnd", () => {
            this.zooming = false;
            if(!this.point) return;
            this.onPointChanged(this.point);
        }, this);

        this.map.on("onPanStart", () => {
            if(!this.point) return;
            top = overlay.offsetTop;
            left = overlay.offsetLeft;

        }, this);

        this.map.on("onPan", (evt: maps.EventArgs) => {
            if(!this.point) return;
            if (!evt.data.delta) return;
            overlay.style.top = `${top + evt.data.delta.y}px`;
            overlay.style.left = `${left + evt.data.delta.x}px`;
        }, this);

        this.map.on("onPanEnd", () => {
            if(!this.point) return;
            this.onPointChanged(this.point);
        }, this);
    }
}
