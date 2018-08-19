import { component, Component } from "flagwind-web";

/**
 * 一个 Vue 混入类，提供地图组件注册功能。
 * @class
 * @version 1.0.0
 */
@component
export default class RegisterMixin extends Component
{
    protected mounted(): void
    {
        console.log("register mixin");
    }
    
    protected resolveProperties(): void
    {
        // sss
    }
}
