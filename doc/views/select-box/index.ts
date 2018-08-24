import { component, View } from "flagwind-web";
import maps from "flagwind-map";

@component({ template: require("./index.html") })
export default class Intro extends View {
    protected dataList = [
        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },
        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },
        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },
        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },
        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }
    ];

    protected symbol = {
        height: 32,
        width: 32,
        imageUrl: "/static/map/point.png"
    };

    protected onSelectBoxBuild(layer: maps.IFlagwindSelectBox) {
        layer.showSelectBar();
    }
    protected onEditInfo(model: any, isSave: boolean): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            alert(model.id);
            resolve(true);
        });
    }
    protected onCheckChanged(evt: any) {
        alert(evt);
    }
    protected onLayerClick(evt: any) {
        // console.log(evt.graphic.attributes);
        // alert(evt.graphic.attributes.name);
    }
    protected onChangeStandardModel(model: any) {
        return model;
    }
    protected onLoad() {
        //
    }

    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns any
     */
    // protected codes: any = codes;
    /**
     * 演示需要的数据选项。
     * @protected
     * @member
     * @returns any
     */
    // protected options: any = options;
}
