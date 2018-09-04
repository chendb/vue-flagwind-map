import { component, config } from "flagwind-web";
import maps from "flagwind-map";
import Component from "src/components/component";
import "./info-window.less";
/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS = ["close", "click"];

/**
 * 点图层
 * @class
 * @version 1.0.0
 */
@component({ template: require("./info-window.html") })
export default class InfoWindowComponent extends Component {
    public _point: maps.FlagwindPoint;

    public visible: boolean = false;

    public title: string = "";

    public content: string = "";

    @config({ type: Boolean })
    public showWave: boolean;

    @config({ type: Number, default: 0 })
    public offsetX: number;

    @config({ type: Number, default: 0 })
    public offsetY: number;

    public zooming: boolean = false;

    @config({ type: Object })
    public point: any;

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

    public show() {
        this.visible = true;
        this.$emit("show");
    }

    public hide() {
        this.visible = false;
        this.$emit("close");
    }

    public bind(layer: maps.FlagwindBusinessLayer): void {
        layer.options.showInfoWindow = false;
        layer.on(
            "onClick",
            (evt: maps.EventArgs) => {
                let context = layer.options.getInfoWindowContext(
                    evt.data.graphic.attributes
                );
                this._point = evt.data.graphic.geometry;
                this.title = context.title;
                this.content = context.content;
                this.show();
                this.onPointChanged(this._point);
            },
            this
        );
    }

    /**
     * 准备创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected created(): void {
        // 监听 "command" 选项变动
        this.$watch("point", (position: any) => {
            if (this.map) {
                this._point = this.map.getPoint(position);
                this.onPointChanged(position);
            }
        });
    }

    protected onPointChanged(point: maps.FlagwindPoint) {
        this.$nextTick(() => {
            this.onWindowPointChanged(point);
            this.onWavePointChanged();
        });
    }

    protected onWindowPointChanged(point: maps.FlagwindPoint) {
        let pt = (<any>this.map).toScreen(point);
        let infoWindow = <HTMLElement>this.$refs.infoWindow;

        if (infoWindow) {
            infoWindow.style.top = `${pt.y -
                infoWindow.offsetHeight -
                50 +
                this.offsetY}px`;
            infoWindow.style.left = `${pt.x -
                infoWindow.offsetWidth / 2 -
                5 +
                this.offsetX}px`;
        }
    }

    protected onWavePointChanged() {
        let infoWindow = <HTMLElement>this.$refs.infoWindow;
        let pointWave = <HTMLElement>this.$refs.pointWave;
        if (pointWave && infoWindow) {
            pointWave.style.top = `${infoWindow.offsetHeight +
                14 +
                this.offsetY}px`;
            pointWave.style.left = `${infoWindow.offsetWidth / 2}px`;
        }
    }

    protected onClose(): void {
        this.hide();
    }

    /**
     * 触发按钮事件
     * @param event 按钮事件对象
     */
    protected triggerEvent(event: any): void {
        let el = <HTMLElement>event.target;
        let eventName =
            el.attributes["event"] || event.target.dataset.event || "click";
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
        this.$on("map-ready", this.initializeByMap);
        this.$on("layer-ready", this.initializeByLayer);
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

    // #region show23

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

    protected show2(id: string, layer: maps.FlagwindBusinessLayer) {
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

    // #endregion

    /**
     * 初始化图层。
     * @private
     * @returns void
     */
    private async initializeByMap(map: maps.FlagwindMap): Promise<void> {
        if (!map) {
            return;
        }

        this.map = map;

        this._mapComponent = map;

        if (this.point) {
            this._point = this.map.getPoint(this.point);
        }

        this.registerEvent();
    }

    private async initializeByLayer(
        layer: maps.FlagwindBusinessLayer
    ): Promise<void> {
        if (!layer) {
            return;
        }

        this.map = layer.flagwindMap;

        this._mapComponent = layer;

        this.registerEvent();

        this.bind(layer);
    }

    private registerEvent() {
        let infoWindow = <HTMLElement>this.$refs.infoWindow;

        let infoWindowTop: number;
        let infoWindowLeft: number;

        this.map.on(
            "onZoomStart",
            () => {
                this.zooming = true;
                if (!this._point) return;
            },
            this
        );

        this.map.on(
            "onZoomEnd",
            () => {
                this.zooming = false;
                if (!this._point) return;
                this.onPointChanged(this._point);
            },
            this
        );

        this.map.on(
            "onPanStart",
            () => {
                if (!this._point) return;
                infoWindowTop = infoWindow.offsetTop;
                infoWindowLeft = infoWindow.offsetLeft;
            },
            this
        );

        this.map.on(
            "onPan",
            (evt: maps.EventArgs) => {
                if (!this._point) return;
                infoWindow.style.top = `${infoWindowTop + evt.data.delta.y}px`;
                infoWindow.style.left = `${infoWindowLeft +
                    evt.data.delta.x}px`;
            },
            this
        );

        this.map.on(
            "onPanEnd",
            () => {
                if (!this._point) return;
                this.onPointChanged(this._point);
            },
            this
        );
    }
}
