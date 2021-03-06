import { Component as ComponentBase } from "flagwind-web";
import flagwind from "flagwind-core";
import maps from "flagwind-map";

/**
 * 地图组件基类。
 * @class
 * @version 1.0.0
 */
export default abstract class Component extends ComponentBase {
    protected _map: maps.FlagwindMap; // 高德地图实例
    protected _mapComponent: any; // 高德组件实例

    /**
     * 获取或设置组件支持的高德事件。
     * @protected
     * @member
     * @returns Array<string>
     */
    protected mapEvents: Array<string>;

    /**
     * 获取或设置高德地图实例。
     * @public
     * @property
     * @returns any
     */
    public get map(): maps.FlagwindMap {
        return this._map;
    }

    public set map(value: maps.FlagwindMap) {
        this._map = value;
    }

    /**
     * 获取或设置高德组件实例。
     * @public
     * @property
     * @returns any
     */
    public get mapComponent(): any {
        return this._mapComponent;
    }

    public set mapComponent(value: any) {
        this._mapComponent = value;
    }

    /**
     * 初始化组件的新示例。
     * @constructor
     * @param  {Array<string>} events 组件支持的高德事件。
     */
    protected constructor(events: Array<string>) {
        super();
        this.mapEvents = events || [];
    }
  
    /**
     * 地图类型
     */
    public getMapType(): maps.MapType {
        if (!this.map) {
            return null;
        }
        return this.map.options.mapType || "arcgis";
    }

    /**
     * 当创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void {
        const parentComponent = this.$parent as any;

        this.map = this.map || parentComponent.map;

        if (this.map) {
            this.register();
        } else {
            this.$on("map-ready", () => {
                this.register();
            });
        }
    }

    protected destroyed(): void {
        const component = this.mapComponent;

        if (component) {
            component.setMap && component.setMap(null);
            component.clear && component.clear();
            component.clearAll && component.clearAll();
        }
    }

    /**
     * 解析地图配置选项。
     * @protected
     * @returns object
     */
    protected resolveOptions(): object {
        const options: any = {};

        // if (this.map) {
        //     options.map = this.map;
        // }

        const {
            $options: { propsData: props = {} }
        } = this;

        const excludeNames = this.excludeNames();
        Object.keys(props).forEach((key: string) => {
            if (excludeNames.indexOf(key) < 0) {
                let value = props[key];

                options[key] = value;
            }
        });

        const eventNames = Object.keys(this.$listeners).filter(
            (e: string) => ~this.mapEvents.indexOf(e)
        );

        for (const eventName of eventNames) {
            options[eventName] = this.$listeners[eventName];
        }

        return options;
    }

    protected register(): void {
        const result: any = this.initializeComponent(this.resolveOptions());

        if (result && result.then) {
            result.then((component: any) => {
                this.registerComponent(component);
            });
        } else {
            this.registerComponent(result);
        }
    }

    protected excludeNames(): Array<String> {
        return [];
    }

    protected registerComponent(component: any): void {
        // 设置组件实例
        if (!this.mapComponent && component) {
            this.mapComponent = component;
        }
    }

    /**
     * 根据指定
     * @param  {object} options
     * @returns void
     */
    protected initializeComponent(options: object): void {
        // virtual method
    }

    protected getService<T>(
        serviceType: Function | string,
        ...params: Array<any>
    ) {
        return flagwind.Activator.createInstance<T>(serviceType, ...params);
    }
}
