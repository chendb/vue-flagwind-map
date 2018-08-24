
import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";
import "./info-window.less";
/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["close","click"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./info-window.html") })
export default class InfoWindowComponent extends Component {
    @config({ type: Array })
    public menus: Array<string>;

    @config({ type: Boolean })
    public isShow: boolean;

    @config({ type: Boolean })
    public showWare: boolean;

    @config({ type: String })
    public title: string;

    @config({ type: Number, default: 0 })
    public offsetX: number;

    @config({ type: Number, default: 0 })
    public offsetY: number;

    @config({ type: Object })
    public point: maps.FlagwindPoint;

    public get hasTitle(): boolean {
        return this.title && this.title.length > 0;
    }

    public get mapComponent(): maps.FlagwindMap {
        return this._mapComponent;
    }

    public set mapComponent(value: maps.FlagwindMap) {
        this._mapComponent = value;
    }

    public constructor() {
        super(EVENTS);
    }

    public open(graphic: any, title: string, content: any): void;
    public open(id: string, layer: maps.FlagwindBusinessLayer): void;
    public open() {
        let args = arguments;
        switch (args.length) {
            case 2:
                this.show2(args[0], args[1]);
                break;
            case 3:
                this.show3(args[0], args[1], args[2]);
                break;
            default:
                throw new Error("参数不匹配");
        }
    }

    public bind(layer: maps.FlagwindBusinessLayer): void {
        layer.options.showInfoWindow = false;
        layer.on("onClick", (evt: maps.EventArgs) => {
            let context = layer.options.getInfoWindowContext(evt.data.graphic.attributes);
            this.map.onShowInfoWindow({
                graphic: evt.data.graphic,
                context: {
                    type: "html",
                    title: context.title,
                    content: context.content
                }
            });
        }, this);
    }

    protected show3(graphic: any, title: string, content: any) {

        this.map.onShowInfoWindow({
            graphic: graphic,
            context: {
                type: "html",
                title: title,
                content: content
            }
        });
    }

    protected show2(id: string,layer: maps.FlagwindBusinessLayer) {
        let graphic = layer.getGraphicById(id);
        let context = layer.options.getInfoWindowContext(graphic.attributes);
        this.map.onShowInfoWindow({
            graphic: graphic,
            context: {
                type: "html",
                title: context.title,
                content: context.content
            }
        });
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

    protected onPointChanged(point: maps.FlagwindPoint) {
        let pt = (<any>this.map).toScreen(point);

        let infoWindow = <HTMLElement>this.$refs.infoWindow;
        let pointWave = <HTMLElement>this.$refs.pointWave;

        if (infoWindow) {
            infoWindow.style.top = `${pt.y - infoWindow.offsetHeight - 36 + this.offsetY}px`;
            infoWindow.style.left = `${pt.x - infoWindow.offsetWidth / 2 - 7 + this.offsetX}px`;
        }

        if (pointWave && infoWindow) {
            pointWave.style.top = `${infoWindow.offsetHeight + 14 + this.offsetY}px`;
            pointWave.style.left = `${infoWindow.offsetWidth / 2}px`;
        }
    }

    protected onClose(): void {
        this.isShow = false;
        this.$emit("close");
    }

    /**
     * 触发按钮事件
     * @param event 按钮事件对象
     */
    protected triggerEvent(event: any): void {
        let el = <HTMLElement>event.target;
        let eventName = el.attributes["event"] || event.target.dataset.event || "click";
        this.$emit(eventName, event.target);
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
        let infoWindow = <HTMLElement>this.$refs.infoWindow;
        let pointWave = <HTMLElement>this.$refs.pointWave;

        let infoWindowTop: number;
        let infoWindowLeft: number;

        let pointWaveTop: number;
        let pointWaveLeft: number;

        this.map.on("onZoomStart", () => {
            infoWindow.classList.remove("active");
        }, this);

        this.map.on("onZoomEnd", () => {
            this.onPointChanged(this.point);
            infoWindow.classList.remove("active");
        }, this);

        this.map.on("onPanStart", () => {
            infoWindowTop = infoWindow.offsetTop;
            infoWindowLeft = infoWindow.offsetLeft;

            pointWaveTop = pointWave.offsetTop;
            pointWaveLeft = pointWave.offsetLeft;
        }, this);

        this.map.on("onPan", (evt: maps.EventArgs) => {
            infoWindow.style.top = `${infoWindowTop + evt.data.delta.y}px`;
            infoWindow.style.left = `${infoWindowLeft + evt.data.delta.x}px`;

            pointWave.style.top = `${pointWaveTop + evt.data.delta.y}px`;
            pointWave.style.left = `${pointWaveLeft + evt.data.delta.x}px`;
        }, this);

        this.map.on("onPanEnd", () => {
            this.onPointChanged(this.point);
        }, this);
    }
}
