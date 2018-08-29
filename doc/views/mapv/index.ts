import { component, View } from "flagwind-web";

import { MapLoader } from "src/common";
declare let esri: any;

@component({ template: require("./index.html") })
export default class Intro extends View {
    protected option: any = {};

    protected mounted(): void {
        // 调用基类方法
    }

    protected onLoad2() {
        debugger;

        let map: any = (<any>this.$refs.map).map;

        let randomCount = 1000;
        let data = [];
        let citys = [
            "北京",
            "天津",
            "上海",
            "重庆",
            "石家庄",
            "太原",
            "呼和浩特",
            "哈尔滨",
            "长春",
            "沈阳",
            "济南",
            "南京",
            "合肥",
            "杭州",
            "南昌",
            "福州",
            "郑州",
            "武汉",
            "长沙",
            "广州",
            "南宁",
            "西安",
            "银川",
            "兰州",
            "西宁",
            "乌鲁木齐",
            "成都",
            "贵阳",
            "昆明",
            "拉萨",
            "海口"
        ];

        // 构造数据
        // while (randomCount--) {
        //     let cityCenter = mapv.utilCityCenter.getCenterByCityName(
        //         citys[parseInt(Math.random() * citys.length + "")]
        //     );
        //     data.push({
        //         geometry: {
        //             type: "Point",
        //             coordinates: [
        //                 cityCenter.lng - 2 + Math.random() * 4,
        //                 cityCenter.lat - 2 + Math.random() * 4
        //             ]
        //         },
        //         count: 30 * Math.random(),
        //         time: 100 * Math.random()
        //     });
        // }

        // let dataSet = new mapv.DataSet(data);
        // let options = {
        //     fillStyle: "rgba(55, 50, 250, 0.2)",
        //     globalCompositeOperation: "lighter",
        //     size: 15,
        //     animation: {
        //         type: "time",
        //         stepsRange: {
        //             start: 0,
        //             end: 100
        //         },
        //         trails: 10,
        //         duration: 5
        //     },
        //     draw: "simple"
        // };
        // let mapvLayer = new mapv.baiduMapLayer(map, dataSet, options);
    }

    // protected onLoad() {
    //     debugger;
    //     let canvas: any = this.$refs.canvas;
    //     canvas.width = document.body.offsetWidth;
    //     canvas.height = document.body.offsetHeight;
    //     let ctx = canvas.getContext("2d");
    //     let data = [
    //         {
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [
    //                     ctx.canvas.width * Math.random(),
    //                     ctx.canvas.height * Math.random()
    //                 ]
    //             },
    //             count: 30
    //         },
    //         {
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [
    //                     ctx.canvas.width * Math.random(),
    //                     ctx.canvas.height * Math.random()
    //                 ]
    //             },
    //             count: 30
    //         },
    //         {
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [
    //                     ctx.canvas.width * Math.random(),
    //                     ctx.canvas.height * Math.random()
    //                 ]
    //             },
    //             count: 30
    //         }
    //     ];
    //     let randomCount = 900;
    //     while (randomCount--) {
    //         data.push({
    //             geometry: {
    //                 type: "Point",
    //                 coordinates: [
    //                     ctx.canvas.width * Math.random(),
    //                     ctx.canvas.height * Math.random()
    //                 ]
    //             },
    //             count: Math.random() * 30 + 5
    //         });
    //     }
    //     let dataSet = new mapv.DataSet(data);
    //     let options = {
    //         fillStyle: "rgba(55, 50, 250, 0.3)",
    //         shadowColor: "rgba(55, 50, 250, 0.8)",
    //         globalCompositeOperation: "lighter",
    //         shadowBlur: 10,
    //         size: 13,
    //         max: 30,
    //         maxOpacity: 0.7,
    //         draw: "heatmap"
    //     };

    //     mapv.canvasDrawHeatmap.draw(ctx, dataSet, options);
    // }
}
