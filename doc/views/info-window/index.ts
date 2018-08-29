import { component, View } from "flagwind-web";
import maps from "flagwind-map";
import { InfoWindowComponent } from "src/components/widgets";

@component({ template: require("./index.html") })
export default class Intro extends View {
    protected dataList = [
        { id: "1", name: "张三", longitude: 118.5731, latitude: 37.61462 },
        { id: "2", name: "李娜", longitude: 118.1332, latitude: 37.48463 },
        { id: "3", name: "五三", longitude: 118.3833, latitude: 37.6466 },
        { id: "4", name: "原因", longitude: 118.5634, latitude: 37.9463 },
        { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }
    ];

    protected layer: maps.FlagwindBusinessLayer;

    protected pointSymbol = {
        height: 32,
        width: 32,
        imageUrl: "/static/map/point.png"
    };

    protected point = {
        longitude: 118.7135,
        latitude: 37.1468,
        data: { id: "5", name: "李妈", longitude: 118.7135, latitude: 37.1468 }
    };

    protected onLayerBuild(layer: maps.FlagwindBusinessLayer) {
        this.layer = layer;
    }

    protected onOpenInfoWindow() {
        let infoWindow = <InfoWindowComponent>this.$refs.fmInfoWindow;
        if (this.layer) {
            infoWindow.bind(this.layer);
        }
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
}
